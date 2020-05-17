import request from '@/utils/request'

// 查询客户基本信息集合
export function selectCustomInfo(data) {
  return request({
      url: '/orderCustomer/selectCustomInfo',
      method: 'post',
      data
  })
}

// 根据客户查询客户设置的默认联系人
export function selectCustomdocDefaultPsn(data) {
  return request({
      url: '/orderCustomer/selectCustomdocDefaultPsn',
      method: 'post',
      data
  })
}

// 查询所有客户作为参照
export function listCustomerAsRef() {
  return request({
      url: '/orderCustomer/selectAllCustomerAsRef',
      method: 'post'
  })
}

// 增加或修改收货信息
export function saveTakeOver(data) {
  return request({
      url: '/orderCustomer/saveTakeOver',
      method: 'post',
      data
  })
}

// 增加或修改发票信息
export function saveInvoice(data) {
  return request({
      url: '/orderCustomer/saveInvoice',
      method: 'post',
      data
  })
}

// 保存或修改客户人员信息
export function saveCustomdoc(data) {
  return request({
      url: '/orderCustomer/saveCustomdoc',
      method: 'post',
      data
  })
}

// 根据主键集合删除客户人员档案信息
export function deleteBdCustomdocByPks(data) {
  return request({
      url: '/orderCustomer/deleteBdCustomdocByPks',
      method: 'post',
      data
  })
}

// 修改客户信息-下单平台用户
export function updateBdCustomer(data) {
  return request({
      url: '/orderCustomer/updateBdCustomer',
      method: 'post',
      data
  })
}

// 查询所有客户人员信息档案作为参照
export function selectAllCustomdocAsRef(data) {
    return request({
        url: '/orderCustomer/selectAllCustomdocAsRef',
        method: 'post',
        data
    })
}

// 分页查询用户管理人员档案
export function selectAllBdCustomdocAsPage(data) {
  return request({
      url: '/orderCustomer/selectAllBdCustomdocAsPage',
      method: 'post',
      data
  })
}

// 修改密码
export function updateCustomerPassword(data) {
  return request({
      url: '/orderCustomer/updateCustomerPassword',
      method: 'post',
      data
  })
}