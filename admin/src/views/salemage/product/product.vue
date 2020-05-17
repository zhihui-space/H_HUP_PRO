<template>
<!-- 产品管理 -->
  <div>
    <div class="icon" >
      <i class="el-icon-bell"><span>送审工艺部门</span></i>
      <i class="el-icon-edit"><span>编辑</span></i>
      <i class="el-icon-delete"><span>删除</span></i>
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
    <Productcontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      @refreshList="queryListData">
    </Productcontent>
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
      @commitMethod="commitTechnicsMethod">
    </CommitDialog>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import CommitDialog from '@/components/Commitdingding/CommitDialog'
import Productcontent from '@/views/salemage/product/content'
import ProductQueryDialog from '@/views/salemage/product/queryDialog'
import { listProduct, addProduct, deleteProductByPks, updateProduct, commitTechnics } from '@/api/salemage/product'
import { sendDingMsgByPsndoc } from '@/api/pub/pub'

export default {
  name: "saleproduct",
  components: { Table, CommitDialog, Productcontent, ProductQueryDialog },
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
        {prop: 'pkProduct', label: '主键', width: '10', primary: true},
        {prop: 'name', label: '产品名称', width: '120', fixedLeft: true},
        {prop: 'code', label: '产品编码', width: '120'},
        {prop: 'model', label: '产品型号', width: '100'},
        {prop: 'pkPsndocShow', label: '销售负责人', width: '120'},
        {prop: 'materialSource', label: '物料来源', width: '100'},
        {prop: 'pcbSource', label: 'PCB来源', width: '120'},
        {prop: 'customerCode', label: '客户编码', width: '120'},
        {prop: 'steelMeshSource', label: '钢网来源', width: '120'},
        {prop: 'technicsState', label: '单据状态', width: '140'},
        {prop: 'creationtime', label: '创建时间'}
      ],
      select: {
        'select': listProduct,
        'queryParam': { technicsState: 20, dr: 0 }
      },
      top_btn: [
        {
          name: '查询',
          code: 'QUERYDIALOG',
          action: listProduct
        },
        // {
        //   name: '录入',
        //   code: 'ADD',
        //   action: addProduct
        // },
        {
          name: '全部显示',
          code: 'QUERYALL',
          action: listProduct
        }
      ],
      act_btn: [
        {
          name: '送审工艺部', 
          code: 'COMMIT', 
          when: {'technicsState': [20]}, 
          action: commitTechnics, 
          width: 150,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-bell',
        },
        { 
          name: '修改', 
          code: 'UPDATE', 
          when: {'technicsState': [20]}, 
          action: updateProduct,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
        },
        { 
          name: '删除', 
          code: 'DELETE', 
          when: {'technicsState': [0]}, 
          action: deleteProductByPks,
          btnSize:'mini' ,
          typeLess: 'itag',
          iconPic: 'el-icon-delete',
        },
        { 
          name: '查看', 
          code: 'LOOKUP', 
          when: {'technicsState': [20, 21, 22]}, 
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-view'
        }
      ],
      replace: [
        {
          name: 'technicsState',
          replace: { 0: "自由态", 20: "已申请", 21: "工艺审核中", 22: "工艺审核完成" }
        },
        {
          name: 'materialSource',
          replace: { 1: "甲方提供",2: "乙方提供",3: "部分甲方提供"}
        },
        {
          name: 'steelMeshSource',
          replace: { 0: "无",1: "甲方提供",2: "乙方提供"}
        },
        {
          name: 'pcbSource',
          replace: { 1: "甲方提供",2: "乙方提供"}
        }
      ]
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      // 全部显示
      if (param.btnCode === 'QUERYALL') {
        this.queryListData({})
      }
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
      // 查询界面
      if (param.btnCode === 'QUERYDIALOG') {
        this.openQueryDialog()
      }
      // 送审工艺部
      if (param.btnCode === 'COMMIT') {
        this.commitDialog.paramData = param
        this.openCommitDialog()
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
        let newSelect = {select: this.select.select, queryParam: this.select.queryParam }
        this.select = newSelect
      }
    },
    // 送审工艺部
    commitTechnicsMethod(sendMsgParam) {
      this.$confirm('是否确认送审单据到工艺部?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 预制公共信息
        if (sendMsgParam.paramData.bindData) {
          let publicDingMsgInfo = {
            customerCode: sendMsgParam.paramData.bindData.customerCode,
            productCode: sendMsgParam.paramData.bindData.code,
            productName: sendMsgParam.paramData.bindData.name,
            orderNumber: sendMsgParam.paramData.bindData.orderNumber,
            pkPsndoc: sendMsgParam.paramData.bindData.pkPsndoc
          }
          sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
        }
        // 消息发送节点
        sendMsgParam.sendTagName = "销售发起工艺审核"
        sendDingMsgByPsndoc(sendMsgParam).then((response) => {
          if (!response.data.success) {
            this.$message({ type: 'info', message: response.errorMessage })
          } else {
            let bindRowData = sendMsgParam.paramData.bindData
            // 流程实例ID
            let processInstanceId = bindRowData.processInstanceId
            // 产品名称
            let productName = bindRowData.name == null ? '**' : bindRowData.name
            // 产品编码
            let productCode = bindRowData.code == null ? '**' : bindRowData.code
            // 客户编码
            let customerCode = bindRowData.customerCode == null ? '**' : bindRowData.customerCode
            // 产品主键
            let pkProduct = bindRowData.pkProduct == null ? '**' : bindRowData.pkProduct
            let flowTitle = productName + '_' + productCode + '_' + customerCode
            let commitParam = { 
              pkProduct: bindRowData.pkProduct,
              flowTitle: flowTitle,
              processInstanceId: processInstanceId
            }
            commitTechnics(commitParam).then((response) => {
              this.$message({ message: '送审工艺部门成功!', type: 'success' })
              bindRowData.technicsState = '工艺审核中'
              this.$message({ type: 'success', message: '送审成功!' })
            })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消送审!' })
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
