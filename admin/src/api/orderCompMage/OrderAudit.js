import request from '@/utils/request'

// 分页查询工艺审核数据
export function selectAllOrderTechnicsAsPage(data) {
  return request({
      url: '/productionFlowTechnicsController/selectAllOrderTechnicsAsPage',
      method: 'post',
      data
  })
}

// 根据工艺审核主键更新数据
export function updateOrderTechnics(data) {
  return request({
      url: '/productionFlowTechnicsController/updateOrderTechnics',
      method: 'post',
      data
  })
}

// 根据工艺审核主表主键查询子表主键
export function selectOrderTechnicsFileDetails(data) {
  return request({
      url: '/productionFlowTechnicsController/selectOrderTechnicsFileDetails',
      method: 'post',
      data
  })
}

// 保存工艺审核字表数据
export function saveOrderTechnicsBFile(data) {
  return request({
      url: '/productionFlowTechnicsController/saveOrderTechnicsBFile',
      method: 'post',
      data
  })
}

// 更新工艺审核字表数据
export function updateTechnicsSubData(data) {
  return request({
      url: '/productionFlowTechnicsController/updateTechnicsSubData',
      method: 'post',
      data
  })
}