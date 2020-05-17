import request from '@/utils/request'

// 分页查询所有加工工艺信息
export function listTecaudit(data) {
  if (data.billState) {
    data.billState = 2
  }
  return request({
      url: '/technics/selectAllTechniceAsPage',
      method: 'post',
      data
  })
}

// 更新加工工艺信息
export function updateTecaudit(data) {
  return request({
      url: '/sale/updateProduct',
      method: 'post',
      data
  })
}

// 结束工艺审核
export function overTechnicsProccess(data) {
  return request({
      url: '/technicsproccess/overTechnicsProccess',
      method: 'post',
      data
  })
}

// 根据产品主键查询其采购报价物料信息
export function selectPurchaseMaterielByPkProduct(data) {
  return request({
      url: '/technics/selectPurchaseMaterielByPkProduct',
      method: 'post',
      data
  })
}