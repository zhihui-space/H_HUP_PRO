<template>
  <div>
    <div class="icon" >
      <i class="el-icon-tickets"><span>查看</span></i>
      <i class="el-icon-view"><span>详情+修改工艺参数</span></i>
      <i class="el-icon-bell"><span>通过审核</span></i>
      <i class="el-icon-s-ticket"><span>物料解析</span></i>
    </div>
    <!--基础列表界面-->
    <!-- 工艺审核 -->
    <Table :columns="columns" 
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--查看详情界面-->
    <Tecauditcontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      @refreshList="queryListData">
    </Tecauditcontent>
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
      @commitMethod="overTechnicsProccessMethod">
    </CommitDialog>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import CommitDialog from '@/components/Commitdingding/CommitDialog'
import Tecauditcontent from '@/views/technics/tecaudit/content'
import ProductQueryDialog from '@/views/salemage/product/queryDialog'
import { listTecaudit, updateTecaudit, overTechnicsProccess } from '@/api/technics/tecaudit'
import { initReplaceUpdateData } from '@/utils/viewCompUtil'
import { sendDingMsgByPsndoc } from '@/api/pub/pub'

export default {
  name: "techinsaudit",
  components: { Table, CommitDialog, Tecauditcontent, ProductQueryDialog },
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
      // 抽屉控制相关
      drawerContent: {
        visiable: false
      },
      columns: [
       {prop: 'pkProduct', label: '主键', width: '10', primary: true},
        {prop: 'name', label: '产品名称', width: '120'},
        {prop: 'code', label: '产品编码', width: '100'},
        {prop: 'model', label: '产品型号', width: '120'},
        {prop: 'pcbSource', label: 'PCB来源', width: '100'},
        // {prop: 'customerName', label: '客户名称', width: '120'},
        {prop: 'purchaseContacts', label: '采购联系人', width: '120'},
        {prop: 'purchaseContactsPhone', label: '采购联系电话', width: '120'},
        {prop: 'skillContacts', label: '技术联系人', width: '120'},
        {prop: 'skillContactsPhone', label: '技术联系电话', width: '120'},
        {prop: 'bomFilename', label: 'BOM文件名称', width: '120', show: false},
        {prop: 'bomFilefullname', label: 'BOM文件全路径名称', width: '120', show: false},
        {prop: 'pcbFilename', label: 'PCB文件名称', width: '120', show: false},
        {prop: 'pcbFilefullname', label: 'PCB文件全路径名称', width: '120', show: false},
        {prop: 'craftFilename', label: '工艺文件名称', width: '120', show: false},
        {prop: 'craftFilefullname', label: '工艺文件全路径名称', width: '120', show: false},
        {prop: 'technicsState', label: '单据状态', width: '140'},
        {prop: 'creationtime', label: '创建时间'}
      ],
      select: {
        'select': listTecaudit,
        'queryParam': {technicsState: 21, dr: 0}
      },
      top_btn: [
        {
          name: '查询',
          code: 'QUERYDIALOG',
          action: listTecaudit,
          btnSize:'mini'
        },
        {
          name: '批量通过',
          code: 'BATCHAPPROVE',
          action: overTechnicsProccess,
          btnSize:'mini'
        }
      ],
      act_btn: [
        {
          width:300,
          name: '查看',
          code: 'LOOKUP', 
          when: {'technicsState': [22]}, 
          action: updateTecaudit,
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-tickets',
        },
        {
          name: '详情',
          code: 'CHECK', 
          when: {'technicsState': [21]}, 
          action: updateTecaudit,
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-view',
        },
        {
          name: '通过审核',
          code: 'AUDITPASS', 
          when: {'technicsState': [21]}, 
          action: overTechnicsProccess,
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-bell',
        },
        {
          name: '物料解析',
          code: 'MATERIELANALY',
          action: null,
          btnSize:'mini',
          typeLess: 'itag',
          iconPic: 'el-icon-s-ticket',
        }
      ],
      replace: [
        {
          name: 'technicsState',
          replace: { 0: "自由态", 20: "已申请", 21: "工艺审核中", 22: "工艺审核完成" }
        },
        {
          name: 'pcbSource',
          replace: { 0: "无",1: "甲方提供",2: "乙方提供"}
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
      // 审核动作
      if (param.btnCode === 'CHECK') {
        this.openContent('详情', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 查看动作
      if (param.btnCode === 'LOOKUP') {
        this.openContent('查看', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 查询界面
      if (param.btnCode === 'QUERYDIALOG') {
        this.openQueryDialog()
      }
      // 审核通过动作
      if (param.btnCode === 'AUDITPASS') {
        this.commitDialog.paramData = param
        this.openCommitDialog()
      }
      // 物料解析
      if (param.btnCode === 'MATERIELANALY') {
        let queryParam = { pkProduct: param.bindData.pkProduct }
        this.$router.push({ path: '/MENU9047/MENU44558', query: queryParam })
      }
    },
    // 通过工艺审核
    overTechnicsProccessMethod(sendMsgParam) {
      let bindRowData = sendMsgParam.paramData.bindData
      // 预制公共信息
      if (bindRowData) {
        // 判断SMT与DIP焊点不能为空
        if (!bindRowData.smt || !bindRowData.dip) {
          this.$message({ type: 'warning', message: 'SMT焊点或DIP焊点不能为空!' })
          return
        }
        let publicDingMsgInfo = {
          customerCode: bindRowData.customerCode,
          productCode: bindRowData.code,
          productName: bindRowData.name,
          pkPsndoc: bindRowData.pkPsndoc
        }
        sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
      }
      // 消息发送节点
      sendMsgParam.sendTagName = "工艺审核"
      this.$confirm('是否确认通过工艺审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        sendDingMsgByPsndoc(sendMsgParam).then((response) => {
          if (!response.data.success) {
            this.$message({ type: 'info', message: response.errorMessage })
          } else {
            let updateParam = initReplaceUpdateData(bindRowData, this.replace)
            overTechnicsProccess(bindRowData).then((response) => {
              this.$message({ message: '工艺审核通过!', type: 'success' })
              bindRowData.technicsState = '工艺审核完成'
              this.$message({ type: 'success', message: '工艺审核完成!' })
              this.queryListData(null)
            })
          }
        })
        
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消审核!' })
      })
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
</style>
