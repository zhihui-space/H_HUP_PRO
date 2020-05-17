<template>
  <el-dialog title="移交" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">

    <el-select v-model="selectPkPsndoc" placeholder="请选择销售人员">
      <el-option
        v-for="item in psndocSaleOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { transferCustomer } from '@/api/customer/customer'

export default {
  name: 'TransCustomerDialog',
  props: ["visiable", 'action', 'updateRow', 'pkCustomerArr'],
  data() {
    return {
      selectPkPsndoc: null, // 当前选中的移交目标销售
      contentVisiable: false, // dialog 显示框
      psndocSaleOptions: [], // 销售人员参照
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable === true) {
        this.initPsndocSaleOptions()
      }
    }
  },
  methods: {
    // 初始化销售人员档案参照
    initPsndocSaleOptions() {
      let queryParam = {
        pkPsntypeName: '销售人员'
      }
      listBdPsndocAsRef(queryParam).then((response) => {
        if (response && response.success && response.object) {
          this.psndocSaleOptions = response.object
        }
      })
    },
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      let transferParam = {
        pkArr: this.pkCustomerArr,
        pkPsndoc: this.selectPkPsndoc
      }
      transferCustomer(transferParam).then((response) => {
        if (response && response.success) {
          this.$message({ message: '操作成功', type: 'success' })
        } else {
          this.$message({ message: `操作失败:${response.message}`, type: 'error' })
        }
      })
      this.$emit('close', null)
    }
  }
}
</script>

<style>

</style>
    