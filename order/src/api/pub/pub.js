import axios from 'axios'

// 根据文件名称下载文件
export function downloadProductFile(data) {
  return axios({
    url: process.env.BASE_API + '/sale/downloadProductFile',
    method: 'post',
    responseType: 'blob',
    data
  })
}

// 根据文件名称下载文件
export function sendDingMsgByPsndoc(data) {
  return axios({
    url: process.env.BASE_API + '/dingerp/sendDingMsgByPsndoc',
    method: 'post',
    data
  })
}

// 查询流程图
export function findFlowImage(data) {
  return axios({
      url: process.env.BASE_API + '/pubflowctro/processDiagram',
      method: 'post',
      responseType: 'blob',
      data
  })
}