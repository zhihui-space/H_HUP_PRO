<template>
<!-- 综合管理主页面 -->
  <div>
    <!--基础列表界面-->
    <Table 
      :columns="columns" 
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <Productcompcontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent">
    </Productcompcontent>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import Productcompcontent from '@/views/product/compinfo/content'
import { selectAllOrderInfoAsPage } from '@/api/productionProccess/productionProccess'

export default {
  name: "ProductCompinfo",
  components: { Table, Productcompcontent },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      columns: [
        {prop: 'pkProductOrder', label: '订单主键', width: '10', primary: true},
        {prop: 'contractNo', label: '合同编号', width: '160'},
        {prop: 'customerCode', label: '客户编号', width: '160'},
        {prop: 'pkPsndocShow', label: '销售负责人', width: '160'},
        {prop: 'ts', label: '下单日期', width: '160'},
        {prop: 'transportType', label: '运输方式', width: '160'},
      ],
      select: {
        'select': selectAllOrderInfoAsPage,
        'queryParam': { dr: 0 }
      },
      top_btn: [
      ],
      act_btn: [
        {
          name: '查看',
          code: 'LOOKUP',
          btnSize:'mini'
        },
      ],
      replace: [
        {name: 'transportType',replace: { '0':"甲方负责",'1':"乙方负责" } }
      ]
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      if (param.btnCode === 'LOOKUP') {
        this.content.updateRow = null
        this.openContent('查看', null)
        this.content.updateRow = param.bindData
      }
    },
    openContent(title, action) { // 打开内容界面Dialog
    debugger
      this.content.visiable = true
      this.content.title = title
      this.content.action = action
    },
    closeContent(tempData) { // 关闭内容界面Dialog
      this.content.visiable = false
    }
  }
}
</script>

<style>

</style>