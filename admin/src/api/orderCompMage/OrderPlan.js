import request from '@/utils/request'

// 分页查询生产计划
export function selectAllOrderPlanAsPage(data) {
  return request({
      url: '/productionFlowOrderPlanController/selectAllOrderPlanAsPage',
      method: 'post',
      data
  })
}

// 新增生产计划
export function insertOrderPlan(data) {
  return request({
      url: '/productionFlowOrderPlanController/insertOrderPlan',
      method: 'post',
      data
  })
}

// 根据主键集合删除生产计划
export function deleteOrderPlanByPks(data) {
  return request({
      url: '/productionFlowOrderPlanController/deleteOrderPlanByPks',
      method: 'post',
      data
  })
}

// 更新生产计划
export function updateOrderPlan(data) {
  return request({
      url: '/productionFlowOrderPlanController/updateOrderPlan',
      method: 'post',
      data
  })
}

// 根据生产计划子表主键分页查询数据
export function selectAllOrderSubDataAsPage(data) {
  return request({
      url: '/productionFlowOrderPlanController/selectAllOrderSubDataAsPage',
      method: 'post',
      data
  })
}

// 插入生产计划子表数据
export function saveOrderPlanSubData(data) {
  return request({
      url: '/productionFlowOrderPlanController/saveOrderSubData',
      method: 'post',
      data
  })
}