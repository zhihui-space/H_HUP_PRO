import request from '@/utils/request'

// 分页查询来料质检数据
export function selectAllOmgMaterielQualityAsPage(data) {
  return request({
      url: '/omgMaterielQualityProFlowController/selectAllOmgMaterielQualityAsPage',
      method: 'post',
      data
  })
}

// 新增来料质检数据
export function insertOmgMaterielQuality(data) {
  return request({
      url: '/omgMaterielQualityProFlowController/insertOmgMaterielQuality',
      method: 'post',
      data
  })
}

// 根据主键集合删除来料质检数据
export function deleteOmgMaterielQualityByPks(data) {
  return request({
      url: '/omgMaterielQualityProFlowController/deleteOmgMaterielQualityByPks',
      method: 'post',
      data
  })
}

// 根据主键更新来料质检数据
export function updateOmgMaterielQuality(data) {
  return request({
      url: '/omgMaterielQualityProFlowController/updateOmgMaterielQuality',
      method: 'post',
      data
  })
}