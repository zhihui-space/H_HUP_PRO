import request from '@/utils/request'

// 分页查询DIP 数据
export function selectAllProductionDipAsPage(data) {
  return request({
      url: '/omgProductionDipProFlowController/selectAllProductionDipAsPage',
      method: 'post',
      data
  })
}

// 更新DIP 数据
export function updateProductionDip(data) {
  return request({
      url: '/omgProductionDipProFlowController/updateProductionDip',
      method: 'post',
      data
  })
}

// 分页查询生产流程DIP子表数据
export function selectProductionSubAsPage(data) {
  return request({
      url: '/omgProductionDipProFlowController/selectProductionSubAsPage',
      method: 'post',
      data
  })
}

// 保存DIP子表数据
export function saveProductionSub(data) {
  return request({
      url: '/omgProductionDipProFlowController/saveProductionSub',
      method: 'post',
      data
  })
}