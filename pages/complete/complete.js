import * as R from '../../utils/ramda/index'
import * as Api from '../api'
import { promisify, isComplete } from '../../utils/util'
import request from '../../utils/request'
import wxUtil from '../../utils/wxUtil'
import {
  DEGREE_TYPE, GENDER_TYPE,
  BASIC_FIELD, EDUCATION_FIELD, WORK_FIELD,
} from '../../macro'

Page({
  data: {
    isShowAuthModal: false,
    degreeSelect: DEGREE_TYPE,
    genderSelect: GENDER_TYPE,
    basic: {
      birth: '1990-01-01',
    },
    education: {
      background: R.findIndex(R.propEq('name', '本科'))(DEGREE_TYPE),
    },
    work: {},
    isStudent: true,
    redirect: '', // 完善后跳转的路径
    options: '', // 完善后跳转的路径参数
  },
  onLoad({ redirect = 'mine', options = '{}' }) {
    this.setData({ redirect, options })
    request.getUserInfo().then(userInfo => {
      this.setData({
        basic: {
          ...this.data.basic,
          head_url: userInfo.avatarUrl,
          gender: R.findIndex(R.propEq('id', userInfo.gender))(GENDER_TYPE),
        },
      })
    }, () => {
      // 未授权，显示授权弹窗
      this.setData({
        isShowAuthModal: true,
      })
    })
  },
  handleClickAvatar() {
    promisify(wx.chooseImage)({
      count: 1,
    }).then(res => {
      this.setData({
        'basic.head_url': res.tempFilePaths.pop(),
      })
    })
  },
  // 定位
  handleLocation() {
    request.getLocation().then(res => {
      if (!res) {
        wxUtil.showToast('没有定位到')
        return
      }
      this.setData({ 'basic.city': res })
    }, err => {
      promisify(wx.showModal)({
        title: '错误提示',
        content: err.errMsg,
        confirmText: '关闭',
        confirmColor: '#2180E8',
        showCancel: false,
      })
    })
  },
  handleInputChange(e) {
    const { name } = e.currentTarget.dataset
    this.setData({
      [name]: e.detail.value,
    })
  },
  handleSwitchChange(e) {
    this.setData({ isStudent: !e.detail.value })
  },
  handleSave() {
    let { basic, education, work, isStudent } = this.data
    // 处理gender
    const gender = GENDER_TYPE[basic.gender] || {}
    basic = R.assoc('gender', gender.id || 0, basic)

    // 处理degree
    const degree = DEGREE_TYPE[education.background] || {}
    education = R.assoc('background', degree.name || 0, education)

    // 必填项判断
    basic = this.checkParams(BASIC_FIELD, basic)
    if (!basic) return
    education = this.checkParams(EDUCATION_FIELD, education)
    if (!education) return
    work = isStudent ? {} : this.checkParams(WORK_FIELD, work)
    if (!work) return

    // 数据格式转换
    const params = { ...basic }
    R.forEachObjIndexed((value, key) => params[`education_${key}`] = value, education)
    R.forEachObjIndexed((value, key) => params[`work_${key}`] = value, work)
    // 提交数据
    Api.saveCardInfo(params).then(() => {
      wxUtil.showToast('保存成功', 'success').then(() => {
        const { redirect, options } = this.data
        wxUtil.navigateTo(redirect, JSON.parse(options), 'all')
      })
    }, err => {
      promisify(wx.showModal)({
        title: '错误提示',
        content: JSON.stringify(err),
        confirmText: '关闭',
        confirmColor: '#2180E8',
        showCancel: false,
      })
    })
  },
  checkParams(checkList, params) {
    const _params = R.clone(params)
    for (let field of checkList) {
      if (field.isMust && !_params[field.prop]) {
        wxUtil.showToast(`${field.name}必填`)
        return false
      }
      if (!_params[field.prop]) {
        _params[field.prop] = field.defaultValue
      }
    }
    return _params
  },
  handleCloseAuthModal() {
    // 关闭弹窗
    this.setData({
      isShowAuthModal: false,
    })
  },
  handleAuth(e) {
    const { event } = e.detail
    const { userInfo } = event.detail
    if (!userInfo) {
      wxUtil.showToast('授权失败请重试')
      return
    }
    this.setData({ isShowAuthModal: false })
    // 判断是否信息完善
    isComplete().then(res => {
      if (res) {
        wxUtil.navigateTo('index', {}, true)
        return
      }
      this.setData({
        basic: {
          head_url: userInfo.avatarUrl,
          gender: R.findIndex(R.propEq('id', userInfo.gender))(GENDER_TYPE),
        },
      })
    })
  },
})
