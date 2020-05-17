<template>
  <div>
    <div class="icon" >
      <i class="el-icon-view"><span>报价</span></i>
      <i class="el-icon-bell"><span>完成报价</span></i>
      <i class="el-icon-d-arrow-right"><span>查看</span></i>
      <i class="el-icon-edit"><span>修订</span></i>
      <i class="el-icon-tickets"><span>物料解析</span></i>
    </div>
    <!--基础列表界面-->
    <!-- 采购报价 -->
    <Table :columns="columns" 
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <Purchasequotecontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent">
    </Purchasequotecontent>
    <!--查询模板界面-->
    <ProductQueryDialog
      :visiable="queryDialog.visiable"
      @close="closeQueryDialog"
      @refreshList="queryListData">
    </ProductQueryDialog>
    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialog.visiable"
      :paramData="commitDialog.paramData"
      @close="closeCommitDialog"
      @commitMethod="commitPurchaseMethod">
    </CommitDialog>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import CommitDialog from '@/components/Commitdingding/CommitDialog'
import Purchasequotecontent from '@/views/purchase/quote/content'
import ProductQueryDialog from '@/views/purchase/quote/queryDialog'
import { listPurchase, updatePurchaseQuote, overPassPurchaseQuote } from '@/api/purchase/quote'
import { sendDingMsgByPsndoc } from '@/api/pub/pub'

export default {
  name: "purchasequote",
  components: { Table, CommitDialog, Purchasequotecontent, ProductQueryDialog },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      queryDialog: {
        visiable: false
      },
      commitDialog: {
        visiable: false,
        paramData: null
      },
      columns: [
        {prop: 'pkPurchaseQuote', label: '主键', width: '10', primary: true},
        {prop: 'customerCode', label: '客户编号', width: '120'},
        {prop: 'pkPsndocShow', label: '销售负责人', width: '120'},
        {prop: 'productCode', label: '产品编号', width: '120'},
        {prop: 'productName', label: '产品名称', width: '120'},
        {prop: 'quoteEndDate', label: '采购报价有效日期', width: '160'},
        {prop: 'taxinclud', label: '是否含税', width: '120'},
        {prop: 'billState', label: '单据状态', width: '120'},
        {prop: 'approverShow', label: '审批人', width: '120'},
        {prop: 'approvetime', label: '审批时间', width: '180'}
      ],
      select: {
        'select': listPurchase,
        'queryParam': {dr: 0}
      },
      top_btn: [
        {
          name: '查询',
          code: 'QUERYDIALOG',
          action: listPurchase
        },
        {
          name: '批量通过',
          code: 'BATCHOVERQUOTE',
          action: updatePurchaseQuote
        }
      ],
      act_btn: [
        {
          name: '报价',
          code: 'DOQUOTE', 
          when: {'billState': [2]}, 
          action: updatePurchaseQuote,
          btnSize: 'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-view',
        },
        {
          name: '完成报价',
          code: 'OVERQUOTE', 
          when: {'billState': [2]}, 
          action: updatePurchaseQuote,
          btnSize: 'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-bell',
        },
        {
          name: '查看',
          code: 'LOOKUP', 
          when: {'billState': [0,1,3,6]}, 
          action: updatePurchaseQuote,
          btnSize: 'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-d-arrow-right',
        },
        {
          name: '修订',
          code: 'REVISE', 
          when: {'billState': [3]}, 
          action: updatePurchaseQuote,
          btnSize: 'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
        },
        {
          name: '物料解析',
          code: 'MATERIELANALY', 
          when: {'billState': [2, 3]}, 
          action: null,
          btnSize: 'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-tickets',
        }
      ],
      replace: [
        {
          name: 'taxinclud',
          replace: {
            1: "不含税",
            1.13: "含税"
          }
        },
        {
          name: 'billState',
          replace: {
            0: "自由态",
            1: "报价流程进行中",
            2: "已认领",
            3: "采购报价完成", 
            4: "工艺审核完成",
            5: "生产报价完成",
            6: "销售报价完成"
          }
        }
      ]
    }
  },
  created() {
    let productCode = this.$route.query.productCode
    if (productCode) {
      this.select.queryParam.productCode = productCode
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      if (param.btnCode === 'BATCHOVERQUOTE') {
      }
      // 查看事件
      if (param.btnCode === 'LOOKUP') {
        this.openContent('查看', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 报价事件
      if (param.btnCode === 'DOQUOTE') {
        this.openContent('采购报价', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 修订事件
      if (param.btnCode === 'REVISE') {
        this.openContent('采购报价', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 查询界面
      if (param.btnCode === 'QUERYDIALOG') {
        this.openQueryDialog()
      }
      // 完成报价事件
      if (param.btnCode === 'OVERQUOTE') {
        this.commitDialog.paramData = param
        this.openCommitDialog()
      }
      // 物料解析
      if (param.btnCode === 'MATERIELANALY') {
        let queryParam = { pkProduct: param.bindData.pkProduct }
        this.$router.push({ path: '/MENU9047/MENU44558', query: queryParam })
      }
    },
    queryListData(queryParam) { // 刷新界面数据
      if (queryParam) {
        let queryDialogParam = {
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customerCode: queryParam.customerCode,
          billState: queryParam.billState,
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
    // 完成采购报价
    commitPurchaseMethod(sendMsgParam) {
      this.$confirm('是否确认完成采购报价?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 预制公共信息
        if (sendMsgParam.paramData.bindData) {
          let publicDingMsgInfo = {
            customerCode: sendMsgParam.paramData.bindData.customerCode,
            productCode: sendMsgParam.paramData.bindData.productCode,
            productName: sendMsgParam.paramData.bindData.productCode,
            orderNumber: sendMsgParam.paramData.bindData.productOrderNumber,
            pkPsndoc: sendMsgParam.paramData.bindData.pkPsndoc
          }
          sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
        }
        // 消息发送节点
        sendMsgParam.sendTagName = "采购报价"
        sendDingMsgByPsndoc(sendMsgParam).then((response) => {
          if (!response.data.success) {
            this.$message({ type: 'info', message: response.errorMessage })
          } else {
            let bindRowData = sendMsgParam.paramData.bindData
            let updateParam = {
              pkPurchaseQuote: bindRowData.pkPurchaseQuote, 
              pkProductOrderB: bindRowData.pkProductOrderB,
              pkProduct: bindRowData.pkProduct, 
              taskId: bindRowData.taskId 
            }
            overPassPurchaseQuote(updateParam).then((response) => {
                this.$message({ message: '操作成功', type: 'success' })
                bindRowData.billState = '采购报价完成'
                this.queryListData()
                this.$message({ type: 'success', message: '采购报价完成!' })
            })
          }
        })
        
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消完成!' })
      })
    },
    // 打开查询模板
    openQueryDialog() {
      this.queryDialog.visiable = true
    },
    // 关闭查询模板
    closeQueryDialog() {
      this.queryDialog.visiable = false
    },
    // 打开送审框
    openCommitDialog() {
      this.commitDialog.visiable = true
    },
    // 关闭送审框
    closeCommitDialog() {
      this.commitDialog.visiable = false
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

<style scoped>
.icon{
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409EFF;
}
.icon i {
  padding-right: 10px;
}
</style>
