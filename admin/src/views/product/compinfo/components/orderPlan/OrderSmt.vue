<template>
<!-- SMT生产 -->
    <div>
        <div class="handle-box">
            <div class="listname">
                <el-button type="primary" @click="restTemp">录入</el-button>
            </div>
            <div class="listname">
                <el-button type="primary" @click="deleteOrderPlan">删除</el-button>
            </div>
            <div class="listname">
                <el-button type="primary">修改</el-button>
            </div>
        </div>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="70px" fixed="left">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="qcState" label="领料时间" width="95"></el-table-column>
      <el-table-column prop="qcExplain" label="开工日期" width="95"></el-table-column>
      <el-table-column prop="filename" label="完工日期" width="95"></el-table-column>
      <el-table-column prop="creator" label="总工时" width="95"></el-table-column>
      <el-table-column prop="creationtime" label="产线名称" width="95"></el-table-column>
      <el-table-column prop="creationtime" label="完工数量" width="95"></el-table-column>
      <el-table-column prop="creationtime" label="经办人" width="95"></el-table-column>
      <el-table-column prop="creationtime" label="经办日期" width="95"></el-table-column>

      <el-table-column label="操作" fixed="right" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10,20,30]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>                
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.handle-box {
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.listname {
  display: flex;
  width: auto;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.9375rem;
  margin-left: 0.8rem;
}
.allname {
  min-width: 3rem;
  color: #409eff;
}
</style>