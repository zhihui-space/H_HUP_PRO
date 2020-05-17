import request from '@/utils/request'


// 分页查询所有产品信息
export function listProductCustomer(data) {
    return request({
        url: '/product/selectProductCustomerAsPage',
        method: 'post',
        data
    })  
}

// 分页查询所有产品信息
export function listProduction(data) {
    return request({
        url: '/production/selectAllProductionAsPage',
        method: 'post',
        data
    })
}
    
// 添加生产计划
export function insertProduction(data) {
    return request({
        url: '/production/insertProduction',
        method: 'post',
        data
    })  
}

// 根据主键生产计划
export function deleteProductionByPks(data) {
    return request({
        url: '/production/deleteProductionByPks',
        method: 'post',
        data
    })  
}

// 修改生产计划
export function updateProduction(data) {
    return request({
        url: '/production/updateProduction',
        method: 'post',
        data
    })  
}

// 分页查找仓库备料数据
export function listWarehouse(data) {
    return request({
        url: '/warehouse/selectAllWarehousePoAsPage',
        method: 'post',
        data
    })
}  

//修改仓库备料数据    
export function updateWarehouse(data) {
    return request({
        url: '/warehouse/updateWarehouse',
        method: 'post',
        data
    })      
}

//修改仓库备料状态    
export function updateWarehouseState(data) {
    return request({
        url: '/warehouse/updateWarehouseStateByPks',
        method: 'post',
        data
    })      
}

//分页查询采购备料信息   
export function listProcurement(data) {
    return request({
        url: '/procurement/selectAllProcurementAsPage',
        method: 'post',
        data
    })      
}

//修改采购备料信息   
export function updateProcurement(data) {
    return request({
        url: '/procurement/updateProcurement',
        method: 'post',
        data
    })      
}

//删除采购备料信息   
export function deleteProcurement(data) {
    return request({
        url: '/procurement/deleteProcurementByPks',
        method: 'post',
        data
    })      
}

//添加采购备料信息   
export function insertProcurement(data) {
    return request({
        url: '/procurement/insertProcurement',
        method: 'post',
        data
    })      
}
//添加销售发起信息
export function insertSalesLaunch(data) {
    return request({
        url: '/salesLaunch/insertSalesLaunch',
        method: 'post',
        data
    })      
}

//查询订单金额信息
export function selectSalesAmountByProductId(data) {
    return request({
        url: '/salesLaunch/selectSalesAmountByProductId',
        method: 'post',
        data
    })      
}


//查询销售发起数据
export function selectAllSalesLaunchAs(data) {
    return request({
        url: '/salesLaunch/selectAllSalesLaunchAs',
        method: 'post',
        data
    })      
}
// 修改销售发起的数据
export function updateSalesLaunchById(data) {
    return request({
        url: '/salesLaunch/updateSalesLaunchById',
        method: 'post',
        data
    })  
}
// 删除销售发起的数据
export function deleteSalesLaunchById(data) {
    return request({
        url: '/salesLaunch/deleteSalesLaunchById',
        method: 'post',
        data
    })  
}