<template>
  <el-dialog 
    :visible.sync="thisViewDialogVisiable" 
    @close="closeDialog" 
    width="1100px"
    class="header"
  >
    <div style="margin-left: 10px;">
      <el-tag>订单产品详情</el-tag>
      <hr />
    </div>
    <el-form :inline="true" :model="formInline" label-width="130px">
      <el-form-item label="签订日期：">
        <el-input v-model="formInline.orderSignTime" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="预计交货日期：">
        <el-input v-model="formInline.scheduledtime" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="交货日期：">
        <el-input v-model="formInline.交货日期" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="客户编码：">
        <el-input v-model="formInline.customerCode" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="合同编号：">
        <el-input v-model="formInline.contractNo" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="客户名称：">
        <el-input v-model="formInline.customerName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="产品编号：">
        <el-input v-model="formInline.orderProductCode" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="产品名称：">
        <el-input v-model="formInline.orderProductName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="订单数量：">
        <el-input v-model="formInline.productNum" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="单价：" v-if="false">
        <el-input v-model="formInline.productUnitPrice" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="税率：">
        <el-input v-model="formInline.taxinclud" :disabled="true">
        </el-input>
      </el-form-item>

      <el-form-item label="价税合计：" v-if="false">
        <el-input v-model="formInline.totalPrice" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="订单利润：" v-if="false">
        <el-input v-model="formInline.订单利润" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="合同类型：">
        <el-select v-model="formInline.orderType" clearable placeholder="请选择" :disabled="true">
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="销售员：">
        <el-input v-model="formInline.orderPsnname" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="订单状态：">
        <el-select v-model="formInline.productionState" clearable placeholder="请选择" :disabled="true">
          <el-option
            v-for="item in productionStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单备注：">
        <el-input v-model="formInline.memo" :disabled="true"></el-input>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
import { selectProductOrderBByPrimary } from '@/api/constracinfo/constracinfo'

export default {
  name: 'OrderProductInfoDetails',
  props: ["visiable", "pkProductOrderB"],
  data() {
    return {
      thisViewDialogVisiable: false, // 合同订单详细数据显示控制
      formInline: {
        orderSignTime: '', // 签订日期
        scheduledtime: '', // 预计交货日期
        交货日期: '', // 交货日期
        customerCode: '', // 客户编码
        contractNo: '', // 合同编号
        customerName: '', // 客户名称
        orderProductCode: '', // 产品编号
        orderProductName: '', // 产品名称
        productNum: '', // 订单数量
        taxinclud: '', // 税率
        productUnitPrice: '', // 单价
        totalPrice: '', // 价税合计
        订单利润: '', // 订单利润
        orderType: '', // 合同类型
        orderPsnname: '', // 销售员
        billState: '', // 订单状态
        memo: '', // 订单备注
        productionState: '', // 生产状态
      },

      orderTypeOptions: [
        { value: '0', label: '普通合同' },
        { value: '1', label: '生产订单' },
        { value: '2', label: 'OEM' },
        { value: '3', label: 'DEM' },
        { value: '4', label: '贸易模式' }
      ],
      productionStateOptions: [
        { value: '0', label: '自由态' },
        { value: '1', label: '生产中' },
        { value: '2', label: '暂停(未启用)' },
        { value: '3', label: '生产完成' },
        { value: '4', label: '一键暂停' }
      ]
    }
  },
  watch: {
    visiable() {
      this.thisViewDialogVisiable = this.visiable
      if (this.visiable === true) {
        this.initOrderBProductDataByPrimary()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 根据订单字表主键查询订单产品详情数据
    initOrderBProductDataByPrimary() {
      if (this.pkProductOrderB != null) {
        let initQueryParam = {
          pkProductOrderB: this.pkProductOrderB
        }
        // 调用查询接口 将结果赋值给 this.formInline
        selectProductOrderBByPrimary(initQueryParam).then((response) => {
          if (response && response.success) {
            // 在这里打印一下返回结果中的类型 将其中的数据赋值到表单临时对象中
            if (response.object) {
              this.formInline = response.object
            } else {
              this.restFormLine()
            }
          } else {
            this.$message({ message: `查询失败:${response.message}`, type: 'error' })
          }
        })
      }
    },
    restFormLine() {
      this.formInline = {
        orderSignTime: '', // 签订日期
        scheduledtime: '', // 预计交货日期
        交货日期: '', // 交货日期
        customerCode: '', // 客户编码
        contractNo: '', // 合同编号
        customerName: '', // 客户名称
        orderProductCode: '', // 产品编号
        orderProductName: '', // 产品名称
        productNum: '', // 订单数量
        taxinclud: '', // 税率
        productUnitPrice: '', // 单价
        totalPrice: '', // 价税合计
        订单利润: '', // 订单利润
        orderType: '', // 合同类型
        orderPsnname: '', // 销售员
        billState: '', // 订单状态
        memo: '', // 订单备注
        productionState: '', // 生产状态
      }
    }
  }
}
</script>

<style>
.header .el-dialog__header {
  padding:0 0 0 10px;
}
.header .el-dialog__body{
  padding: 15px 5px;
}
.header .el-input__inner{
  height: 35px;
  line-height: 35px;
  padding: 0 5px;
}
.el-select .el-input__inner{
  width: 185px;
}
</style>