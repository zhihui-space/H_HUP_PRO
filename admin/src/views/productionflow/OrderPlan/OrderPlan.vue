<template>
  <div>
    <!-- 生产计划 -->
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
              <i class="el-icon-edit"><span>编辑</span></i>
              <i class="el-icon-paperclip"><span>子表数据</span></i>
              <i class="el-icon-s-promotion"><span>查看进度条</span></i>
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

    <!--生产计划录入组件-->
    <ProductionFlowOrderPlanContent
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      @close="closeContent">
    </ProductionFlowOrderPlanContent>

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

    <!--生产计划子表数据管理-->
    <ProductionFlowOrderPlanDetails
      :visiable="subDataInfo.visiable"
      :updateRow="subDataInfo.updateRow"
      @close="() => { subDataInfo.visiable = false }">
    </ProductionFlowOrderPlanDetails>

    <!--进度条-->
    <ProductionFlowStepsView
      :visiable="stepsInfo.visiable"
      :pkProductOrderB="stepsInfo.pkProductOrderB"
      @close="() => stepsInfo.visiable = false">
    </ProductionFlowStepsView>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import ProductionFlowOrderPlanContent from "@/views/productionflow/OrderPlan/content"
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel"
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails"
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import ProductionFlowOrderPlanDetails from "@/views/productionflow/OrderPlan/subinfo/orderSubInfo";
import ProductionFlowStepsView from "@/views/productionflow/comp/productionFlowSteps"; // 进度条
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import { orderSaleDoStartProccess } from '@/api/orderCompMage/orderCompMage'
import { selectAllOrderPlanAsPage, insertOrderPlan, deleteOrderPlanByPks, updateOrderPlan } from '@/api/orderCompMage/OrderPlan'

export default {
  name: "ProductionFlowOrderPlanView",
  components: { Table, ProductionFlowOrderPlanContent, CommitDialog, OrderConstractProductSel, OrderProductInfoDetails, ProductionFlowOrderPlanDetails, ProductionFlowStepsView },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        pkProductOrder: null // 单据业务属性 合同订单主键
      },
      subDataInfo: {
        visiable: false, // 内容界面显示控制
        updateRow: null // 更新时带过来的temp
      },
      stepsInfo: { // 进度条控制相关
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      columns: [
        {prop: 'pkOmgOrderPlan', label: '生产计划主键', primary: true},
        {prop: 'pkProductOrderB', label: '合同子表主键', show: false},
        {prop: 'contractNo', label: '合同编号', width: '110'},
        {prop: 'productCode', label: '产品编号', width: '120'},
        {prop: 'productName', label: '产品名称', width: '110'},
        {prop: 'customerCode', label: '客户编号', width: '110'},
        {prop: 'constractOrderType', label: '合同类型', width: '110'},
        {prop: 'productionState', label: '生产状态', width: '100'},
        {prop: 'constractProductNum', label: '订单数量', width: '110'},
        {prop: 'scheduledtime', label: '预计交货日期', width: '180'},
        {prop: 'billState', label: '单据状态', width: '110'},
        {prop: 'creationtime', label: '创建时间',width: '180'},
        {prop: 'constractPsnname', label: '销售员'},
        
      ],
      select: {
        'select': selectAllOrderPlanAsPage,
        'queryParam': { dr: 0 }
      },
      top_btn: [
        {
          name: '录入',
          code: 'ADDSALESTART',
          action: insertOrderPlan,
          btnSize:'mini',
          styleAttr: `margin-top: 10px;`
        },
      ],
      act_btn: [
        {
          name: '查看产品数据',
          code: 'LOOKORDERBPRODUCT',
          action: null, 
          width: 160,
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
          code: 'UPDATESALESTART',
          action: updateOrderPlan,
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
          btnSize: 'mini'
        },
        {
          name: '查看子表数据',
          code: 'LOOKUPSUBDATA',
          action: deleteOrderPlanByPks,
          typeLess: 'itag',
          iconPic: 'el-icon-paperclip',
          btnSize: 'mini'
        },
        {
          name: '进度',
          code: 'LOOKUPSTEPS',
          action: deleteOrderPlanByPks,
          typeLess: 'itag',
          iconPic: 'el-icon-s-promotion',
          btnSize: 'mini'
        }
      ],
      replace: [
        {name: 'constractOrderType',replace: {'0':"普通合同",'1':"生产订单",'2':"OEM",'3':"DEM",'4':"贸易模式"}},
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
      debugger
      if (constractData && constractData.pkProductOrder) {
        this.selectedConstractData = constractData
        let queryParam = {
          pkProductOrder: constractData.pkProductOrder,
          dr: 0
        }
        let newSelect = {select: this.select.select, queryParam: queryParam }
        this.select = newSelect
      }
    },
    // 监听按钮
    onButtonClick(param, btnCode, unexParam) {
      if (param.btnCode === "ADDSALESTART") { // 录入销售发起数据
        // 校验是否选择订单信息 
        if (this.selectedConstractData && this.selectedConstractData.pkProductOrder) {
          this.content.pkProductOrder = this.selectedConstractData.pkProductOrder
          this.openContent('录入', param.btnAction)
        } else {
          this.$message({ showClose: true, message: '请先选择订单信息!', type: 'warning' });
        }
      }
      if (param.btnCode === "UPDATESALESTART") { // 修改销售发起数据
        this.openContent('修改', param.btnAction)
        this.content.updateRow = param.bindData
      }
      if (param.btnCode === "LOOKORDERBPRODUCT") { // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB = param.pkProductOrderB
        this.orderProductInfoDetails.visiable = true
      }
      if (param.btnCode === "COMMITDINGDING") { // 推送消息到钉钉
        this.commitDialogData.visiable = true;
      }
      if (param.btnCode === "LOOKUPSUBDATA") { // 查看子表数据
        this.subDataInfo.visiable = true
        this.subDataInfo.updateRow = param.bindData
      }
      if (param.btnCode === "LOOKUPSTEPS") { // look steps
        this.stepsInfo.pkProductOrderB = param.bindData.pkProductOrderB
        this.stepsInfo.visiable = true
      }
    },
    openContent(title, action) { // 打开内容界面Dialog
      this.content.visiable = true
      this.content.title = title
      this.content.action = action
    },
    closeContent(actTemp) { // 关闭内容界面Dialog
      if (actTemp && actTemp.pkProductOrder) {
        let queryParam = {
          pkProductOrder: actTemp.pkProductOrder
        }
        let newSelect = {select: this.select.select, queryParam: queryParam }
        this.select = newSelect
      }
      
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
</style>