import request from '@/utils/request'

// 分页查询所有订单信息
export function selectAllProductOrderAsPage(data) {
  return request({
      url: '/proOrderController/selectAllProductOrderAsPage',
      method: 'post',
      data
  })
}

// 分页通过订单主键查询订单产品信息
export function selectAllSaleOrderProductAsPage(data) {
  return request({
      url: '/sale/selectAllSaleOrderProductAsPage',
      method: 'post',
      data
  })
}

// 通过订单主键查询订单信息
export function selectProductOrderByPrimaryKey(data) {
  return request({
      url: '/proOrderController/selectProductOrderByPrimaryKey',
      method: 'post',
      data
  })
}

// 根据销售负责人查询所有订单信息作为参照
export function selectAllSaleOrderByPkPsndocAsRef(data) {
  return request({
      url: '/sale/selectAllSaleOrderByPkPsndocAsRef',
      method: 'post',
      data
  })
}

// 新增客户产品订单信息
export function insertProductOrder(data) {
  return request({
      url: '/proOrderController/insertProductOrder',
      method: 'post',
      data
  })
}

// 根据主键集合删除客户产品订单信息
export function deleteProductOrderByPks(data) {
  return request({
      url: '/proOrderController/deleteProductOrderByPks',
      method: 'post',
      data
  })
}

// 更新客户产品订单信息
export function updateProductOrder(data) {
  return request({
      url: '/proOrderController/updateProductOrder',
      method: 'post',
      data
  })
}

// 通过客户主键信息查询客户收货信息
export function selectTaskoverByPkCustomer(data) {
  return request({
      url: '/proOrderController/selectTaskoverByPkCustomer',
      method: 'post',
      data
  })
}

// 根据客户主键信息查询产品作为参照
export function selectProductByPkCustomerAsRef(data) {
  return request({
      url: '/proOrderController/selectProductByPkCustomerAsRef',
      method: 'post',
      data
  })
}

// 更新订单字表数据
export function updateProductOrderB(data) {
  return request({
      url: '/proOrderController/updateProductOrderB',
      method: 'post',
      data
  })
}

// 更新合同订单状态为签订成功
export function updateProductOrderStateByPk(data) {
  return request({
      url: '/proOrderController/updateProductOrderStateByPk',
      method: 'post',
      data
  })
}

// 更新合同订单状态一件暂停
export function updateProductOrderStateOutByPk(data) {
  return request({
      url: '/proOrderController/updateProductOrderStateOutByPk',
      method: 'post',
      data
  })
}