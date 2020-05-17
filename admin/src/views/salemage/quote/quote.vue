<template>
  <div>
    <div class="icon" >
      <i class="el-icon-bell"><span>完成报价</span></i>
      <i class="el-icon-edit"><span>报价</span></i>
      <i class="el-icon-view"><span>查看</span></i>
      <i class="el-icon-s-promotion"><span>查看流程</span></i>
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
    <Salequotecontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent">
    </Salequotecontent>
    <!--查询模板界面-->
    <ProductQueryDialog
      :visiable="queryDialog.visiable"
      @close="closeQueryDialog"
      @refreshList="queryListData">
    </ProductQueryDialog>

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
import Salequotecontent from '@/views/salemage/quote/content'
import ProductQueryDialog from '@/views/salemage/product/queryDialog'
import FlowDialog from '@/views/dashboard/components/FlowDialog'
import { listSaleQuote, updateSaleQuote, overProccessSaleQupte, startRequoteProccess } from '@/api/salemage/salequote'
import { findFlowImage } from '@/api/flowprocess/flowprocess'

export default {
  name: "salequote",
  components: { Table, Salequotecontent, ProductQueryDialog, FlowDialog },
  data() {
    return {
      flowImageData: {
        visiable: false,
        flowPrice: '',
        title: '流程图'
      },
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      queryDialog: {
        visiable: false
      },
      columns: [
        {prop: 'pkSaleQuote', label: '主键', width: '10', primary: true},
        {prop: 'productName', label: '产品名称', width: '120', fixedLeft: true},
        {prop: 'productCode', label: '产品编码', width: '120'},
        {prop: 'productModel', label: '产品型号', width: '120'},
        {prop: 'pkPsndocShow', label: '销售负责人', width: '120'},
        {prop: 'materialSource', label: '物料来源', width: '120'},
        {prop: 'pcbSource', label: 'PCB来源', width: '120'},
        {prop: 'customerCode', label: '客户编码', width: '120'},
        {prop: 'productNum', label: '订单数量', width: '120'},
        {prop: 'productSteelMeshSource', label: '钢网来源', width: '120'},
        {prop: 'taxinclud', label: '是否含税', width: '140'},
        {prop: 'billState', label: '单据状态', width: '140'},
        {prop: 'bomFilename', label: 'BOM文件名称', width: '250'},
        {prop: 'bomFilefullname', label: 'BOM文件全路径名称', width: '250', show: false},
        {prop: 'pcbFilename', label: 'PCB文件名称', width: '230'},
        {prop: 'pcbFilefullname', label: 'PCB文件全路径名称', width: '250', show: false},
        {prop: 'craftFilename', label: '工艺文件名称', width: '250'},
        {prop: 'craftFilefullname', label: '工艺文件全路径名称', width: '120', show: false},
        {prop: 'approver', label: '审批人', width: '120', show: false},
        {prop: 'approverShow', label: '审批人', width: '120'},
        {prop: 'approvetime', label: '审批时间', width: '180'}
      ],
      select: {
        'select': listSaleQuote,
        'queryParam': {dr: 0}
      },
      top_btn: [
        {
          name: '查询',
          code: 'QUERYDIALOG',
          action: listSaleQuote,
          btnSize: 'mini'
        },
        {
          name: '批量通过',
          code: 'BATCHOVERQUOTE', 
          when: {'billState': [3]},
          action: updateSaleQuote,
          btnSize: 'mini'
        }
      ],
      act_btn: [
        {
          name: '报价',
          code: 'DOQUOTE', 
          when: {'billState': [2]},
          action: updateSaleQuote, 
          width: 160,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
        },
        {
          name: '完成报价',
          code: 'OVERQUOTE', 
          when: {'billState': [2]},
          action: overProccessSaleQupte,
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-bell',
        },
        {
          name: '查看',
          code: 'LOOKUP',
          when: {'billState': [0, 1, 3, 4, 5, 6]},
          action: updateSaleQuote,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-view',
        },
        // {
        //   name: '重新报价',
        //   code: 'REQUOTE', 
        //   when: {'billState': [6]},
        //   action: startRequoteProccess,
        //   btnSize: 'mini'
        // },
        {
          name: '查看流程',
          code: 'QUERYFLOW',
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-s-promotion',
        }
      ],
      replace: [
        {name: 'taxinclud', replace: { 1: "不含税", 1.13: "含税" } },
        {name: 'billState',replace: { 0: "自由态",1: "报价流程进行中",2: "已认领",3: "采购报价完成", 4: "工艺审核完成",5: "生产报价完成",6: "销售报价完成"}},
        {name: 'materialSource',replace: { 1: "甲方提供",2: "乙方提供",3: "部分甲方提供"}},
        {name: 'productSteelMeshSource',replace: { 0: "无",1: "甲方提供",2: "乙方提供"}},
        {name: 'pcbSource',replace: { 0: "无",1: "甲方提供",2: "乙方提供"}}
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
      // 销售报价事件
      if (param.btnCode === 'DOQUOTE') {
        this.openContent('销售报价', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 查询界面
      if (param.btnCode === 'QUERYDIALOG') {
        this.openQueryDialog()
      }
      // 通过审核
      if (param.btnCode === 'OVERQUOTE') {
        this.$confirm('是否确认完成销售报价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let updateParam = { 
            pkSaleQuote: param.bindData.pkSaleQuote, 
            pkProductOrderB: param.bindData.pkProductOrderB, 
            pkProduct: param.bindData.pkProduct, 
            taskId: param.bindData.taskId, 
            approver: param.bindData.approver, 
            billState: 4 
          }
          overProccessSaleQupte(updateParam).then((response) =>{
            this.$message({ message: '操作成功', type: 'success' })
            param.bindData.billState = '销售报价完成'
            this.$message({ type: 'success', message: '销售报价完成!' })
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消完成!' })
        })
      }
      // 查看界面
      if (param.btnCode === 'LOOKUP') {
        this.openContent('查看', param.btnAction)
        this.content.updateRow = param.bindData
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
      // 销售控制重新报价
      if (param.btnCode === 'REQUOTE') {
        // 产品名称
        let productName = param.bindData.productName == null ? '**' : param.bindData.productName
        // 产品编码
        let productCode = param.bindData.productCode == null ? '**' : param.bindData.productCode
        // 客户编码
        let customerCode = param.bindData.customerCode == null ? '**' : param.bindData.customerCode
        // 销售负责人
        let pkPsndoc = param.bindData.pkPsndoc
        let flowTitle = productName + '_' + productCode + '_' + customerCode
        let requoreParam = {
          pkProduct: param.bindData.pkProduct, 
          userid: this.$store.getters.userid,
          flowTitle: flowTitle,
          pkPsndoc: pkPsndoc,
          paramMap: { pkSaleQuote: param.bindData.pkSaleQuote }
        }
        startRequoteProccess(requoreParam).then((response)=>{
          if (response.success) {
            this.$message({ type: 'success', message: '操作成功!' })
            this.queryListData()
          } else {
            this.$message({ message: response.message, type: 'error' })
          }
        })
      }
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
    // 关闭流程图Dialog
    closeFlowImageDialog() {
      this.flowImageData.visiable = false
    },
    // 打开查询模板
    openQueryDialog() {
      this.queryDialog.visiable = true
    },
    // 关闭查询模板
    closeQueryDialog() {
      this.queryDialog.visiable = false
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
