<template>
  <el-dialog title="历史报价" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">

    <el-table :data="historyQuoteTableList" stripe style="width: 100%">
      <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="productCode" label="产品编码" width="180"></el-table-column>
      <el-table-column prop="productNum" label="订单数量" width="180"></el-table-column>
      <el-table-column prop="taxinclud" label="税率" width="180"></el-table-column>
      <el-table-column prop="countProductPriceUnit" label="产品单价"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { selectSaleQuoteHistoryByPkProduct } from '@/api/salemage/salequote'

export default {
  name: 'HistoryQuoteTableView',
  props: ['visiable', 'pkProduct'],
  data() {
    return {
      contentVisiable: false,
      historyQuoteTableList: [], // 列表数据集合
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable == true) {
        this.initHistoryTableList()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 初始化历史报价列表集合
    initHistoryTableList() {
      this.historyQuoteTableList = []
      if (this.pkProduct) {
        let queryParam = {
          pkProduct: this.pkProduct
        }
        selectSaleQuoteHistoryByPkProduct(queryParam).then((response) => {
          if (response && response.success && response.object) {
            this.historyQuoteTableList = response.object
          }
        })
      }
    }
  }
}
</script>

<style>

</style>