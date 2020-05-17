<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">

    <el-button type="primary" @click="onButtonClick('ADDSUBDATA', null)">录入</el-button>
    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column prop="pkOmgProduSmtB" label="SMT子表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="pkOmgProduSmt" label="SMT主表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="100">
      </el-table-column>
      <el-table-column prop="rematerielTime" label="领料时间" width="160">
      </el-table-column>
      <el-table-column prop="workStartTime" label="开工时间" width="160">
      </el-table-column>
      <el-table-column prop="workEndTime" label="完工时间" width="160">
      </el-table-column>
      <el-table-column prop="totalWorkHours" label="总工时" width="90">
      </el-table-column>
      <el-table-column prop="productionLineName" label="产线名称" width="180">
      </el-table-column>
      <el-table-column prop="workEndNum" label="完工数量" width="90">
      </el-table-column>
      <el-table-column prop="billState" label="单据状态" width="100"
        :formatter="(row, column) => {
          if (row.billState == '0') { return '自由态' }
          if (row.billState == '1') { return '进行中' }
          if (row.billState == '2') { return '已完成' }
         }">
      </el-table-column>
      <el-table-column prop="chargePsnShow" label="经办人" width="180">
      </el-table-column>
      <el-table-column prop="chargeTime" label="经办时间" width="180">
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.billState == 0" @click="onButtonClick('CONFIRM', scope.row)">确认</el-button>
          <el-button v-if="scope.row.billState == 0" @click="onButtonClick('DELETESUBDATA', scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--内容录入Dialog-->
    <el-dialog width="50%" title="新增文件上传" :visible.sync="innerDialogVisible" append-to-body>
      <el-form ref="form" :model="subInfoContent" label-width="120px" :inline="true">
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
        <el-form-item label="领料时间">
          <el-date-picker
            v-model="subInfoContent.rematerielTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开工时间">
          <el-date-picker
            v-model="subInfoContent.workStartTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完工时间">
          <el-date-picker
            v-model="subInfoContent.workEndTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="总工时">
          <el-input v-model="subInfoContent.totalWorkHours"></el-input>
        </el-form-item>
        <el-form-item label="产线名称">
          <el-input v-model="subInfoContent.productionLineName"></el-input>
        </el-form-item>
        <el-form-item label="完工数量">
          <el-input v-model="subInfoContent.workEndNum"></el-input>
        </el-form-item>
        <el-form-item label="经办人">
          <el-input v-model="subInfoContent.chargePsn" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="经办时间">
          <el-input v-model="subInfoContent.chargeTime" :disabled="true"></el-input>
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
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onButtonClick('SAVESUBDATA', null)">保存</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/viewCompUtil'
import { selectProductionSmtSubAsPage, saveProductionSmtSub } from '@/api/orderCompMage/OrderSmt'

export default {
  name: 'ProductionFlowOrderSmtContent',
  props: ["visiable", 'title', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name', 'userid'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 列表数据集合
      listQuery: { // 分页查询
        page: 1,
        limit: 20,
      },

      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        pkOmgProduSmtB: null, // SMT子表主键
        pkOmgProduSmt: null, // SMT主表主键
        billState: '0', // 单据状态
        procedureName: '', // 工序类型
        rematerielTime: '', // 领料时间
        workStartTime: '', // 开工时间
        workEndTime: '', // 完工时间
        totalWorkHours: null, // 总工时
        productionLineName: '', // 产线名称
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        chargeTime: '', // 经办时间
        creator: null, // 创建人
        creatorShow: '', // 创建人显示名称
        creationtime: '', // 创建时间
        dr: null, // 删除标识
        ts: '' // 时间戳
      },

      procedureOptions: [ // 工序选择options
        { value: 'SMT', label: 'SMT' }
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
        this.initFileDetailsListData()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgProduSmt) {
        this.listQuery = {
          page: 1,
          limit: 20
        }
        this.listQuery.pkOmgProduSmt = this.updateRow.pkOmgProduSmt
        selectProductionSmtSubAsPage(this.listQuery).then((response) => {
          if (response && response.success) {
            this.fileDetailsList = response.object
          } else {
            this.fileDetailsList = []
          }
        })
      }
    },
    // 处理界面所有的按钮监听动作
    onButtonClick(btnCode, rowData) {
      if (btnCode === 'ADDSUBDATA') { // 添加生产计划子表数据
        this.restSubInfoContent()
        this.subInfoContent.pkOmgProduSmt = this.updateRow.pkOmgProduSmt
        this.innerDialogVisible = true
      }
      if (btnCode === 'DELETESUBDATA') { // 删除生产计划子表数据
        if (rowData.pkOmgProduSmtB) {
          let deleteParam = {
            pkOmgProduSmtB: rowData.pkOmgProduSmtB,
            dr: 1
          }
          saveProductionSmtSub(deleteParam).then((response) => {
            if (response && response.success) {
              this.initFileDetailsListData()
              this.$message({ message: '删除成功', type: 'success' })
            } else {
              this.$message({ message: `删除失败:${response.message}`, type: 'error' })
            }
          })
        }
      }
      // 确认字表数据
      if (btnCode === 'CONFIRM') {
        if (rowData.pkOmgProduSmtB) {
          let deleteParam = {
            pkOmgProduSmtB: rowData.pkOmgProduSmtB,
            billState: '2',
            chargePsn: this.userid,
            chargeTime: parseTime(new Date())
          }
          saveProductionSmtSub(deleteParam).then((response) => {
            if (response && response.success) {
              this.initFileDetailsListData()
              this.$message({ message: '确认成功', type: 'success' })
            } else {
              this.$message({ message: `确认失败:${response.message}`, type: 'error' })
            }
          })
        }
      }
      if (btnCode === 'SAVESUBDATA') { // 保存生产计划子表数据
        this.subInfoContent.rematerielTime = parseTime(this.subInfoContent.rematerielTime) // 领料时间
        this.subInfoContent.workStartTime = parseTime(this.subInfoContent.workStartTime) // 开工时间
        this.subInfoContent.workEndTime = parseTime(this.subInfoContent.workEndTime) // 完工时间
        saveProductionSmtSub(this.subInfoContent).then((response) => {
          if (response && response.success) {
            this.initFileDetailsListData()
            this.innerDialogVisible = false
            this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
        })
      }
    },
    // 刷新临时文件目录
    restSubInfoContent() {
      this.subInfoContent = {
        pkOmgProduSmtB: null, // SMT子表主键
        pkOmgProduSmt: null, // SMT主表主键
        billState: '0', // 单据状态
        procedureName: '', // 工序类型
        rematerielTime: '', // 领料时间
        workStartTime: '', // 开工时间
        workEndTime: '', // 完工时间
        totalWorkHours: null, // 总工时
        productionLineName: '', // 产线名称
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        chargeTime: '', // 经办时间
        creator: null, // 创建人
        creatorShow: this.name, // 创建人显示名称
        creationtime: '', // 创建时间
        dr: null, // 删除标识
        ts: '' // 时间戳
      }
    }
  }
}
</script>

<style scoped>

</style>

