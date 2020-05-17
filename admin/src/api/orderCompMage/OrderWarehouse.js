import request from '@/utils/request'

// 分页查询库房备料数据
export function selectAllMaterielWareHouseAsPage(data) {
  return request({
      url: '/omgMaterielWareHuoseProtFlowController/selectAllMaterielWareHouseAsPage',
      method: 'post',
      data
  })
}

// 根据主键集合更新库房备料数据
export function updateMaterielWareHouse(data) {
  return request({
      url: '/omgMaterielWareHuoseProtFlowController/updateMaterielWareHouse',
      method: 'post',
      data
  })
}