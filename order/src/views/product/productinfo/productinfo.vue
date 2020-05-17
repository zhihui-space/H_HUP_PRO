<template>
  <div>
    <!--基础列表界面-->
    <Table :columns="columns" 
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <Productcontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      @refreshList="queryListData">
    </Productcontent>
    <!--流程图Dialog-->
    <FlowDialog
      :title="flowImageData.title"
      :visiable="flowImageData.visiable"
      :flowPrice="flowImageData.flowPrice"
      @close="closeFlowImageDialog()"></FlowDialog>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import FlowDialog from '@/views/dashboard/components/FlowDialog'
import Productcontent from '@/views/product/productinfo/content'
import { listOrderProduct, addProduct, deleteProductByPks, updateProduct, applyProductToTechnics } from '@/api/product/product'
import { sendDingMsgByPsndoc, findFlowImage } from '@/api/pub/pub'

export default {
  name: "saleproduct",
  components: { Table, FlowDialog, Productcontent },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      flowImageData: {
        visiable: false,
        flowPrice: '',
        title: '流程图'
      },
      columns: [
        {prop: 'pkProduct', label: '主键', width: '10', primary: true},
        {prop: 'name', label: '产品名称', width: '120', search: true, fixedLeft: true},
        {prop: 'code', label: '产品编码', width: '120'},
        {prop: 'model', label: '产品型号', width: '120'},
        {prop: 'pkPsndocShow', label: '销售负责人', width: '120'},
        {prop: 'materialSource', label: '物料来源', width: '120'},
        {prop: 'pcbSource', label: 'PCB来源', width: '120'},
        {prop: 'customerCode', label: '客户编码', width: '120'},
        {prop: 'steelMeshSource', label: '钢网来源', width: '120'},
        {prop: 'technicsState', label: '单据状态', width: '140'},
        {prop: 'creationtime', label: '创建时间', width: '200'}
      ],
      select: {
        'select': listOrderProduct,
        'queryParam': {dr: 0}
      },
      top_btn: [
        {name: '录入',code: 'ADD',action: addProduct}
      ],
      act_btn: [
        { name: '申请审核', code: 'APPLYTECHNICS', when: {'technicsState': [0]}, action: applyProductToTechnics, width: 330 },
        { name: '修改', code: 'UPDATE', when: {'technicsState': [0]}, action: updateProduct },
        { name: '删除', code: 'DELETE', when: {'technicsState': [0]}, action: deleteProductByPks },
        { name: '查看', code: 'LOOKUP', when: {'technicsState': [20, 21, 22]} },
        { name: '查看流程',code: 'QUERYFLOW', when: {'technicsState': [21]}}
      ],
      replace: [
        {name: 'technicsState',replace: { 0: "自由态", 20: "已申请", 21: "工艺审核中", 22: "工艺审核完成"}},
        {name: 'materialSource',replace: { 1: "甲方提供",2: "乙方提供",3: "部分甲方提供"}},
        {name: 'steelMeshSource',replace: { 0: "无",1: "甲方提供",2: "乙方提供"}},
        {name: 'pcbSource',replace: { 1: "甲方提供",2: "乙方提供"}}
      ]
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      // 录入
      if (param.btnCode === 'ADD') {
        this.openContent('录入', param.btnAction)
      }
      // 修改
      if (param.btnCode === 'UPDATE') {
        this.openContent('修改', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 查看
      if (param.btnCode === 'LOOKUP') {
        this.openContent('查看', null)
        this.content.updateRow = param.bindData
      }
      // 申请工艺审核
      if (param.btnCode === 'APPLYTECHNICS') {
        let rowData = param.bindData
        let applyParam = {pkProduct: rowData.pkProduct, pkPsndoc: rowData.pkPsndoc, technicsState: 20}
        applyProductToTechnics(applyParam).then((response) => {
          this.$message({ message: '申请成功', type: 'success' })
          this.queryListData()
        })
      }
      // 查看流程
      if (param.btnCode === 'QUERYFLOW') {
        let queryParam = { processInstanceId: param.bindData.processInstanceId }
        findFlowImage(queryParam).then((response) => {
          let url = window.URL.createObjectURL(response.data)
          if (url) {
            this.flowImageData.flowPrice = url
            this.flowImageData.visiable = true
          } else {
            this.flowImageData.flowPrice = ''
            
          }
        }).catch(err => {
          this.$message({ message: '图片加载失败!', type: 'error' })
        })
      }
    },
    queryListData(queryParam) { // 刷新界面数据
      if (queryParam) {
        let queryDialogParam ={
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customShortName: queryParam.customShortName,
          technicsState: queryParam.technicsState,
          creationdateBegin: queryParam.creationdateBegin,
          creationdateEnd: queryParam.creationdateEnd
        }
        let newSelect = {select: this.select.select, queryParam: queryDialogParam }
        this.select = newSelect
      } else {
        let newSelect = {select: this.select.select, queryParam: {dr: 0} }
        this.select = newSelect
      }
    },
    openContent(title, action) { // 打开内容界面Dialog
      this.content.visiable = true
      this.content.title = title
      this.content.action = action
    },
    closeContent(tempData) { // 关闭内容界面Dialog
      this.content.visiable = false
    },
    // 关闭流程图Dialog
    closeFlowImageDialog() {
      this.flowImageData.visiable = false
    },
  }
}
</script>

<style>

</style>
