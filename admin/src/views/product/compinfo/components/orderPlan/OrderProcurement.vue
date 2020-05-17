<template>
<!-- 物料采购 -->
    <div>
        <div class="handle-box">
            <div class="listname">
                <el-button type="primary" @click="restTemp">录入</el-button>
            </div>
            <div class="listname">
                <el-button type="primary" @click="deleteProcurement()">删除</el-button>
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
        <el-table-column label="序号" width="55px" fixed="left">
        <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="process" label="工序" width="110"></el-table-column>
        <el-table-column prop="prState" label="状态名称" width="110">
          <template slot-scope="scope"> 
            <span   v-if="scope.row.prState == 0">未开始</span>
            <span style="color: green;" v-else-if="scope.row.prState == 2">进行中</span>
            <span style="color: red;" v-else-if="scope.row.prState == 1">暂停中</span>
          </template>
        </el-table-column>
        <el-table-column prop="estimatedFinishTime" label="预计齐料时间" width="170"></el-table-column>
        <el-table-column prop="actualFinishTime" label="实际齐料时间" width="170"></el-table-column>
        <el-table-column prop="creator" label="操作人" width="110"></el-table-column>
        <el-table-column prop="creationtime" label="创建时间" width="170"></el-table-column>        
        <el-table-column label="操作" fixed="right" width="350" >
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit()">通知来料质检</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button v-if="scope.row.prState==2"
          size="mini"
          @click="onOffState(scope.row.pkProcurement,1)">暂停</el-button>
        <el-button
          size="mini" v-if="scope.row.prState==1||scope.row.prState==0"
          @click="onOffState(scope.row.pkProcurement,2)">启动</el-button>          
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

        <el-form-item label="预计齐料时间">
          <el-col :span="11">
            <el-date-picker
              v-model="temp.estimatedFinishTime"
              type="date"
              placeholder="选择日期"             
              value-format="yyyy-MM-dd"
              style="width: 10rem;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="实际齐料时间" v-if="alert" >
          <el-col :span="11">
            <el-date-picker
              v-model="temp.actualFinishTime"
              type="date"
              placeholder="选择日期"              
              value-format="yyyy-MM-dd"
              style="width: 10rem;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="temp.creationtime" style="width: 10rem;" disabled></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="temp.creatorShow" style="width: 10rem;" disabled></el-input>
        </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button v-if="add" type="primary" @click="insertProcurement">添加</el-button>
          <el-button v-if="alert" type="primary" @click="updateProcurement">修改</el-button>
          <el-button @click="cancel">取消</el-button>       
      </div>
    </el-dialog>                     
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import OrderPlancontent from "@/views/product/compinfo/content";
import {listProcurement,updateProcurement,deleteProcurement,insertProcurement} from "@/api/productMageMent/productMageMent";
import { parseTime } from "@/utils/viewCompUtil";
export default {
    name:"OrderProcurement",
      computed: {
    ...mapGetters(["name", "userid"])
  },
    data(){

      return{
        add: false,
        alert:false, // 就用这个来判断状态 是修改 还是新增
        dialogFormVisible: false,          
        page: 0,
        limit: 10,
        count: 0,
        currentPage4: 1,
        tableData: [],
        multipleSelection: [],
      temp: {
        pkProcurement: undefined,
        pkWarehouse: "",
        actualEndTime: "",
        process: "",
        prState: "",
        estimatedFinishTime: "",
        actualFinishTime: "",
        creatorShow:"",
        creator: null,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      }        
      }
  },
    created() {
        console.log(this.name,'name')
        this.temp.creatorShow = this.name
        this.getdata();
  },
    methods: {
    getdata() {
      listProcurement({
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log(res)
        this.tableData = res.object;
        this.count = res.total;
      });
    },
    onOffState(row,onOffState){//启动暂停接口
   
        console.log(row);
        console.log(onOffState);
           debugger
        let updateOnOffStateParam = { pkProcurement: row,prState: onOffState} 
        updateProcurement(updateOnOffStateParam).then(response => {
            if (response && response.success) {
                this.$message({ message: "修改成功", type: "success" });
                this.getdata();
            } else {
                this.$message.error("修改失败");
        }
      });
    },
     deleteProcurement() {
      // this.multipleSelection 在这里面找选中数据的主键
      let pkArr = "";
      if (this.multipleSelection) {
        this.multipleSelection.forEach((value, index) => {
          if (value && value.pkProcurement) {
            pkArr = pkArr + value.pkProcurement + ",";
          }
        });
      }
      if (pkArr && pkArr.endsWith(",")) {
        // 这里将这个字符串中的最后一个字符去掉 ','
        pkArr = pkArr.substring(0, pkArr.length - 1);
        let deleteParam = { pkArr: pkArr };
        deleteProcurement(deleteParam).then(response => {
          if (response && response.success) {
            this.$message({ message: "删除成功", type: "success" });
            this.getdata();
          } else {
            this.$message.error("删除失败");
          }
        });
      }
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
            pkProcurement: undefined,
            pkWarehouse: "",
            actualEndTime: "",
            process: "",
            prState: "",
            estimatedFinishTime: "",
            actualFinishTime: "",
            creatorShow: this.name,
            creator: null,
            creationtime: parseTime(new Date()),
            dr: 0,
            ts: parseTime(new Date())
        };  
      this.dialogFormVisible = true;
      this.add= true;
      this.alert=false;
    },
    insertProcurement(){
            let temp = this.temp;
            insertProcurement(temp).then(response => {
                if (response && response.success) {
                    this.getdata();
                    this.dialogFormVisible = false;
                    this.$message({ message: "添加成功", type: "success" });
                } else {
                this.$message.error("添加失败");
                }
            });  
      }, 
    handleEdit(index, row, type){ 
      this.dialogFormVisible = true;
      this.temp = row;
      this.temp.creatorShow = this.name
      //this.$set(this.temp,'creatorShow',this.name)
      this.alert = true;
      console.log(row,index,type,'row')
   
      this.add = false; 
    },
    updateProcurement(){
        let temp = this.temp;
        updateProcurement(temp).then(response =>{
        if (response && response.success) {
          this.getdata();
          this.dialogFormVisible = false;
          this.$message({ message: "修改成功", type: "success" });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    
      cancel() {
      this.getdata();
    }      
}
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