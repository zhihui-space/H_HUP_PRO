<template>
<!-- 综合管理的查看弹窗 -->
  <div>
    <el-form-item label="合同编号">
      <el-input v-model="tempData.contractNo" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="客户编号">
      <el-input v-model="tempData.customerCode" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="销售负责人">
      <el-input v-model="tempData.pkPsndocShow" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="下单日期">
      <el-input v-model="tempData.ts" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="预计交货日期">
      <el-input v-model="tempData.deliveryData" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="订单类型">
      <el-input v-model="tempData.orderType" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="采购负责人">
      <el-input v-model="tempData.采购负责人" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="采购电话">
      <el-input v-model="tempData.采购电话" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="技术负责人">
      <el-input v-model="tempData.技术负责人" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="技术电话">
      <el-input v-model="tempData.技术电话" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="执行标准">
      <el-input v-model="tempData.执行标准" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="是否含税">
      <el-input v-model="tempData.taxinclud" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="是否加急">
      <el-input v-model="tempData.urgent" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="收货地址">
      <el-input v-model="tempData.收货地址" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="运输方式">
      <el-input v-model="tempData.transportType" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="收货联系人">
      <el-input v-model="tempData.收货联系人" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="收货电话">
      <el-input v-model="tempData.收货电话" :disabled="true"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  props: ["tempData"],
  data() {
    return {
    }
  },
  created() {
    console.log(this.tempData)
  },
   methods: {
    handleCollapseChange(val) { // 监听折叠面板变化

    },
  }
}
</script>

<style>
</style>