<template>
  <div>
    <!--基础列表界面-->
    <!-- 物料价格库 -->
    <Table :columns="columns" 
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <Materieldatabasecontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @refreshList="queryListData"
      @close="closeContent">
    </Materieldatabasecontent>
    <!--导入文件Dialog-->
    <Importmaterieldatabase
      :visiable="importExcel.visiable"
      @refreshList="queryListData"
      @close="closeImportDialog">
    </Importmaterieldatabase>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import Materieldatabasecontent from '@/views/purchase/materieldb/content'
import Importmaterieldatabase from '@/views/purchase/materieldb/importExcel'
import { listBdMaterielDataBase, insertMaterielDataBase, deleteBdMaterielDataBaseByPks, updateMaterielDataBase } from '@/api/purchase/materieldb'

export default {
  name: 'Materieldatabase',
  components: { Table, Materieldatabasecontent, Importmaterieldatabase },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      importExcel: {
        visiable: false
      },
      columns: [
        {prop: 'pkDbMateriel', label: '主键', width: '10', primary: true},
        {prop: 'materielDate', label: '单据日期', width: '120'},
        {prop: 'materielCode', label: '存货编码', width: '120'},
        {prop: 'materialName', label: '物料名称', width: '120'},
        {prop: 'materialFullname', label: '存货全名', width: '120'},
        {prop: 'potting', label: '存货型号', width: '160'},
        {prop: 'norms', label: '存货规格', width: '120'},
        {prop: 'usageUnit', label: '单位', width: '120'},
        {prop: 'countNum', label: '数量', width: '180'},
        {prop: 'unitPrice', label: '单价', width: '180'},
        {prop: 'taxUnitPrice', label: '含税单价', width: '180'}
      ],
      select: {
        'select': listBdMaterielDataBase,
        'queryParam': {dr: 0}
      },
      top_btn: [
        {
          name: '录入',
          code: 'ADD',
          action: insertMaterielDataBase,
          btnSize:'mini'
        },
        {
          name: '导入',
          code: 'IMPORT',
          action: null,
          btnSize:'mini'
        }
      ],
      act_btn: [
        {
          name: '修改',
          code: 'UPDATE', 
          action: updateMaterielDataBase, 
          width: 200,
          btnSize:'mini'
        },
        {
          name: '删除',
          code: 'DELETE', 
          action: deleteBdMaterielDataBaseByPks,
          btnSize:'mini'
        },
      ],
      replace: [
        // {name: 'billState',replace: { 0: "自由态",1: "报价流程进行中",2: "已认领",3: "采购报价完成", 4: "工艺审核完成",5: "生产报价完成",6: "销售报价完成"}}
      ]
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      if (param.btnCode === 'ADD') {
        this.openContent('录入', param.btnAction)
      }
      if (param.btnCode === 'UPDATE') {
        this.openContent('修改', param.btnAction)
        this.content.updateRow = param.bindData
      }
      if (param.btnCode === 'IMPORT') {
        this.openImportDialog()
      }
    },
    queryListData(queryParam) { // 刷新界面数据
      let newSelect = {select: this.select.select, queryParam: {dr: 0} }
      this.select = newSelect
    },
    openContent(title, action) { // 打开内容界面Dialog
      this.content.visiable = true
      this.content.title = title
      this.content.action = action
    },
    closeContent(tempData) { // 关闭内容界面Dialog
      this.content.visiable = false
    },
    openImportDialog() { // 打开导入框
      this.importExcel.visiable = true
    },
    closeImportDialog() { // 关闭导入框
      this.importExcel.visiable = false
    }
  }
}
</script>

<style>

</style>