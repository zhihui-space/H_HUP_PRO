import request from '@/utils/request'

// 查询成品质检数量
export function OmgCount(data) {
    return request({
        url: '/orderSaleStartController/OmgCount',
        method: 'post',
        data
    })
}