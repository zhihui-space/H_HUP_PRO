<template>
<!-- 生产计划 -->
  <div>
    <div class="handle-box">
      <div class="listname">
        <el-button type="primary" @click="restTemp">录入</el-button>
      </div>
      <div class="listname">
        <el-button type="primary" @click="deleteOrderPlan">删除</el-button>
      </div>
      <div class="listname">
        <el-button type="primary">暂停</el-button>
      </div>
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
      <el-table-column label="序号" width="70px" fixed="left">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="process" label="工序" width="85"></el-table-column>
      <el-table-column prop="workshop" label="生产车间" width="85"></el-table-column>
      <el-table-column prop="estimatedStartTime" label="预计开工时间" width="180"></el-table-column>
      <el-table-column prop="estimatedEndTime" label="预计完工时间" width="180"></el-table-column>
      <el-table-column prop="estimatedNumber" label="预计数量" width="85"></el-table-column>
      <el-table-column prop="actualStartTime" label="实际开工时间" width="180"></el-table-column>
      <el-table-column prop="actualEndTime" label="实际完工时间" width="180"></el-table-column>
      <el-table-column prop="actualNumber" label="实际数量" width="85"></el-table-column>
      <el-table-column label="操作" fixed="right" width="350" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">通知库房备料</el-button>
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">暂停</el-button>
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
    <!-- 弹出的添加页面 -->
    <el-dialog :visible.sync="dialogFormVisible" width="700px"  append-to-body>
      <el-form ref="form" :model="temp" label-width="120px" :inline="true" >
        <el-form-item label="工序">
          <el-input v-model="temp.process" style="width: 10rem;"></el-input>
        </el-form-item>
        <el-form-item label="生产车间">
          <el-input v-model="temp.workshop" style="width: 10rem;"></el-input>
        </el-form-item>
        <el-form-item label="预计开工时间">
          <el-col :span="11">
            <el-date-picker
              v-model="temp.estimatedStartTime"
              type="date"
              placeholder="选择日期"             
              value-format="yyyy-MM-dd"
              style="width: 10rem;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="预计完工时间" >
          <el-col :span="11">
            <el-date-picker
              v-model="temp.estimatedEndTime"
              type="date"
              placeholder="选择日期"              
              value-format="yyyy-MM-dd"
              style="width: 10rem;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="预计数量">
          <el-input v-model="temp.estimatedNumber" style="width: 10rem;"></el-input>
        </el-form-item>
        <el-form-item label="实际开工时间" v-if="alert" >
          <el-col :span="11">
            <el-date-picker
              v-model="temp.actualStartTime"
              type="date"
              placeholder="选择日期"              
              value-format="yyyy-MM-dd"
              style="width: 10rem;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item  label="实际完工时间" v-if="alert"  >
          <el-col :span="11" >
            <el-date-picker
              v-model="temp.actualEndTime"
              type="date"
              placeholder="选择日期"              
              value-format="yyyy-MM-dd"
              style="width: 10rem;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="实际数量" v-if="alert">
          <el-input v-model="temp.actualNumber" style="width: 10rem;"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="temp.creationtime" style="width: 10rem;" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="temp.creatorShow" style="width: 10rem;" disabled></el-input>
        </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button v-if="add" type="primary" @click="insertProduction">添加</el-button>
          <el-button v-if="alert" type="primary" @click="updateProduction">修改</el-button>
          <el-button @click="cancel">取消</el-button>       
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrderPlancontent from "@/views/product/compinfo/content";
import {listProduction,insertProduction,deleteProductionByPks,updateProduction} from "@/api/productMageMent/productMageMent";
import { parseTime } from "@/utils/viewCompUtil";
export default {
  name: "OrderPlan",
  computed: {
    ...mapGetters(["name", "userid"])
  },
  data() {
    return {
      add: false,
      alert:false, // 就用这个来判断状态 是修改 还是新增
      page: 0,
      limit: 10,
      count: 0,
      currentPage4: 1,
      tableData: [],
      multipleSelection: [], // 选中行
      dialogFormVisible: false,
      temp: {
        pkProduction: undefined,
        actualStartTime: "",
        actualEndTime: "",
        actualNumber: "",
        process: "",
        workshop: "",
        estimatedStartTime: "",
        estimatedEndTime: "",
        estimatedNumber: "",
        creatorShow: this.name,
        creator: null,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      listProduction({
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

    restTemp() {
      this.temp = {
        process: "",
        workshop: "",
        estimatedStartTime: "",
        estimatedEndTime: "",
        estimatedNumber: "",
        creator: "",
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        creatorShow: this.name
      };
      // console.log(this.name)
      // console.log(this.temp)
      this.dialogFormVisible = true;
      this.add= true;
      this.alert=false;
    },
    handleEdit(index, row, type){ 
      debugger;
      this.dialogFormVisible = true;
      this.temp = row;
      this.temp.creatorShow = this.name
      this.alert = true;
      this.add = false; 
    },

    updateProduction(){
      let temp = this.temp;
      updateProduction(temp).then(response =>{
        if (response && response.success) {
          this.getdata();
          this.dialogFormVisible = false;
          this.$message({ message: "修改成功", type: "success" });
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    insertProduction(){
      let temp = this.temp;
      insertProduction(temp).then(response => {
        if (response && response.success) {
          this.getdata();
          this.dialogFormVisible = false;
          this.$message({ message: "添加成功", type: "success" });
        } else {
          this.$message.error("添加失败");
        }
      });  
      },               
    deleteOrderPlan() {
      // this.multipleSelection 在这里面找选中数据的主键
      let pkArr = "";
      if (this.multipleSelection) {
        this.multipleSelection.forEach((value, index) => {
          if (value && value.pkProduction) {
            pkArr = pkArr + value.pkProduction + ",";
          }
        });
      }
      if (pkArr && pkArr.endsWith(",")) {
        // 这里将这个字符串中的最后一个字符去掉 ','
        pkArr = pkArr.substring(0, pkArr.length - 1);
        let deleteParam = { pkArr: pkArr };
        deleteProductionByPks(deleteParam).then(response => {
          if (response && response.success) {
            this.$message({ message: "删除成功", type: "success" });
            this.getdata();
          } else {
            this.$message.error("删除失败");
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
