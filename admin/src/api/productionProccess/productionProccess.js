import request from '@/utils/request'

// 生产流程综合管理界面 数据查询
export function selectAllOrderInfoAsPage(data) {
  return request({
      url: '/productionProcessController/selectAllOrderInfoAsPage',
      method: 'post',
      data
  })
}

// 根据订单主键查询 生产流程综合管理中所需的数据
export function selectOrderDetailsByPrimary(data) {
  return request({
      url: '/productionProcessController/selectOrderDetailsByPrimary',
      method: 'post',
      data
  })
}