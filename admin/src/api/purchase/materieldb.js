import request from '@/utils/request'
import axios from 'axios'

// 导入物料数据库Excel文件数据
export function resolvMaterielDataBaseExcelData(data) {
  return axios({
      url: process.env.BASE_API + '/purchase/resolvMaterielDataBaseExcelData',
      method: 'post',
      data
  })
}

// 分页查询物料数据
export function listBdMaterielDataBase(data) {
  return request({
      url: '/purchase/selectAllBdMaterielDataBaseAsPage',
      method: 'post',
      data
  })
}

// 插入物料数据
export function insertMaterielDataBase(data) {
  return request({
      url: '/purchase/insertMaterielDataBase',
      method: 'post',
      data
  })
}

// 根据主键集合删除物料数据
export function deleteBdMaterielDataBaseByPks(data) {
  return request({
      url: '/purchase/deleteBdMaterielDataBaseByPks',
      method: 'post',
      data
  })
}

// 根据主键更新物料数据
export function updateMaterielDataBase(data) {
  return request({
      url: '/purchase/updateMaterielDataBase',
      method: 'post',
      data
  })
}