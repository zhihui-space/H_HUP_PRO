<template>
  <div>
    <!--销售发起-->
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
          <i class="el-icon-edit"><span>编辑</span></i>
          <i class="el-icon-bell"><span>通知钉钉</span></i>
          <i class="el-icon-delete"><span>删除</span></i>
        </div>
        <el-row><el-tag class="ordre-tag">当前选择订单合同:{{selectedConstractData == null ? '' : selectedConstractData.contractNo}}</el-tag></el-row>
        <el-row>
          <el-col :span="17">&nbsp;</el-col>
          <el-col :span="7">
            <el-button type="primary" size="mini" :disabled="!(selectedConstractData)" @click="onButtonClick(null, 'ADDSALESTART', null)">录入</el-button>
            <el-button type="primary" size="mini" 
              :disabled="!(selectedConstractData && selectedConstractData.productionState == '0')" 
              @click="onButtonClick(null, 'DOSTART', null)">
            一键发起
            </el-button>

            <el-button type="primary" size="mini" 
              :disabled="!(selectedConstractData && selectedConstractData.productionState == '1')"
              @click="onButtonClick(null, 'DOSTOP', null)">
            一键暂停
            </el-button>

            <el-button type="primary" size="mini" 
              :disabled="!(selectedConstractData && selectedConstractData.productionState == '4')"
              @click="onButtonClick(null, 'STARTUP', null)">
            一键启动
            </el-button>
          </el-col>
        </el-row>
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

    <!--销售发起数据录入-->
    <OrderSaleStartDoEditContent
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      @close="closeContent">
    </OrderSaleStartDoEditContent>

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
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import OrderSaleStartDoEditContent from "@/views/productionflow/OrderSell/content"
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel"
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails"
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import { orderSaleDoStartProccess, orderSaleStartUpProccess } from '@/api/orderCompMage/orderCompMage'
import { updateProductOrderStateOutByPk } from '@/api/orders/orders'
import { selectAllOrderSaleStartAsPage, insertOrderSaleStart, deleteOrderSaleStartByPks, updateOrderSaleStart } from '@/api/orderCompMage/orderStart'
import { npx, npxMate } from '@/utils/viewCompUtil'

export default {
  name: "ProductionFlowOrderSellView",
  components: { Table, OrderSaleStartDoEditContent, CommitDialog, OrderConstractProductSel, OrderProductInfoDetails },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        pkProductOrder: null // 单据业务属性 合同订单主键
      },
      columns: [
        {prop: 'pkOrderSaleStart', label: '销售发起主键', primary: true},
        {prop: 'pkProductOrderB', label: '合同子表主键', show: false},
        {prop: 'pkProductOrder', label: '合同主键', show: false},
        {prop: 'contractNo', label: '合同编号', width: '100'},
        {prop: 'productCode', label: '产品编号', width: '120'},
        {prop: 'productName', label: '产品名称', width: '100'},
        {prop: 'constractOrderType', label: '合同类型', width: '100'},
        {prop: 'productionState', label: '生产状态', width: '100'},
        {prop: 'constractProductNum', label: '订单数量', width: '100'},
        {prop: 'contractCreationtime', label: '签订日期', width: '180'},
        {prop: 'scheduledtime', label: '预计交货日期', width: '170'},
        {prop: 'saleTheme', label: '主题', width: '100'},
        {prop: 'saleContent', label: '内容', width: '100'},
        {prop: 'state', label: '紧急状态', width:'100'}
      ],
      select: {
        'select': selectAllOrderSaleStartAsPage,
        'queryParam': { dr: 0 }
      },
      top_btn: [
      ],
      act_btn: [
        { 
          width: 140,
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
          code: 'UPDATESALESTART',
          action: updateOrderSaleStart,
          typeLess: 'itag',
          iconPic: 'el-icon-edit',
          btnSize: 'mini'
        },
        { 
          name: '删除',
          code: 'DELETE',
          action: deleteOrderSaleStartByPks,
          typeLess: 'itag',
          iconPic: 'el-icon-delete',
          btnSize: 'mini'
        }
      ],
      replace: [
        {name: 'state',replace: {'0':"知会",'1':"预警",'2':"紧急",'3':"事故"}},
        {name: 'constractOrderType',replace: {'0':"普通合同",'1':"生产订单",'2':"OEM",'3':"DEM",'4':"贸易模式"}},
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
      if (btnCode === "ADDSALESTART") { // 录入销售发起数据
        // 校验是否选择订单信息 
        if (this.selectedConstractData && this.selectedConstractData.pkProductOrder) {
          this.content.pkProductOrder = this.selectedConstractData.pkProductOrder
          this.openContent('录入', insertOrderSaleStart)
        } else {
          this.$message({ showClose: true, message: '请先选择订单信息!', type: 'warning' });
        }
      }
      if (btnCode === "DOSTART") { // 一键发起
        // 校验是否选择订单信息 
        if (this.selectedConstractData && this.selectedConstractData.pkProductOrder) {
          let orderStartDoParam = {
            pkProductOrder: this.selectedConstractData.pkProductOrder
          }
          orderSaleDoStartProccess(orderStartDoParam).then((response) => {
            if (response && response.success) {
              this.$message({ showClose: true, message: '发起成功!', type: 'success' });
              this.selectedConstractData.productionState = "1" // 0:自由态 1:生产中 2:暂停生产(预留不启用) 3:生产完成 4:一键暂停
              this.refreshTableList(this.selectedConstractData)
            } else {
              this.$message({ showClose: true, message: `${response.errorMessage}!`, type: 'warning' });
            }
          })
        } else {
          this.$message({ showClose: true, message: '请先选择订单信息!', type: 'warning' });
        }
      }
      if (btnCode === "DOSTOP") { // 一键暂停
        let orderStopDoParam = {
          pkProductOrder: this.selectedConstractData.pkProductOrder
        }
        updateProductOrderStateOutByPk(orderStopDoParam).then((response) => {
          if (response && response.success) {
            this.$message({ showClose: true, message: '暂停成功!', type: 'success' });
            this.selectedConstractData.productionState = "4" // 0:自由态 1:生产中 2:暂停生产(预留不启用) 3:生产完成 4:一键暂停
            this.refreshTableList(this.selectedConstractData)
          } else {
            this.$message({ showClose: true, message: `${response.errorMessage}!`, type: 'warning' });
          }
        })
      }
      if (btnCode === 'STARTUP') { // 针对暂停后的合同进行启动生产
        // 校验是否选择订单信息 
        if (this.selectedConstractData && this.selectedConstractData.pkProductOrder) {
          let orderStartDoParam = {
            pkProductOrder: this.selectedConstractData.pkProductOrder
          }
          orderSaleStartUpProccess(orderStartDoParam).then((response) => {
            if (response && response.success) {
              this.$message({ showClose: true, message: '启动成功!', type: 'success' });
              this.selectedConstractData.productionState = "1" // 0:自由态 1:生产中 2:暂停生产(预留不启用) 3:生产完成 4:一键暂停
              this.refreshTableList(this.selectedConstractData)
            } else {
              this.$message({ showClose: true, message: `${response.errorMessage}!`, type: 'warning' });
            }
          })
        } else {
          this.$message({ showClose: true, message: '请先选择订单信息!', type: 'warning' });
        }
      }
      if (param && param.btnCode === "UPDATESALESTART") { // 修改销售发起数据
        this.content.pkProductOrder = param.bindData.pkProductOrder
        this.openContent('修改', param.btnAction)
        this.content.updateRow = param.bindData
      }
      if (param && param.btnCode === "LOOKORDERBPRODUCT") { // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB = param.bindData.pkProductOrderB
        this.orderProductInfoDetails.visiable = true
      }
      if (param && param.btnCode === "COMMITDINGDING") { // 推送消息到钉钉
        this.commitDialogData.visiable = true;
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
        } else {
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
i:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>