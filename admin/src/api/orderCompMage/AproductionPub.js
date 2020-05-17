import request from '@/utils/request'

// 保存生产流程中的文件信息
export function saveOrderCompFile(data) {
  return request({
      url: '/aOrderCompPubController/saveOrderCompFile',
      method: 'post',
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      data
  })
}