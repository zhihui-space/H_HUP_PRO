const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  tokenOC: state => state.user.tokenOC,
  avatarOC: state => state.user.avatarOC, // 用户头像
  nameOC: state => state.user.nameOC,
  useridOC: state => state.user.useridOC,
  pkCorpOC: state => state.user.pkCorpOC,
  unitnameOC: state => state.user.unitnameOC,
  corpaddressOC: state => state.user.corpaddressOC,
  pkPsndocOC: state => state.user.pkPsndocOC,
  customerTelOC: state => state.user.customerTelOC,
  rolesOC: state => state.user.rolesOC,

  fixedLeftColumnsOC: state => state.viewComp.fixedLeftColumnsOC, // 左边固定列表字段
  columnsOC: state => state.viewComp.columnsOC, // 列表字段
  listDataOC: state => state.viewComp.listDataOC, // 列表数据
  topBtnsOC: state => state.viewComp.topBtnsOC, // 页面顶部按钮
  actBtnsOC: state => state.viewComp.actBtnsOC, // 操作栏按钮
  actWidthOC: state => state.viewComp.actWidthOC // 操作栏按钮宽度
}
export default getters
