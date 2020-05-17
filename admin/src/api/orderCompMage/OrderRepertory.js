import request from '@/utils/request'

// 分页查询物料入库数据
export function selectAllMaterielPutinWareAsPage(data) {
  return request({
      url: '/omgMaterielPutinWareProFlowController/selectAllMaterielPutinWareAsPage',
      method: 'post',
      data
  })
}

// 根据主键更新物料入库数据
export function updateMaterielPutinWare(data) {
  return request({
      url: '/omgMaterielPutinWareProFlowController/updateMaterielPutinWare',
      method: 'post',
      data
  })
}

// 根据物料入库主表主键查询字表数据
export function selectMaterielWareBByHPrimary(data) {
  return request({
      url: '/omgMaterielPutinWareProFlowController/selectMaterielWareBByHPrimary',
      method: 'post',
      data
  })
}

// 保存物料入库子表数据
export function saveMaterielWareB(data) {
  return request({
      url: '/omgMaterielPutinWareProFlowController/saveMaterielWareB',
      method: 'post',
      data
  })
}