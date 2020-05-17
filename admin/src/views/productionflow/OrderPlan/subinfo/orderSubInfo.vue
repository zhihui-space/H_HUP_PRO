<template>
  <el-dialog title="生产计划详情" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="90%">
    
    <el-button type="primary" @click="onButtonClick('ADDSUBDATA', null)">录入</el-button>
    <el-table :data="subTableDataList" border style="width: 100%">
      <el-table-column prop="sort" label="排序" width="80">
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="120">
      </el-table-column>
      <el-table-column prop="productionWorkshop" label="生产车间" width="100">
      </el-table-column>
      <el-table-column prop="estimatedStartTime" label="预计开工时间" width="120">
      </el-table-column>
      <el-table-column prop="estimatedEndTime" label="预计结束时间" width="120">
      </el-table-column>
      <el-table-column prop="estimatedNumber" label="预计完工数量" width="120">
      </el-table-column>
      <el-table-column prop="actualStartTime" label="实际开工时间" width="120">
      </el-table-column>
      <el-table-column prop="actualEndTime" label="实际结束时间" width="120">
      </el-table-column>
      <el-table-column prop="actualNumber" label="实际完成数量" width="120">
      </el-table-column>
      <el-table-column prop="billState" label="单据状态" width="120" 
        :formatter="(row, column) => {
          if (row.billState == '0') { return '自由态' }
          if (row.billState == '1') { return '进行中' }
          if (row.billState == '2') { return '已完成' }
         }">
      </el-table-column> 
      <el-table-column prop="creationtime" label="创建时间" width="120">
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.billState == 0" @click="onButtonClick('CONFIRM', scope.row)">确认</el-button>
          <el-button v-if="scope.row.billState == 0" @click="onButtonClick('DELETESUBDATA', scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--录入Dialog-->
    <el-dialog width="60%" title="生产子表数据" :visible.sync="subInfoContentVisiable" append-to-body>
      <el-form ref="form" :model="subInfoContent" label-width="120px" :inline="true">
        <el-form-item label="生产计划子表主键" v-if="false">
          <el-input v-model="subInfoContent.pkOmgOrderPlanB"></el-input>
        </el-form-item>
        <el-form-item label="生产计划主表主键" v-if="false">
          <el-input v-model="subInfoContent.pkOmgOrderPlan"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="subInfoContent.sort" :min="1" :max="1000" label="排序"></el-input-number>
        </el-form-item>
        <el-form-item label="工序类型">
          <el-select v-model="subInfoContent.procedureName" clearable placeholder="请选择">
            <el-option
              v-for="item in procedureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间">
          <el-input v-model="subInfoContent.productionWorkshop"></el-input>
        </el-form-item>
        <el-form-item label="预计开工时间">
          <el-date-picker
            v-model="subInfoContent.estimatedStartTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计结束时间">
          <el-date-picker
            v-model="subInfoContent.estimatedEndTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计完成数量">
          <el-input v-model="subInfoContent.estimatedNumber"></el-input>
        </el-form-item>
        <el-form-item label="实际开工时间">
          <el-date-picker
            v-model="subInfoContent.actualStartTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际结束时间">
          <el-date-picker
            v-model="subInfoContent.actualEndTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际完成数量">
          <el-input v-model="subInfoContent.actualNumber"></el-input>
        </el-form-item>
        <el-form-item label="单据状态">
          <el-select v-model="subInfoContent.billState" clearable placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in billStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="subInfoContent.creatorShow" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="subInfoContent.creationtime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onButtonClick('SAVESUBDATA', null)">保存</el-button>
      </span>
    </el-dialog>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import Table from '@/components/viewcomp/Table'
import { selectAllOrderSubDataAsPage, saveOrderPlanSubData } from '@/api/orderCompMage/OrderPlan'
import { parseTime } from '@/utils/viewCompUtil'

export default {
  name: 'ProductionFlowOrderPlanDetails',
  components: { Table },
  props: ["visiable", 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name', 'userid'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      subTableDataList: [], // 子表列表数据集合
      listQuery: { // 分页查询
        page: 1,
        limit: 20,
      },

      // 子表录入界面属性描述
      subInfoContentVisiable: false,
      subInfoContent: {
        pkOmgOrderPlanB: null, // 生产计划子表主键
        pkOmgOrderPlan: null, // 生产计划主表主键
        billState: '0', // 单据状态 
        sort: null, // 排序
        procedureName: '', // 工序类型
        productionWorkshop: '', // 生产车间
        estimatedStartTime: '', // 预计开工时间
        estimatedEndTime: '', // 预计结束时间
        estimatedNumber: '', // 预计完成数量
        actualStartTime: '', // 实际开工时间
        actualEndTime: '', // 实际结束时间
        actualNumber: null, // 实际完成数量
        creator: null, // 创建人
        creatorShow: '', // 创建人显示名称 
        creationtime: '', // 创建时间
        dr: 0, // 删除标志
        ts: '' // 时间戳
      },

      procedureOptions: [ // 工序选择options
        { value: 'SMT', label: 'SMT' },
        { value: 'DIP', label: 'DIP' },
        { value: '三防', label: '三防' },
        { value: '组装、测试、老化', label: '组装、测试、老化' }
      ],
      billStateOptions: [
        { value: '0', label: '自由态' },
        { value: '1', label: '进行中' },
        { value: '2', label: '已完成' }
      ]
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable === true) {
        this.initOrderDetails()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 初始化订单子表数据
    initOrderDetails() {
      this.listQuery = {
        page: 1,
        limit: 20
      }
      this.listQuery.pkOmgOrderPlan = this.updateRow.pkOmgOrderPlan
      selectAllOrderSubDataAsPage(this.listQuery).then((response) => {
        if (response && response.success && response.object) {
          this.subTableDataList = response.object
        } else {
          this.subTableDataList = []
        }
      })
    },
    // 处理界面所有的按钮监听动作
    onButtonClick(btnCode, rowData) {
      if (btnCode === 'ADDSUBDATA') { // 添加生产计划子表数据
        this.restSubInfoContent()
        this.subInfoContent.pkOmgOrderPlan = this.updateRow.pkOmgOrderPlan
        this.subInfoContentVisiable = true
      }
      if (btnCode === 'DELETESUBDATA') { // 删除生产计划子表数据
        if (rowData.pkOmgOrderPlanB) {
          let deleteParam = {
            pkOmgOrderPlanB: rowData.pkOmgOrderPlanB,
            dr: 1
          }
          saveOrderPlanSubData(deleteParam).then((response) => {
            if (response && response.success) {
              this.initOrderDetails()
              this.$message({ message: '删除成功', type: 'success' })
            } else {
              this.$message({ message: `删除失败:${response.message}`, type: 'error' })
            }
          })
        }
      }
      // 确认生产计划字表数据
      if (btnCode === 'CONFIRM') {
        if (rowData.pkOmgOrderPlanB) {
          let deleteParam = {
            pkOmgOrderPlanB: rowData.pkOmgOrderPlanB,
            billState: '2'
          }
          saveOrderPlanSubData(deleteParam).then((response) => {
            if (response && response.success) {
              this.initOrderDetails()
              this.$message({ message: '确认成功', type: 'success' })
            } else {
              this.$message({ message: `确认失败:${response.message}`, type: 'error' })
            }
          })
        }
      }
      if (btnCode === 'SAVESUBDATA') { // 保存生产计划子表数据
        // 转义组件选择时间 为Sring类型存储格式
        this.subInfoContent.estimatedStartTime = parseTime(this.subInfoContent.estimatedStartTime)
        this.subInfoContent.estimatedEndTime = parseTime(this.subInfoContent.estimatedEndTime)
        this.subInfoContent.actualStartTime = parseTime(this.subInfoContent.actualStartTime)
        this.subInfoContent.actualEndTime = parseTime(this.subInfoContent.actualEndTime)
        saveOrderPlanSubData(this.subInfoContent).then((response) => {
          if (response && response.success) {
            this.initOrderDetails()
            this.subInfoContentVisiable = false
            this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
        })
      }
    },
    // 子表录入界面属性描述
    restSubInfoContent() {
      this.subInfoContent = {
        pkOmgOrderPlanB: null, // 生产计划子表主键
        pkOmgOrderPlan: null, // 生产计划主表主键
        billState: '0', // 单据状态 
        sort: null, // 排序
        procedureName: '', // 工序类型
        productionWorkshop: '', // 生产车间
        estimatedStartTime: '', // 预计开工时间
        estimatedEndTime: '', // 预计结束时间
        estimatedNumber: '', // 预计完成数量
        actualStartTime: '', // 实际开工时间
        actualEndTime: '', // 实际结束时间
        actualNumber: null, // 实际完成数量
        creator: null, // 创建人
        creatorShow: this.name, // 创建人显示名称
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      }
    }
  }
}
</script>

<style scoped>

</style>