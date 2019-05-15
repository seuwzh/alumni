// 性别
export const GENDER_TYPE = [
  { id: 1, name: '男' },
  { id: 2, name: '女' },
]

// 学历
export const DEGREE_TYPE = [
  { id: 5, name: '专科' },
  { id: 4, name: '本科' },
  { id: 3, name: '硕士' },
  { id: 2, name: '博士' },
  { id: 1, name: '其他' },
]

// 关系类型
export const CONTACT_TYPE = [
  { id: 0, name: '陌生人', key: 'STRANGER' },
  { id: 1, name: '好友', key: 'FRIEND' },
  { id: 2, name: '请求交换名片', key: 'YES_OR_NO' },
  { id: 3, name: '已申请交换名片', key: 'SEASSI' },
  { id: 4, name: '拒绝了您的请求', key: 'BE_REFUSED' },
  { id: 5, name: '同意了您的请求', key: 'BE_AGREED' },
]

// 个人信息配置
export const BASIC_FIELD = [
  { name: '真实姓名', prop: 'real_name', isMust: true },
  { name: '性别', prop: 'real_name', isMust: true },
  { name: '出生年月', prop: 'birth', defaultValue: '' },
  { name: '自我描述', prop: 'descr', isMust: true },
  { name: '定位', prop: 'city', isMust: true },
  { name: '手机号码', prop: 'phone', isMust: true },
  { name: '微信号', prop: 'wechat', defaultValue: '' },
  { name: '邮箱', prop: 'email', defaultValue: '' },
]

// 教育信息配置
export const EDUCATION_FIELD = [
  { name: '学校名称', prop: 'school', isMust: true },
  { name: '学历', prop: 'background', isMust: true },
  { name: '院系', prop: 'department', isMust: true },
  { name: '入学年份', prop: 'start_year', isMust: true },
  { name: '毕业时间', prop: 'end_year', isMust: true },
]

// 工作信息配置
export const WORK_FIELD = [
  { name: '公司名称', prop: 'company', isMust: true },
  { name: '职位名称', prop: 'job', isMust: true },
  { name: '入职时间', prop: 'start_year', defaultValue: '' },
  { name: '离职时间', prop: 'end_year', defaultValue: '' },
]


// 学历
export const DEPARTMENT_TYPE = [

  { id: 1, name: "建筑学院" },
  { id: 2, name: "机械工程学院" },
  { id: 3, name: "能源与环境学院" },
  { id: 4, name: "信息科学与工程学院" },
  { id: 5, name: "土木工程学院" },
  { id: 6, name: "电子科学与工程学院" },
  { id: 7, name: "数学学院" },
  { id: 8, name: "自动化学院" },
  { id: 9, name: "物理学院" },
  { id: 10, name: "生物科学与医学工程学院" },
  { id: 11, name: "材料科学与工程学院" },
  { id: 12, name: "人文学院" },
  { id: 13, name: "经济管理学院" },
  { id: 14, name: "电气工程学院" },
  { id: 15, name: "外国语学院" },
  { id: 16, name: "化学化工学院" },
  { id: 17, name: "交通学院" },
  { id: 18, name: "仪器科学与工程学院" },
  { id: 19, name: "艺术学院" },
  { id: 20, name: "法学院" },
  { id: 21, name: "医学院" },
  { id: 22, name: "公共卫生学院" },
  { id: 23, name: "吴健雄学院" },
  { id: 24, name: "海外教育学院" },
  { id: 25, name: "软件学院" },
  { id: 26, name: "微电子学院" },
  { id: 27, name: "马克思主义学院" },
  { id: 28, name: "网络空间安全学院" },
  { id: 29, name: "人工智能学院" },
  { id: 30, name: "东南大学雷恩研究生学院" },
  { id: 31, name: "东南大学—蒙纳士大学苏州联合研究生院" },
  { id: 32, name: "其他" }

]

    