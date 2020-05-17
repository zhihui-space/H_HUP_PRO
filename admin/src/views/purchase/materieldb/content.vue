<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="70%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="120px">
      <el-form-item label="物料日期" prop="materielDate">
        <el-input v-model="temp.materielDate"></el-input>
      </el-form-item>
      <el-form-item label="存货编号" prop="materielCode">
        <el-input v-model="temp.materielCode"></el-input>
      </el-form-item>
      <el-form-item label="物料名称" prop="materialName">
        <el-input v-model="temp.materialName"></el-input>
      </el-form-item>
      <el-form-item label="存货全名" prop="materialFullname">
        <el-input v-model="temp.materialFullname"></el-input>
      </el-form-item>
      <el-form-item label="存货型号" prop="potting">
        <el-input v-model="temp.potting"></el-input>
      </el-form-item>
      <el-form-item label="存货规格" prop="norms">
        <el-input v-model="temp.norms"></el-input>
      </el-form-item>
      <el-form-item label="存货备注" prop="memo">
        <el-input v-model="temp.memo"></el-input>
      </el-form-item>
      <el-form-item label="品牌全名" prop="brand">
        <el-input v-model="temp.brand"></el-input>
      </el-form-item>
      <el-form-item label="单位全名(供应商)" prop="pkSupplier">
        <el-input v-model="temp.pkSupplier"></el-input>
      </el-form-item>
      <el-form-item label="经办人全名" prop="pkAgent">
        <el-input v-model="temp.pkAgent"></el-input>
      </el-form-item>
      <el-form-item label="运输方式" prop="trafficType">
        <el-input v-model="temp.trafficType"></el-input>
      </el-form-item>
      <el-form-item label="采购类别" prop="purchaseType">
        <el-input v-model="temp.purchaseType"></el-input>
      </el-form-item>
      <el-form-item label="是否含税" prop="inclutax">
        <el-input v-model="temp.inclutax"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="usageUnit">
        <el-input v-model="temp.usageUnit"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="countNum">
        <el-input v-model="temp.countNum"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="unitPrice">
        <el-input v-model="temp.unitPrice"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amountMoney">
        <el-input v-model="temp.amountMoney"></el-input>
      </el-form-item>
      <el-form-item label="进项税额" prop="incomeTax">
        <el-input v-model="temp.incomeTax"></el-input>
      </el-form-item>
      <el-form-item label="含税单价" prop="taxUnitPrice">
        <el-input v-model="temp.taxUnitPrice"></el-input>
      </el-form-item>
      <el-form-item label="价税合计" prop="priceTaxTotal">
        <el-input v-model="temp.priceTaxTotal"></el-input>
      </el-form-item>
      <el-form-item label="批号" prop="batchNum">
        <el-input v-model="temp.batchNum"></el-input>
      </el-form-item>
      <el-form-item label="到期日期" prop="expireDate">
        <el-input v-model="temp.expireDate"></el-input>
      </el-form-item>
      <el-form-item label="税率" prop="taxRate">
        <el-input v-model="temp.taxRate"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="creatorShow">
        <el-input v-model="temp.creatorShow"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="creationtime">
        <el-input v-model="temp.creationtime"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'

export default {
  name: 'Materieldatabasecontent',
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
        pkDbMateriel: undefined,
        materielDate: '',
        materielCode: '',
        materialName: '',
        materialFullname: '',
        potting: '',
        norms: '',
        memo: '',
        brand: '',
        pkSupplier: '',
        pkAgent: '',
        trafficType: '',
        purchaseType: '',
        inclutax: '',
        usageUnit: '',
        countNum: null,
        unitPrice: null,
        amountMoney: null,
        incomeTax: null,
        taxUnitPrice: null,
        priceTaxTotal: null,
        batchNum: '',
        expireDate: '',
        taxRate: null,
        creator: null,
        creatorShow: '',
        creationtime: parseTime(new Date()),
        ts: parseTime(new Date()),
        dr: 0
      }
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.title === '录入') {
        this.restTemp()
      }
      if (this.title === '修改' && this.updateRow) {
        this.temp = this.updateRow
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      const actTemp = this.temp
      if (this.action) {
        initReplaceUpdateData(actTemp, this.replace)
        this.action(actTemp).then((response) => {
          if (response.primary) {
            actTemp.pkCustomer = response.primary
          }
          if (response.success) {
            initReplaceAddData(actTemp, this.replace)
            this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
            this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
          this.$emit('refreshList', null)
          this.$emit('close', actTemp)
        })
      }
    },
    restTemp() {
      this.temp = {
        pkDbMateriel: undefined,
        materielDate: '',
        materielCode: '',
        materialName: '',
        materialFullname: '',
        potting: '',
        norms: '',
        memo: '',
        brand: '',
        pkSupplier: '',
        pkAgent: '',
        trafficType: '',
        purchaseType: '',
        inclutax: '',
        usageUnit: '',
        countNum: null,
        unitPrice: null,
        amountMoney: null,
        incomeTax: null,
        taxUnitPrice: null,
        priceTaxTotal: null,
        batchNum: '',
        expireDate: '',
        taxRate: null,
        creator: null,
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        ts: parseTime(new Date()),
        dr: 0
      }
    }
  }
}
</script>

<style>

</style>