<template>
  <el-dialog title="确认价格" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">

    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="150px">
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="temp.productName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="产品编码" prop="productCode">
        <el-input v-model="temp.productCode" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="税率" prop="taxinclud">
        <el-input v-model="temp.taxinclud" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="订单数量" prop="productNum">
        <el-input v-model="temp.productNum" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="订单单价" prop="countProductPriceUnit">
        <el-input type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.countProductPriceUnit" @change="countProductPriceUnitChage()"></el-input>
      </el-form-item>

      <el-form-item label="订单总价" prop="countProductPriceTotal">
        <el-input type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.countProductPriceTotal" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" v-if="title!='查看'">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updateProductOrderB } from '@/api/orders/orders'

export default {
  name: 'ConfirmPriceContent',
  props: ['visiable', 'updateRow'],
  data() {
    return {
      contentVisiable: false,
      temp: {
        pkProductOrderB: null, // 订单字表主键
        productName: '', // 产品名称
        productCode: '', // 产品编码
        taxinclud: null, // 税率
        productNum: null, // 订单数量
        countProductPriceUnit: null, // 单价
        countProductPriceTotal: null, // 订单总价 
      }
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable == true && this.updateRow) {
        this.temp.pkProductOrderB = this.updateRow.pkProductOrderB
        this.temp.productName = this.updateRow.name
        this.temp.productCode = this.updateRow.code
        this.temp.taxinclud = this.updateRow.taxinclud
        this.temp.productNum = this.updateRow.productNum
        this.temp.countProductPriceUnit = this.updateRow.countProductPriceUnit
        this.temp.countProductPriceTotal = this.updateRow.countProductPriceTotal
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      if (this.temp.pkProductOrderB) {
        let updateParam = {
          pkProductOrderB: this.temp.pkProductOrderB,
          productUnitPrice: this.temp.countProductPriceUnit,
          billState: 7
        }
        updateProductOrderB(updateParam).then((response) => {
          if (response && response.success) {
            this.$emit('close', null)
            this.$message({ type: 'success', message: '确认成功!' })
          }
        })
      }
    },
    // 监听单价变化后级联计算出总价
    countProductPriceUnitChage() {
      let productNum = this.temp.productNum // 数量
      let countProductPriceUnit = this.temp.countProductPriceUnit // 单价
      if (productNum && countProductPriceUnit) {
        this.temp.countProductPriceTotal = ( (countProductPriceUnit * 100000) * productNum ) / 100000
      }
    }
  }
}
</script>

<style>

</style>