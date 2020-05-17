<template>
  <div>
    <div class="icon" >
      <i class="el-icon-bell"><span>完成报价</span></i>
      <i class="el-icon-edit"><span>报价</span></i>
      <i class="el-icon-view"><span>查看</span></i>
    </div>
    <!--基础列表界面-->
    <Table :columns="columns" 
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <Producequotecontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent">
    </Producequotecontent>
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
      @commitMethod="overProduceQuote">
    </CommitDialog>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import CommitDialog from '@/components/Commitdingding/CommitDialog'
import Producequotecontent from '@/views/produce/quote/content'
import ProductQueryDialog from '@/views/salemage/product/queryDialog'
import { listProduceQuote, updateProduceQuote, overPassProduceQuote } from '@/api/produce/quote'
import { sendDingMsgByPsndoc } from '@/api/pub/pub'

export default {
  name: "producequote",
  components: { Table, CommitDialog, Producequotecontent, ProductQueryDialog },
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
        {prop: 'pkProduceQuoteH', label: '主键', width: '10', primary: true},
        {prop: 'pkCustomer', label: '客户信息', width: '120', show: false},
        {prop: 'customerCode', label: '客户编码', width: '120'},
        {prop: 'pkPsndoc', label: '销售负责人', width: '120', show: false},
        {prop: 'pkProduct', label: '产品信息', width: '120', show: false},
        {prop: 'productCode', label: '产品编码', width: '120'},
        {prop: 'productName', label: '产品名称', width: '120'},
        {prop: 'productModel', label: '产品型号', width: '120'},
        {prop: 'productNum', label: '订单数量', width: '120'},
        {prop: 'unitPriceOut', label: '外协工序单价', width: '120', show: false},
        {prop: 'unitTotalOut', label: '外协订单合计', width: '120', show: false},
        {prop: 'taxinclud', label: '是否含税', width: '120'},
        {prop: 'billState', label: '单据状态', width: '120'},
        {prop: 'creator', label: '创建人', width: '120', show: false},
        {prop: 'creatorShow', label: '创建人', width: '120'},
        {prop: 'creationtime', label: '创建时间', width: '180'},
        {prop: 'dr', label: '删除标志', width: '120', show: false},
        {prop: 'ts', label: '时间戳', width: '120', show: false}
      ],
      select: {
        'select': listProduceQuote,
        'queryParam': {dr: 0}
      },
      top_btn: [
        {
          name: '查询',
          code: 'QUERYDIALOG',
          action: listProduceQuote,
          btnSize:'mini'
        },
        {
          name: '批量通过',
          code: 'BATCHOVERQUOTE',
          action: updateProduceQuote,
          btnSize:'mini'
        }
      ],
      act_btn: [
        {
          name: '报价',
          code: 'DOQUOTE', 
          when: {'billState': [2]}, 
          action: updateProduceQuote,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
        },
        {
          name: '完成报价', 
          code: 'OVERQUOTE', 
          when: {'billState': [2]}, 
          action: updateProduceQuote,
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-bell',
        },
        {
          name: '查看',
          code: 'LOOKUP', 
          when: {'billState': [0,1,5, 6]}, 
          action: updateProduceQuote,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-view',
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
          replace: { 0: "自由态",1: "报价流程进行中",2: "已认领",3: "采购报价完成", 4: "工艺审核完成",5: "生产报价完成",6: "销售报价完成"}
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
      // 报价事件
      if (param.btnCode === 'DOQUOTE') {
        this.openContent('生产报价', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 查看事件
      if (param.btnCode === 'LOOKUP') {
        this.openContent('查看', param.btnAction)
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
    },
    // 完成生产报价
    overProduceQuote(sendMsgParam) {
      let bindRowData = sendMsgParam.paramData.bindData
      this.openCommitDialog()
      this.$confirm('是否确认完成生产报价?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 预制公共信息
        if (bindRowData) {
          let publicDingMsgInfo = {
            customerCode: bindRowData.customerCode,
            productCode: bindRowData.productCode,
            productName: bindRowData.productCode,
            orderNumber: bindRowData.productOrderNumber,
            pkPsndoc: bindRowData.pkPsndoc
          }
          sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
        }
        // 消息发送节点
        sendMsgParam.sendTagName = "生产报价"
        sendDingMsgByPsndoc(sendMsgParam).then((response) => {
          if (!response.data.success) {
            this.$message({ type: 'info', message: response.errorMessage })
          } else {
            let updateParam = { 
              pkProduceQuoteH: bindRowData.pkProduceQuoteH, 
              pkProductOrderB: bindRowData.pkProductOrderB,
              pkProduct: bindRowData.pkProduct,
              taskId: bindRowData.taskId 
            }
            overPassProduceQuote(updateParam).then((response) => {
              this.$message({ message: '操作成功', type: 'success' })
              bindRowData.billState = '生产报价完成'
              this.$message({ type: 'success', message: '生产报价完成!' })
            })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消完成!' })
      })
    },
    queryListData(queryParam) { // 刷新界面数据
      if (queryParam) {
        let queryDialogParam ={
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customShortName: queryParam.customShortName,
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
    // 打开查询模板
    openQueryDialog() {
      this.queryDialog.visiable = true
    },
    // 关闭查询模板
    closeQueryDialog() {
      this.queryDialog.visiable = false
    },
    // 打开完成报价
    openCommitDialog() {
      this.commitDialog.visiable = true
    },
    // 关闭完成报价
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
div{
  font-size: 8px;
}
.icon{
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409EFF;
}
i:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>
