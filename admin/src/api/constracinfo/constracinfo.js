import request from '@/utils/request'

// 分页查询汇总合同页面信息
export function selectAllOrderSummaryAsPage(data) {
    return request({
        url: '/orderSummaryIntoController/selectAllOrderSummaryAsPage',
        method: 'post',
        data
    })
}

// 根据客户信息主键查询客户详情
export function selectCustomerInfoByPrimary(data) {
    return request({
        url: '/orderSummaryIntoController/selectCustomerInfoByPrimary',
        method: 'post',
        data
    })
}

// 根据产品子表主键查询合同字表详细信息 使用与生产流程中的查看详情
export function selectProductOrderBByPrimary(data) {
    return request({
        url: '/orderSummaryIntoController/selectProductOrderBByPrimary',
        method: 'post',
        data
    })
}

// 根据合同子表主键查询生产流程信息
export function selectProductionInfoByPkProductB(data) {
    return request({
        url: '/orderSummaryIntoController/selectProductionInfoByPkProductB',
        method: 'post',
        data
    })
}