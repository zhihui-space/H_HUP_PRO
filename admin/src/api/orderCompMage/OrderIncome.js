import request from '@/utils/request'

// 分页查询成品入库
export function selectAllOmgPrduFinishAsPage(data) {
  return request({
      url: '/omgPrduFinishPutinController/selectAllOmgPrduFinishAsPage',
      method: 'post',
      data
  })
}

// 插入成品入库数据
export function insertOmgPrduFinish(data) {
  return request({
      url: '/omgPrduFinishPutinController/insertOmgPrduFinish',
      method: 'post',
      data
  })
}

// 根据主键集合删除成品入库
export function deleteOmgPrduFinisByPks(data) {
  return request({
      url: '/omgPrduFinishPutinController/deleteOmgPrduFinisByPks',
      method: 'post',
      data
  })
}

// 根据主键更新成品入库
export function updateOmgPrduFinis(data) {
  return request({
      url: '/omgPrduFinishPutinController/updateOmgPrduFinis',
      method: 'post',
      data
  })
}

// 分页查询成品入库子表数据
export function selectAllPrduFinisSubDataAsPage(data) {
  return request({
      url: '/omgPrduFinishPutinController/selectAllPrduFinisSubDataAsPage',
      method: 'post',
      data
  })
}

// 保存成品入库子表数据
export function savePrduFinisSubData(data) {
  return request({
      url: '/omgPrduFinishPutinController/savePrduFinisSubData',
      method: 'post',
      data
  })
}