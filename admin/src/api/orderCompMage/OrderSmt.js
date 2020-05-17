import request from '@/utils/request'

// 分页查询 SMT
export function selectAllOmgProductionSmtAsPage(data) {
  return request({
      url: '/omgProductionSmtProFlowController/selectAllOmgProductionSmtAsPage',
      method: 'post',
      data
  })
}

// 更新生产SMT主表数据
export function updateOmgProductionSmt(data) {
  return request({
      url: '/omgProductionSmtProFlowController/updateOmgProductionSmt',
      method: 'post',
      data
  })
}

// 根据SMT主表主键查询子表中的数据
export function selectProductionSmtSubAsPage(data) {
  return request({
      url: '/omgProductionSmtProFlowController/selectAllProductionSmtSubAsPage',
      method: 'post',
      data
  })
}

// 保存SMT子表数据
export function saveProductionSmtSub(data) {
  return request({
      url: '/omgProductionSmtProFlowController/saveProductionSmtSub',
      method: 'post',
      data
  })
}
