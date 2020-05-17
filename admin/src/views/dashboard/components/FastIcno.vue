<template>
  <div>
    <el-col :span="3" :offset="0">
      <el-card class="box-card">
        <div style="text-align:center;">
          <svg-icon icon-class="user" class-name="card-panel-icon" style="font-size: 48px;color: #33CCFF;" />
          <br/><br/>
          <span>用户</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="3" :offset="1">
      <el-card class="box-card">
        <div style="text-align:center;">
          <svg-icon icon-class="chart" class-name="card-panel-icon" style="font-size: 48px;color: #99FF99;" />
          <br/><br/>
          <span>分析</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="3" :offset="1">
      <el-card class="box-card">
        <div style="text-align:center;">
          <svg-icon icon-class="clipboard" class-name="card-panel-icon" style="font-size: 48px;color: #9999FF;" />
          <br/><br/>
          <span>订单</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="3" :offset="1">
      <el-card class="box-card">
        <div style="text-align:center;">
          <svg-icon icon-class="form" class-name="card-panel-icon" style="font-size: 48px;color: #FFCC99;" />
          <br/><br/>
          <span>票据</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="3" :offset="1">
      <el-card class="box-card">
        <div style="text-align:center;">
          <svg-icon icon-class="email" class-name="card-panel-icon" style="font-size: 48px;color: #40c9c6;" />
          <br/><br/>
          <span>消息</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="3" :offset="1">
      <el-card class="box-card">
        <div style="text-align:center;">
          <svg-icon icon-class="component" class-name="card-panel-icon" style="font-size: 48px;color: #FF9966;" />
          <br/><br/>
          <span>配置</span>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style>

</style>