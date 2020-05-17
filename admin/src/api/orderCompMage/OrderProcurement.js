import request from '@/utils/request'

// 分页查询物料采购列表数据
export function selectAllMaterielPutchaseAsPage(data) {
  return request({
      url: '/omgMaterielPurchaseProtFlowController/selectAllMaterielPutchaseAsPage',
      method: 'post',
      data
  })
}

// 新增物料采购数据
export function insertMaterielPurchase(data) {
  return request({
      url: '/omgMaterielPurchaseProtFlowController/insertMaterielPurchase',
      method: 'post',
      data
  })
}

// 根据主键集合删除物料采购数据
export function deleteMaterielPurchaseByPks(data) {
  return request({
      url: '/omgMaterielPurchaseProtFlowController/deleteMaterielPurchaseByPks',
      method: 'post',
      data
  })
}

// 根据主键更新物料采购数据
export function updateMaterielPurchase(data) {
  return request({
      url: '/omgMaterielPurchaseProtFlowController/updateMaterielPurchase',
      method: 'post',
      data
  })
}