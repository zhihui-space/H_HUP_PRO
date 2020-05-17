<template>
  <el-dialog title="匹配物料信息" 
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="70%">

    <el-input placeholder="请输入内容" v-model="queryFilter.model" style="width: 220px;">
      <template slot="prepend">存货编号</template>
    </el-input>
    <el-input placeholder="请输入内容" v-model="queryFilter.materialFullname" style="width: 220px;">
      <template slot="prepend">存货全名</template>
    </el-input>
    <el-input placeholder="请输入内容" v-model="queryFilter.potting" style="width: 220px;">
      <template slot="prepend">存货型号</template>
    </el-input>
    <hr/>
    <!--表格组件-->
    <el-table :data="tableData" stripe style="width: 100%" @cell-dblclick="sureDialog">
      <el-table-column prop="materielDate" label="单据日期" width="120"></el-table-column>
      <el-table-column prop="materielCode" label="存货编码" width="80"></el-table-column>
      <el-table-column prop="materialName" label="物料名称" width="120"></el-table-column>
      <el-table-column prop="materialFullname" label="存货全名" width="120"></el-table-column>
      <el-table-column prop="potting" label="存货型号" width="120"></el-table-column>
      <el-table-column prop="norms" label="存货规格" width="80"></el-table-column>
      <el-table-column prop="countNum" label="数量" width="100"></el-table-column>
      <el-table-column prop="unitPrice" label="单价" width="100"></el-table-column>
      <el-table-column prop="taxUnitPrice" label="含税单价" width="100"></el-table-column>
    </el-table>

    <!--分页组件-->
    <pagination 
      v-show="pageComp.total>0" 
      :total="pageComp.total" 
      :page.sync="pageComp.page" 
      :limit.sync="pageComp.limit" 
      @pagination="getListData" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
import { listBdMaterielDataBase } from '@/api/purchase/materieldb'

export default {
  name: 'Matchmaterieldialog',
  components: { Pagination },
  props: ["visiable", "queryFilterParam"],
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      queryFilter: {
        itemType: '', // 工序-物料类型
        model: '', // 存货编号
        materialFullname: '', // 存货全名
        potting: '', // 存货型号
      },
      pageComp: { // 分页组件
        total: 0, // 数据量
        page: 1,
        limit: 20,
      },
      tableData: [], // 表格数据
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable) {
        this.restTemp()
        this.initQueryFilter()
        this.getListData()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog(row, column, cell, event) { // 确定保存回调Dialog
      let closeParam = {
        unitPrice: row.unitPrice, // 单价
      }
      this.$emit('close', closeParam)
    },
    // 查询高级参照中的数据
    getListData() {
      let queryParam = {
        dr: 0,
        page: this.pageComp.page,
        limit: this.pageComp.limit,
        itemType: this.queryFilter.itemType,
        materielCode: this.queryFilter.model,
        materialFullname: this.queryFilter.materialFullname,
        potting: this.queryFilter.potting,
      }
      listBdMaterielDataBase(queryParam).then((response) => {
        if (response.success) {
          this.tableData = response.object
          this.pageComp.total = response.total
        }
      })
    },
    // 初始默认带出来的查询参数
    initQueryFilter() {
      if (this.queryFilterParam) {
        this.queryFilter.itemType = this.queryFilterParam.itemType
        this.queryFilter.model = this.queryFilterParam.model
        this.queryFilter.materialFullname = this.queryFilterParam.materialFullname
        this.queryFilter.potting = this.queryFilterParam.potting
      }
    },
    restTemp() {
      this.tableData = []
      this.pageComp.total = 0
      this.pageComp.page = 1
      this.pageComp.limit = 20
      this.queryFilter.itemType = ""
      this.queryFilter.model = ""
      this.queryFilter.materialFullname = ""
      this.queryFilter.potting = ""
    }
  }
}
</script>

<style>

</style>