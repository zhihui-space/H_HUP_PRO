<template>
  <!-- 库房备料 -->
  <div>
    <div class="handle-box">
      <div class="listname">
        <el-button type="primary" @click="updateWarehouseState('1')">MPR确认</el-button>
      </div>
      <!-- <div class="listname">
                <el-button type="primary" @click="updateWarehouseState('2')">物料到货</el-button>
      </div>-->
      <div class="listname">
        <el-button type="primary">记录</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="55px" fixed="left">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="whState" label="进度名称" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.whState == 0">自由态</span>
          <span style="color: green;" v-else-if="scope.row.whState == 1">MPR确认</span>
          <span style="color: blue;" v-else-if="scope.row.whState == 2">物料到货</span>
        </template>
      </el-table-column>
      <el-table-column prop="whState" label="状态名称" width="110">
        <template slot-scope="scope">
          <span style="color: green;" v-if="scope.row.onOffState == 0">进行中</span>
          <span style="color: red;" v-else-if="scope.row.onOffState == 1">暂停中</span>
        </template>
      </el-table-column>
      <el-table-column prop="mprAffirmtime" label="MPR确认时间" width="170"></el-table-column>
      <el-table-column prop="arrivaltime" label="物料到货" width="170"></el-table-column>
      <el-table-column prop="creationtime" label="操作时间" width="170"></el-table-column>
      <el-table-column prop="creator" label="操作人" width="150"></el-table-column>
      <el-table-column prop="filename" label="附件名称" width="160"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.pkWarehouse)">下载</el-button>
          <el-button
            v-if="scope.row.onOffState==0"
            size="mini"
            @click="onOffState(scope.row.pkWarehouse,1)"
          >暂停</el-button>
          <el-button
            size="mini"
            v-if="scope.row.onOffState==1"
            @click="onOffState(scope.row.pkWarehouse,0)"
          >启动</el-button>
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
import { mapGetters } from "vuex";
import OrderPlancontent from "@/views/product/compinfo/content";
import {
  listWarehouse,
  updateWarehouse,
  updateWarehouseState
} from "@/api/productMageMent/productMageMent";
import { parseTime } from "@/utils/viewCompUtil";
export default {
  name: "OrderWarehouse",
  computed: {
    ...mapGetters(["name", "userid"])
  },
  data() {
    return {
      page: 0,
      limit: 10,
      count: 0,
      currentPage4: 1,
      tableData: [],
      multipleSelection: []
    };
  },

  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      listWarehouse({
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.tableData = res.object;
        this.count = res.total;
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getdata();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    onOffState(row, onOffState) {
      console.log(row);
      console.log(onOffState);

      let updateOnOffStateParam = { pkWarehouse: row, onOffState: onOffState };
      updateWarehouse(updateOnOffStateParam).then(response => {
        if (response && response.success) {
          this.$message({ message: "修改成功", type: "success" });
          this.getdata();
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    //修改备料状态
    updateWarehouseState(whState) {
      // this.multipleSelection 在这里面找选中数据的主键
      let pkArr = "";
      if (this.multipleSelection) {
        this.multipleSelection.forEach((value, index) => {
          if (value && value.pkWarehouse) {
            pkArr = pkArr + value.pkWarehouse + ",";
          }
        });
      }
      if (pkArr && pkArr.endsWith(",")) {
        // 这里将这个字符串中的最后一个字符去掉 ','
        pkArr = pkArr.substring(0, pkArr.length - 1);
        let updateParam = { pkArr: pkArr, whState: whState };
        updateWarehouseState(updateParam).then(response => {
          if (response && response.success) {
            this.$message({ message: "修改成功", type: "success" });
            this.getdata();
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },

    cancel() {
      this.dialogFormVisible = false;
      this.getdata();
    }
  }
};
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