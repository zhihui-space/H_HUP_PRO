<template>
  <div>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>销售发起</span>
          <i>{{productionCountNumInfo.startCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderSell')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>工艺审核</span>
          <i>{{productionCountNumInfo.technicsCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderAudit')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>生产计划</span>
          <i>{{productionCountNumInfo.planCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderPlan')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>库房备料</span>
          <i>{{productionCountNumInfo.houseCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderWarehouse')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>物料采购</span>
          <i>{{productionCountNumInfo.purchaseCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderProcurement')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>来料质检</span>
          <i>{{productionCountNumInfo.qualityCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderMaterialQc')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>物料入库</span>
          <i>{{productionCountNumInfo.putinCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderRepertory')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>SMT生产</span>
          <i>{{productionCountNumInfo.smtCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderSmt')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>DIP生产</span>
          <i>{{productionCountNumInfo.dipCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderDip')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成品质检</span>
          <i>{{productionCountNumInfo.becomeCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderQuality')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成品入库</span>
          <i>{{productionCountNumInfo.finishPutinCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderIncome')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成品出库</span>
          <i>{{productionCountNumInfo.putoutCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderCome')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>通知开票</span>
          <i>{{productionCountNumInfo.invoiceCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/OrderInform')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <!-- <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发票任务</span>
          <i>7</i>
        </div>
        <div class="text-item">
          <span @click="skit('/hiderouters/test')">点击查看</span>
        </div>
      </el-card>
    </el-col> -->
  </div>
</template>

<script>
import { OmgCount } from '@/api/dashboard/dashboard'

export default {
  data() {
    return {
      productionCountNumInfo: {}, // 成品质检数量-默认0
    }
  },
  created() {
    // 调用后端接口查询数量
    OmgCount().then((response) => {
      // debugger
      if (response && response.success && response.object) {
        this.productionCountNumInfo = response.object
      }
    })
  },
  methods: {
    skit(path){
      this.$router.push(path)
    }
  }
};
</script>

<style>
.box-card {
  margin-top: 30px;
  text-align: center;
}
.clearfix span{
    color:darkslategrey;
    font-size: 16px;
}
.box-card i{
  font-style: normal;
  font-size: 20px;
  color: #F56C6C;
  padding-left: 10px;
  }
.text-item{
  text-align: center;
  cursor:pointer;
}
.text-item span{
color: rgb(64, 201, 198);
font-size: 14px;
}
</style>