import request from '@/utils/request'

// 分页查询所有产品信息
export function listProduct(data) {
    return request({
        url: '/sale/selectAllProductAsPage',
        method: 'post',
        data
    })
}



// 新增产品信息
export function addProduct(data) {
    return request({
        url: '/sale/insertProduct',
        method: 'post',
        data
    })
}

// 根据主键集合删除产品信息
export function deleteProductByPks(data) {
    return request({
        url: '/sale/deleteProductByPks',
        method: 'post',
        data
    })
}

// 更新产品信息
export function updateProduct(data) {
    return request({
        url: '/sale/updateProduct',
        method: 'post',
        data
    })
}

// 送审产品到采购报价及生产报价-开始报价流程
export function startQuoteProccess(data) {
  return request({
      url: '/quoteprocess/startQuoteProccess',
      method: 'post',
      data
  })
}

// 启动工艺审核流程
export function commitTechnics(data) {
    return request({
        url: '/technicsproccess/startTechnicsProccess',
        method: 'post',
        data
    })
}

// 保存产品中的3个文件到数据库
export function saveProductFile(data) {
  return request({
    url: '/sale/saveProductFile',
    method: 'post',
    headers: { 
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}