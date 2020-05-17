import request from '@/utils/request'

// 查询所有订单信息 及 订单信息中的产品信息作为参照返回
export function selectOrderInfoAsRef(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/selectOrderInfoAsRef',
      method: 'post',
      data
  })
}

// 根据订单字表主键查询生产流程状态
export function selectProductionProccessFlowSteps(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/selectProductionProccessFlowSteps',
      method: 'post',
      data
  })
}

// 销售发起中 一键发起
export function orderSaleDoStartProccess(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/orderSaleDoStartProccess',
      method: 'post',
      data
  })
}

// 销售发起中 一键发起
export function orderSaleStartUpProccess(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/orderSaleStartUpProccess',
      method: 'post',
      data
  })
}

// 工艺审核 确认标准
export function confirmTechnicsProccess(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/confirmTechnicsProccess',
      method: 'post',
      data
  })
}

// 物料入库流程 处理 开始SMT DIP生产
export function materielPutinProccess(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/materielPutinProccess',
      method: 'post',
      data
  })
}

// DIP 报检流程处理 开始准备成品质检
export function dipInspeReportProccess(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/dipInspeReportProccess',
      method: 'post',
      data
  })
}

// 成品质检中发起成品入库
export function beComeStartPutIn(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/beComeStartPutIn',
      method: 'post',
      data
  })
}

// 成品入库发起成品出库
export function putInStartPutOut(data) {
  return request({
      url: '/proccessMageMentOrderFlowController/putInStartPutOut',
      method: 'post',
      data
  })
}