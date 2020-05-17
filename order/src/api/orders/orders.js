import request from '@/utils/request'

// 分页查询所有订单信息
export function selectAllProductOrderAsPage(data) {
  return request({
      url: '/proOrderController/selectAllProductOrderAsPage',
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

// 保存采购报价物料信息
export function selectPurchaseMaterielByPkProduct(data) {
  return request({
    url: '/workToolsController/selectPurchaseMaterielByPkProduct',
    method: 'post',
    data
  })
}

// 保存采购报价物料信息
export function savePurchaseMaterielPo(data) {
  return request({
    url: '/workToolsController/savePurchaseMaterielPo',
    method: 'post',
    data
  })
}