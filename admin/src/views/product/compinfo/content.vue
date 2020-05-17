<template>
<!-- 综合管理弹窗页插 -->
  <el-dialog  :title="title" 
              :visible.sync="contentVisiable" 
              @close="closeDialog"
              width="85%">
    <el-form :inline="true" 
              ref="dataForm" 
              :model="temp" 
              label-position="left" 
              label-width="120px">
      <el-tag>订单信息</el-tag>
      <br/><br/>
      <el-card class="box-card">
        <OrderInfo :tempData="temp"></OrderInfo>
      </el-card>
      <br/>
      <el-tag>产品信息</el-tag>
      <br/><br/>
      <el-card class="box-card">
        <ProductInfoCard :tempData="temp.productInfoList"></ProductInfoCard>
      </el-card>
      <br/>
      <!--叶签操作合集-->
      <el-tabs type="border-card">
        <el-tab-pane label="销售发起">
         <OrderSell :pkProductOrder="updateRow.pkProductOrder"></OrderSell>
        </el-tab-pane>

        <el-tab-pane label="工艺审核">
          <OrderAudit></OrderAudit>
        </el-tab-pane>

        <el-tab-pane label="生产计划">
           <OrderPlan></OrderPlan>
        </el-tab-pane>

        <el-tab-pane label="库房备料">
          <OrderWarehouse></OrderWarehouse>
        </el-tab-pane>

        <el-tab-pane label="物料采购">
          <OrderProcurement></OrderProcurement>
        </el-tab-pane>

        <el-tab-pane label="来料质检">
          <OrderMaterialQc></OrderMaterialQc>
        </el-tab-pane>

        <el-tab-pane label="物料入库">
          <OrderRepertory></OrderRepertory>
        </el-tab-pane>

        <el-tab-pane label="SMT生产">
          <OrderSmt></OrderSmt>
        </el-tab-pane>

        <el-tab-pane label="DIP生产">
          <OrderDip></OrderDip>
        </el-tab-pane>

        <el-tab-pane label="成品质检">
          <OrderQuality></OrderQuality>
        </el-tab-pane>

        <el-tab-pane label="成品入库">
          <OrderIncome></OrderIncome>
        </el-tab-pane>

        <el-tab-pane label="成品出库">
          <OrderCome></OrderCome>
        </el-tab-pane>

        <el-tab-pane label="通知开票">
          <OrderInform></OrderInform>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectAllOrderInfoAsPage, selectOrderDetailsByPrimary } from '@/api/productionProccess/productionProccess'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum } from '@/utils/viewCompUtil'
import ProductInfoCard from '@/views/product/compinfo/components/ProductInfoCard'
import OrderInfo from '@/views/product/compinfo/components/OrderInfo'
import OrderPlan from '@/views/product/compinfo/components/orderPlan/OrderPlan'
import OrderWarehouse from '@/views/product/compinfo/components/orderPlan/OrderWarehouse'
import OrderProcurement from '@/views/product/compinfo/components/orderPlan/OrderProcurement'
import OrderAudit from '@/views/product/compinfo/components/orderPlan/OrderAudit'
import OrderDip from '@/views/product/compinfo/components/orderPlan/OrderDip'
import OrderMaterialQc from '@/views/product/compinfo/components/orderPlan/OrderMaterialQc'
import OrderRepertory from '@/views/product/compinfo/components/orderPlan/OrderRepertory'
import OrderSmt from '@/views/product/compinfo/components/orderPlan/OrderSmt'
import OrderQuality from '@/views/product/compinfo/components/orderPlan/OrderQuality'
import OrderIncome from '@/views/product/compinfo/components/orderPlan/OrderIncome'
import OrderCome from '@/views/product/compinfo/components/orderPlan/OrderCome'
import OrderInform from '@/views/product/compinfo/components/orderPlan/OrderInform'
import OrderSell from '@/views/product/compinfo/components/orderPlan/OrderSell'

export default {
  name: 'Productcompcontent',
  components: { ProductInfoCard, OrderInfo,OrderPlan,OrderWarehouse,OrderProcurement, OrderAudit,OrderDip,OrderMaterialQc,OrderRepertory,OrderSmt,OrderQuality,OrderIncome,OrderCome,OrderInform,OrderSell},
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      temp: {
        contractNo: '', // 合同编号
        customerCode: '', // 客户编号
        pkPsndocShow: '', // 销售负责人
        ts: '', // 下单日期
        deliveryData: '', // 预计交货日期 无数据来源
        orderType: '', // 订单类型 无数据来源
        采购负责人: '', // 采购负责人
        采购电话: '', // 采购电话
        技术负责人: '', // 技术电话
        执行标准: '', // 执行标准
        taxinclud: '', // 是否含税
        urgent: '', // 是否加急
        收货地址: '', // 收货地址
        收货联系人: '', // 收货联系人
        收货电话: '', // 收货联系电话
        transportType: '', // 运输方式
      },
      // 产品信息
      productInfoList: []
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.title === '查看' && this.updateRow) {
        this.initOrderDetailsInfo()
      }
    }
  },
  methods: {
    // 初始化订单详情数据
    initOrderDetailsInfo() {
      if (this.updateRow && this.updateRow.pkProductOrder) {
        let initParam = { pkProductOrder: this.updateRow.pkProductOrder }
        selectOrderDetailsByPrimary(initParam).then((response) => {
          if (response && response.success && response.object) {
            this.temp = response.object
            this.productInfoList = response.object.productInfoList
            console.log(this.object)
          }
        })
      } else {
        this.$message({ message: '主键缺失，无法初始化页面数据！', type: 'warning' })
      }
    },
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      this.$emit('close', actTemp)
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkBtn: undefined,
      }
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 30px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>