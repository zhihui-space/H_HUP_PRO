<template>
  <el-dialog title="选择产品" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%"
    append-to-body>

    <el-table :data="tableListData" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="pkProduct" label="产品主键" width="180" v-if="false">
      </el-table-column>
      <el-table-column prop="name" label="产品名称" width="180">
      </el-table-column>
      <el-table-column prop="code" label="产品编码" width="180">
      </el-table-column>
      <el-table-column prop="model" label="产品型号" width="180">
      </el-table-column>
      <el-table-column prop="technicsState" label="单据状态"
        :formatter="(row, column) => {
          if (row.technicsState == 0) { return '自由态' }
          if (row.technicsState == 20) { return '已申请' }
          if (row.technicsState == 21) { return '工艺审核中' }
          if (row.technicsState == 22) { return '工艺审核完成' }
        }">
      </el-table-column>
    </el-table>

    <pagination 
      v-show="total>0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="getList" />

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sureDialog">确定选择</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
import { listOrderProduct } from '@/api/product/product'

export default {
  name: 'OrderProductSelectDialog',
  props: ["visiable"],
  components: { Pagination },
  data() {
    return {
      contentVisiable: false,
      tableListData: [], // 列表数据

      multipleSelection: [], // 当前选中行

      total: 0, // 数据量
      listQuery: {
        page: 1,
        limit: 20,
        technicsState: 22 // 默认查询出工艺审核完成状态的产品
      }
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable == true) {
        this.getList()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确认关闭Dialog
      this.$emit('initOrderProductListInfo', this.multipleSelection)
    },
    getList() {
      listOrderProduct(this.listQuery).then((response) => {
        if (response && response.success && response.object) {
          this.tableListData = response.object
          this.total = response.total
        } else {
          this.tableListData = []
          this.total = 0
        }
      })

      this.multipleSelection = []
    },
    // 监听选中行变化
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style>

</style>