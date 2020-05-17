<template>
<!-- 产品信息 -->
  <div>
    <el-collapse>
      <el-collapse-item :title="pdata.name" v-for="(pdata , index) in tempData" :key="index" :name="index">
        <el-form-item label="产品编号">
          <el-input v-model="pdata.code" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="产品名称">
          <el-input v-model="pdata.name" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="产品型号">
          <el-input v-model="pdata.model" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="订单数量">
          <el-input v-model="pdata.productNum" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="组装">
          <el-input v-model="pdata.isinstal" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="测试">
          <el-input v-model="pdata.istest" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="老化">
          <el-input v-model="pdata.isaging" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="三防">
          <el-input v-model="pdata.defense" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="焊接工艺">
          <el-input v-model="pdata.sealTechnics" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="DIP制具">
          <el-input v-model="pdata.productName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="测试制具">
          <el-input v-model="pdata.makeDip" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="老化制具">
          <el-input v-model="pdata.makeAging" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="三防制具">
          <el-input v-model="pdata.makeDefense" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="钢网来源">
          <el-input v-model="pdata.makeSteelMesh" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="PCB来源">
          <el-input v-model="pdata.pcbSource" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="物料来源">
          <el-input v-model="pdata.materialSource" :disabled="true"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'ProductInfoCard',
  props: ["tempData"],
  data() {
    return {

    }
  },
  methods: {
    handleCollapseChange(val) { // 监听折叠面板变化

    },
  }
}
</script>

<style>

</style>