<template>
  <div>
    <!--基础列表界面-->
    <Table :columns="columns" 
      :fastFilter="null"
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <OrderInfoContent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @queryListData="queryListData"
      @close="closeContent">
    </OrderInfoContent>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import OrderInfoContent from '@/views/orders/orderinfo/content'
import { selectAllProductOrderAsPage, insertProductOrder, deleteProductOrderByPks, updateProductOrder } from '@/api/orders/orders'
import { sendDingMsgByPsndoc } from '@/api/pub/pub'

export default {
  name: "OrderInfo",
  components: { Table, OrderInfoContent },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      columns: [
        {prop: 'pkProductOrder', label: '主键', width: '10', primary: true},
        {prop: 'pkCustomer', label: '客户主键', width: '150', show: false},
        {prop: 'pkTakeover', label: '收货信息主键', width: '160', show: false },      
        {prop: 'materialSourceShow', label: '签订日期', width: '160'},
        {prop: 'materialSourceShow', label: '预计交货日期', width: '160'},
        {prop: 'materialSourceShow', label: '合同编号', width: '160'},
        {prop: 'materialSourceShow', label: '产品编号', width: '160'},
        {prop: 'materialSourceShow', label: '产品名称', width: '160'},
        {prop: 'materialSourceShow', label: '订单数量', width: '160'},
        {prop: 'materialSourceShow', label: '含税单价', width: '160'},
        {prop: 'materialSourceShow', label: '税率', width: '160'},
        {prop: 'materialSourceShow', label: '价税合计', width: '160'},
        {prop: 'materialSourceShow', label: '合同类型', width: '160'},
        {prop: 'materialSourceShow', label: '销售员', width: '160'},
        {prop: 'materialSourceShow', label: '订单状态', width: '160'},
        {prop: 'materialSourceShow', label: '订单备注', width: '160'},  
        {prop: 'materialSourceShow', label: '供料方式', width: '160'},        
        {prop: 'taxinclud', label: '是否含税', width: '160'},
        {prop: 'urgentShow', label: '是否加急', width: '160', show: false},
        {prop: 'transportTypeShow', label: '运输方式', width: '160'},
        {prop: 'paymentTypeShow', label: '付款方式', width: '160'},
        {prop: 'billState', label: '单据状态', width: '160'},
        {prop: 'creator', label: '创建人', width: '160', show: false},
        {prop: 'creationtime', label: '创建时间', width: '160', show: false},
        {prop: 'modifier', label: '最后修改人', width: '160', show: false},
        {prop: 'modifiedtime', label: '最后修改时间', width: '160', show: false},
        {prop: 'dr', label: '删除标志', width: '140', show: false},
        {prop: 'ts', label: '时间戳', width: '200', show: false}
      ],
      select: {
        'select': selectAllProductOrderAsPage,
        'queryParam': { dr: 0 }
      },
      top_btn: [
        {name: '录入',code: 'ADD',action: insertProductOrder }
      ],
      act_btn: [
        { 
          name: '修改', 
          code: 'UPDATE', 
          when: {'billState': [0]}, 
          action: updateProductOrder,
          width:300,                                                                   
        },
        { 
          name: '删除', 
          code: 'DELETE', 
          when: {'billState': [0]}, 
          action: deleteProductOrderByPks 
        },
        { 
          name: '提交订单', 
          code: 'COMMIT', 
          when: {'billState': [0]}, 
          action: updateProductOrder 
        },
        { 
          name: '查看', 
          code: 'LOOKUP', 
          when: {'billState': [30, 31]} 
        }
      ],
      replace: [
        {name: 'billState',replace: { '0': '自由态', '30': '报价中', '31': '报价完成'}},
        {name: 'materialSourceShow',replace: { '0': '甲方提供', '1': '乙方提供'}},
        {name: 'urgentShow',replace: { '0': '否', '1': '料齐三天发货(费用：1000元)', '2': '料齐三天发货(费用：500元)'}},
        {name: 'transportTypeShow',replace: { '0': '甲方负责', '1': '乙方负责'}},
        {name: 'paymentTypeShow',replace: { '0': '线下付款', '1': '账户扣款'}},
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
      // 提交订单-报价申请
      if (param.btnCode === 'COMMIT') {
        this.$confirm('是否确认提交产品订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let updateParam = {
            pkProductOrder: param.bindData.pkProductOrder,
            billState: 30
          }
          updateProductOrder(updateParam).then((response) => {
            if (response.success) {
              this.queryListData()
              this.$message({ type: 'success', message: '提交成功!' })
            }
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消提交!' })
        })
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
    }
  }
}
</script>

<style>

</style>
