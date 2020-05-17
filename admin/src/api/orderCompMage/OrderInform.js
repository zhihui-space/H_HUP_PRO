import request from '@/utils/request'

// 分页查询通知开票信息
export function selectAllOmgNoticeInvoiceAsPage(data) {
  return request({
      url: '/OmgNoticeInvoiceController/selectAllOmgNoticeInvoiceAsPage',
      method: 'post',
      data
  })
}

// 新增通知开票
export function insertOmgNoticeInvoice(data) {
  return request({
      url: '/OmgNoticeInvoiceController/insertOmgNoticeInvoice',
      method: 'post',
      data
  })
}

// 根据主键更新通知开票
export function updateOmgNoticeInvoice(data) {
  return request({
      url: '/OmgNoticeInvoiceController/updateOmgNoticeInvoice',
      method: 'post',
      data
  })
}

// 根据主键集合删除通知开票信息
export function deleteOmgNoticeInvoiceByPks(data) {
  return request({
      url: '/OmgNoticeInvoiceController/deleteOmgNoticeInvoiceByPks',
      method: 'post',
      data
  })
}

// 根据合同主表主键查询子表产品信息参照
export function selectAllProductOrderInfoAs(data) {
  return request({
      url: '/OmgNoticeInvoiceController/selectAllProductOrderInfoAs',
      method: 'post',
      data
  })
}