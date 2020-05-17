import request from '@/utils/request'

// 分页查询成品质检数据
export function selectAllOmgBeComeAsPage(data) {
  return request({
      url: '/omgBecomeProFlowController/selectAllOmgBeComeAsPage',
      method: 'post',
      data
  })
}

// 更新成品质检数据
export function updateOmgBecome(data) {
  return request({
      url: '/omgBecomeProFlowController/updateOmgBecome',
      method: 'post',
      data
  })
}

// 分页查询成品质检子表数据
export function selectAllOmgBecomeSubDataAsPage(data) {
  return request({
      url: '/omgBecomeProFlowController/selectAllOmgBecomeSubDataAsPage',
      method: 'post',
      data
  })
}

// 保存成品质检子表数据
export function saveOmgBecomeSubData(data) {
  return request({
      url: '/omgBecomeProFlowController/saveOmgBecomeSubData',
      method: 'post',
      data
  })
}