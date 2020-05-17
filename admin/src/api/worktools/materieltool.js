import request from '@/utils/request'

// 解析物料文件中的数据
export function resolvPurchaseItemFile(data) {
  return request({
    url: '/workToolsController/resolvPurchaseItemFile',
    method: 'post',
    headers: { 
      'Content-Type': 'multipart/form-data'
     },
    data
  })
}

// 保存采购报价中物料报价信息(BOM文件解析后)的图片信息
export function savePurchaseImageFile(data) {
  return request({
    url: '/workToolsController/savePurchaseImageFile',
    method: 'post',
    data
  })
}

// 查询采购报价中的产品信息集合
export function selectPurchaseQuoteToWorkToolRef(data) {
  return request({
    url: '/workToolsController/selectPurchaseQuoteToWorkToolRef',
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