<template>
  <div>
  <!-- 通知开票 -->
    <el-row>
      <el-col :span="2">
        <!-- 选择合同及合同子表中的产品信息 -->
        <OrderConstractProductSel
          @refreshTableList="refreshTableList">
        </OrderConstractProductSel>
      </el-col>

      <el-col :span="22">
      <div class="icon">
        <i class="el-icon-view"><span>查看详情</span></i>
        <i class="el-icon-bell"><span>通知钉钉</span></i>
        <i class="el-icon-edit"><span>文件下载</span></i>
        <i class="el-icon-finished"><span>开票完成</span></i>
        <i class="el-icon-delete-solid"><span>删除</span></i>
      </div>
        <el-row><el-tag class="ordre-tag">当前选择订单合同:{{selectedConstractData == null ? '' : selectedConstractData.contractNo}}</el-tag></el-row>
        <!--销售发起备忘录数据-->
        <Table :columns="columns" 
          :select="select" 
          :top_btn="top_btn" 
          :act_btn="act_btn" 
          :replace="replace"
          @onButtonClick="onButtonClick">
        </Table>
      </el-col>
    </el-row>

    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialogData.visiable"
      :paramData="commitDialogData.paramData"
      @close="closeCommitDialog"
      @commitMethod="executeDindDingInterface"
    ></CommitDialog>
    
    <!--订单字表详情数据-->
    <OrderProductInfoDetails
      :visiable="orderProductInfoDetails.visiable"
      :pkProductOrderB="orderProductInfoDetails.pkProductOrderB"
      @close="() => { orderProductInfoDetails.visiable = false }">
    </OrderProductInfoDetails>

    <!--通知开票详情Dialog-->
    <OrderInformEditContent
      :replace="replace"
      :visiable="content.visiable"
      :updateRow="content.updateRow"
      :title="content.title"
      :action="content.action"
      :contractNo="content.contractNo"
      :pkProductOrder="content.pkProductOrder"
      @close="() => { content.visiable = false }">
    </OrderInformEditContent>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import OrderInformEditContent from "@/views/productionflow/OrderInform/content"
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel"
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails"
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/viewCompUtil'
import { selectAllOmgNoticeInvoiceAsPage, insertOmgNoticeInvoice, updateOmgNoticeInvoice, deleteOmgNoticeInvoiceByPks } from '@/api/orderCompMage/OrderInform'

export default {
  name: "ProductionFlowOrderOrderComeView",
  components: { Table, CommitDialog, OrderInformEditContent, OrderConstractProductSel, OrderProductInfoDetails },
  computed: {
    ...mapGetters([
      'userid'
    ])
  },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        contractNo: null, // 合同号
        pkProductOrder: null, // 单据业务属性 合同订单主键
      },
      columns: [
        {prop: 'pkOmgNoticeInvoice', label: '通知开票主键', primary:true},
        {prop: 'contractNo', label: '合同编号', width: '120'},
        {prop: 'pkProductOrderBShow', label: '产品名称', width: '120'},
        {prop: 'scheduledtime', label: '预计交货日期', width: '180'},
        {prop: 'productionState', label: '生产状态', width: '100'},
        {prop: 'lnvoiceNo', label: '发票号', width: '120'},
        {prop: 'billAmount', label: '金额', width: '70'},
        {prop: 'chargePsnShow', label: '经办人', width: '70'},
        {prop: 'chargeTime', label: '经办日期', width: '120'},
        {prop: 'billState', label: '单据状态'}
      ],
      select: {
        'select': selectAllOmgNoticeInvoiceAsPage,
        'queryParam': { dr: 0 }
      },
      top_btn: [
        {
          name: '录入',
          code: 'ADDINFORM',
          action: insertOmgNoticeInvoice,
          btnSize:'mini',
          styleAttr: `margin-top: 10px;`
        },
      ],
      act_btn: [
        {
          width:'260',
          name: '查看产品数据',
          code: 'LOOKORDERBPRODUCT',
          action: null,
          typeLess: 'itag',
          iconPic: 'el-icon-view',
          btnSize: 'mini'
        },
        {
          name: '通知钉钉',
          code: 'COMMITDINGDING',
          action: null,
          typeLess: 'itag',
          iconPic: 'el-icon-bell',
          btnSize: 'mini'
        },
        {
          name: '修改',
          code: 'UPDATE',
          action: updateOmgNoticeInvoice,
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
          btnSize: 'mini'
        },
        {
          name: '开票完成',
          code: 'OVERINFORM',
          action: updateOmgNoticeInvoice,
          when: {'billState': [0]}, 
          typeLess: 'itag',
          iconPic: 'el-icon-finished',
          btnSize: 'mini'
        },
        {
          name: '删除',
          code: 'DELETE',
          action: deleteOmgNoticeInvoiceByPks,
          when: {'billState': [0]}, 
          typeLess: 'itag',
          iconPic: 'el-icon-delete-solid',
          btnSize: 'mini'
        }
      ],
      replace: [
        {name: 'billState',replace: {'0':"自由态",'1':"进行中",'2':"已完成"}},
        {name: 'productionState',replace: {'0':"自由态",'1':"生产中",'2':"暂停(未启用)",'3':"生产完成",'4':"一键暂停"}}
      ],
      commitDialogData: {
        // 控制钉钉Dialog显示
        visiable: false,
        paramData: null
      },
      orderProductInfoDetails: {
        visiable: false,
        pkProductOrderB: null // 订单子表主键
      },
      selectedConstractData: null, // 当前选中的订单合同
    };
  },
  methods: {
    // 调用接口获取界面数据
    refreshTableList(constractData) {
      this.selectedConstractData = constractData
      let queryParam = {
        pkProductOrder: constractData.pkProductOrder,
        dr: 0
      }
      let newSelect = {select: this.select.select, queryParam: queryParam }
      this.select = newSelect
    },
    // 监听按钮
    onButtonClick(param, btnCode, unexParam) {
      if (param.btnCode === "ADDINFORM") { // 录入通知开票
        if (this.selectedConstractData && this.selectedConstractData.pkProductOrder && this.selectedConstractData.contractNo) {
          this.content.pkProductOrder = this.selectedConstractData.pkProductOrder
          this.content.contractNo = this.selectedConstractData.contractNo
          this.openContent('录入', param.btnAction)
        } else {
          this.$message({ message: '请先选择合同！', type: 'warning' })
        }
      }
      if (param.btnCode === "LOOKORDERBPRODUCT") { // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB = param.pkProductOrderB
        this.orderProductInfoDetails.visiable = true
      }
      if (param.btnCode === "COMMITDINGDING") { // 推送消息到钉钉
        this.commitDialogData.visiable = true;
      }
      if (param.btnCode === "UPDATE") { // 修改
        this.content.updateRow = param.bindData
        this.content.pkProductOrder = this.selectedConstractData.pkProductOrder
        this.content.contractNo = this.selectedConstractData.contractNo
        this.openContent('修改', param.btnAction)
      }
      if (param.btnCode === 'OVERINFORM') { // 开票完成
        debugger
        let overParam = {
          pkOmgNoticeInvoice: param.bindData.pkOmgNoticeInvoice,
          billState: '2',
          chargePsn: this.userid,
          chargeTime: parseTime(new Date())
        }
        updateOmgNoticeInvoice(overParam).then((response) => {
          if (response.success) {
            this.$message({ message: '确认成功!', type: 'success' })
            this.refreshTableList(this.selectedConstractData)
          } else {
            this.$message({ message: `确认失败:${response.message}`, type: 'error' })
          }
        })
      }
    },
    openContent(title, action) { // 打开内容界面Dialog
      this.content.visiable = true
      this.content.title = title
      this.content.action = action
    },
    closeContent() { // 关闭内容界面Dialog
      this.content.visiable = false
    },
    closeCommitDialog() {
      this.commitDialogData.visiable = false;
    },
    executeDindDingInterface(sendMsgParam) {
      // 调用钉钉接口
      sendDingMsgByPsndoc(sendMsgParam).then(response => {
        if (response && response.data.success) {
          // 调用接口后处理
          alert("调用钉钉接口成功");
        } else {
          alert("调用钉钉接口失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.ordre-tag{
  margin-left: 10px;
  margin-top: 16px;
  margin-bottom: 5px;
}
.icon{
  float: right;
  margin-top: 20px;
  margin-right: 500px;
  color: #409EFF;
}
div{
  font-size: 8px;
  color:  #606266;
}
i{
  font-size: 15px;
  padding-left: 10px;
  cursor:pointer
}
i span{
  font-size: 8px;
  padding-left: 5px;
}
i:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>