import request from '@/utils/request'

// 分页查询成品出库数据
export function selectAllOmgPrduFinishPutoutAsPage(data) {
  return request({
      url: '/omgPrduFinishPutoutController/selectAllOmgPrduFinishPutoutAsPage',
      method: 'post',
      data
  })
}

// 插入成品出库数据
export function insertOmgPrduFinishPutout(data) {
  return request({
      url: '/omgPrduFinishPutoutController/insertOmgPrduFinishPutout',
      method: 'post',
      data
  })
}

// 根据主键集合删除成品出库数据
export function deleteOmgPrduFinishPutoutByPks(data) {
  return request({
      url: '/omgPrduFinishPutoutController/deleteOmgPrduFinishPutoutByPks',
      method: 'post',
      data
  })
}

// 更新成品出库数据
export function updateOmgPrduFinishPutout(data) {
  return request({
      url: '/omgPrduFinishPutoutController/updateOmgPrduFinishPutout',
      method: 'post',
      data
  })
}

// 根据主表主键查询字表数据分页
export function selectAllOmgPrduFinishPutoutSubDataAsPage(data) {
  return request({
      url: '/omgPrduFinishPutoutController/selectAllOmgPrduFinishPutoutSubDataAsPage',
      method: 'post',
      data
  })
}

// 保存成品出库子表数据
export function saveOmgPrduFinishPutoutSubData(data) {
  return request({
      url: '/omgPrduFinishPutoutController/saveOmgPrduFinishPutoutSubData',
      method: 'post',
      data
  })
}
