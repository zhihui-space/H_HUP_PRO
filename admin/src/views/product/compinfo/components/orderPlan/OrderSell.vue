<template>
  <!-- 销售发起 -->
  <div>
    <div class="handle-box">
      <div class="listname">
        <el-button type="primary" @click="restTemp">录入</el-button>
      </div>
      <div class="listname">
        <el-button type="primary" @click="handleEdit">编辑</el-button>
      </div>
      <div class="listname">
        <el-button type="danger" @click="deleteSalesLaunch">删除</el-button>
      </div>
      <!-- <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group> -->
    </div>
    <div class="box">
      <div class="title">
        <div class="theme">主题</div>
      </div>
      <div class="content">
        <div class="left">内容:</div>
        <div class="right">
          <span>{{temp.annotation}}</span>
        </div>
      </div>
      <div class="bottom">
          发起人：
          <span>{{temp.creatorShow}}</span>
        <span class="middle">
          发布时间：
        {{temp.creationtime}}
        </span>
        <span class="right">
          金额：{{temp.salesAmount}}
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="700px" :modal="false" :append-to-body="false" @close="closeInnerDialog">
      <el-form
        :inline="true"
        :model="temp"
        class="demo-form-inline"
        label-position="left"
        label-width="80px">
        <el-form-item label="操作人">
          <el-input v-model="temp.creatorShow" placeholder="操作人" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-input placeholder="发起时间" v-model="temp.creationtime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="temp.salesAmount" placeholder="金额" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="temp.annotation"
            type="textarea"
            placeholder="请输入内容"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button v-if="add" type="primary" @click="insertSalesLaunchMethod">添加</el-button>
        <el-button v-if="alert" type="primary" @click="updateSalesLaunch">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import {
//   insertSalesLaunch,
//   selectSalesAmountByProductId,
//   selectAllSalesLaunchAs,
//   updateSalesLaunchById,
//   deleteSalesLaunchById
// } from "@/api/productMageMent/productMageMent";
import { parseTime } from "@/utils/viewCompUtil";

export default {
  name: "OrderSell",
  props: ["pkProductOrder"],
  computed: {
    ...mapGetters(["name", "userid"])
  },
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      add: false,
      alert: false,
      input: "",
      receive: "",
      textarea: "",
      id: "",
      options: [{
          value: '选项1',
          label: '未开始'
        }, {
          value: '选项2',
          label: '进行中'
        }, {
          value: '选项3',
          label: '已完成'
        }],
        value: '',
      temp: {
        salesAmount: "",
        pkProductOrder: "",
        annotation: "",
        creatorShow: '',
        creationtime: '',
        ts: parseTime(new Date()),
        state:"",
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      selectAllSalesLaunchAs({
        pkProductOrder: this.pkProductOrder
      }).then(res => {
        this.temp = res.object;
        console.log(this.temp);
      })
    },
    restTemp() {
      this.temp = {
        pkProductOrder: this.pkProductOrder,
        salesAmount: "",
        annotation: "",
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        ts: parseTime(new Date()),
      }

      this.add = true;
      this.alert = false;
      this.dialogVisible = true;
      let quertAmountParam = {
        pkProductOrder: this.pkProductOrder
      };
      selectSalesAmountByProductId(quertAmountParam).then(response => {
        if (response && response.success) {
          let result = response.object;
          let salesAmount = result.salesAmount;
          this.temp.salesAmount = salesAmount;
        }
      });
    },
    insertSalesLaunchMethod() {
      this.temp.pkProductOrder = this.pkProductOrder;
      let temp = this.temp;
      insertSalesLaunch(temp).then(response => {
        if (response && response.success) {
          this.getdata();
          this.$message({ message: "添加成功", type: "success" });
          this.dialogVisible = false;
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    handleEdit() {
      this.dialogVisible = true;
      this.add = false;
      this.alert = true;
    },
    updateSalesLaunch() {
      this.temp.pkProductOrder = this.pkProductOrder;
      let temp = this.temp;
      updateSalesLaunchById(temp).then(response => {
        if (response && response.success) {
          this.getdata();
          this.dialogVisible = false;
          this.$message({ message: "修改成功", type: "success" });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    deleteSalesLaunch() {
      let quertAmountParam = { pkProductOrder: this.pkProductOrder };
      deleteSalesLaunchById(quertAmountParam).then(response => {
        if (response && response.success) {
          this.$message({ message: "删除成功", type: "success" });
          this.getdata();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.getdata();
    },
    closeInnerDialog() {
      this.temp.creatorShow = ''
      this.temp.creationtime = ''
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
.box {
  width: 700px;
  height: 250px;
  border: 1px solid #dcdfe6;
  color: #909399;
}
.title {
  width: 700px;
  height: 40px;
  float: left;
  border-bottom: 1px solid #dcdfe6;
}
.content {
  height: 150px;
  width: 700px;
  float: left;
}
.left {
  height: 170px;
  width: 200px;
  border-right: 1px solid #dcdfe6;
  font-weight: 600;
  text-align: center;
  line-height: 170px;
  font-size: 18px;
  float: left;
}
.content.right {
  width: 500px;
  height: 150px;
  float: right;
}
.theme {
  height: 40px;
  width: 200px;
  border-right: 1px solid #dcdfe6;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
}
.bottom {
  width: 700px;
  height: 40px;
  float: left;
  border-top: 1px solid #dcdfe6;
  line-height: 40px;
  padding-left: 40px;
}
.bottom .middle {
  padding-left: 100px;
}
.bottom .right {
  padding-left: 80px;
}
.input {
  width: 150px;
}
.demo-form-inline {
  padding-left: 20px;
}
.handle-box {
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>