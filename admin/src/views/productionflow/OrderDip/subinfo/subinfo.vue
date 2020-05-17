<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">

    <el-button type="primary" @click="onButtonClick('ADDSUBDATA', null)">录入</el-button>
    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column prop="pkOmgProduDipB" label="DIP子表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="pkOmgProduDip" label="DIP主表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="90">
      </el-table-column>
      <el-table-column prop="rematerielTime" label="领料时间" width="160">
      </el-table-column>
      <el-table-column prop="workStartTime" label="开工时间" width="160">
      </el-table-column>
      <el-table-column prop="workEndTime" label="完工时间" width="160">
      </el-table-column>
      <el-table-column prop="totalWorkHours" label="总工时" width="80">
      </el-table-column>
      <el-table-column prop="workEndNum" label="完工数量" width="80">
      </el-table-column>
      <el-table-column prop="chargePsnShow" label="经办人" width="100">
      </el-table-column>
      <el-table-column prop="chargeTime" label="经办时间" width="160">
      </el-table-column>
      <el-table-column prop="billState" label="单据状态" width="100"
        :formatter="(row, column) => {
          if (row.billState == '0') { return '自由态' }
          if (row.billState == '1') { return '进行中' }
          if (row.billState == '2') { return '已完成' }
         }">
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.billState == 0" @click="onButtonClick('CONFIRM', scope.row)">确认</el-button>
          <el-button v-if="scope.row.billState == 0" @click="onButtonClick('DELETESUBDATA', scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

     <!--DIP子表Dialog-->
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
import { selectProductionSubAsPage, saveProductionSub } from '@/api/orderCompMage/OrderDip'

export default {
  name: 'ProductionFlowOrderDipContent',
  props: ["visiable", 'title', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name', 'userid'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 文件详情地址
      listQuery: { // 分页查询
        page: 1,
        limit: 20,
      },

      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        pkOmgProduDipB: null, // 生产流程 dip子表主键
        pkOmgProduDip: null, // dip主表主键
        billState: '0', // 单据状态 
        procedureName: '', // 工序类型
        rematerielTime: '', // 领料时间
        workStartTime: '', // 开工时间
        workEndTime: '', // 完工时间
        totalWorkHours: null, // 总工时
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        chargeTime: '', // 经办时间
        creator: null, // 创建人
        creatorShow: '', // 创建人
        creationtime: '', // 创建时间
        dr: 0, // 删除标志
        ts: '' // 时间戳
      },

      procedureOptions: [ // 工序选择options
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
      if (this.updateRow && this.updateRow.pkOmgProduDip) {
        this.listQuery = {
          page: 1,
          limit: 20
        }
        this.listQuery.pkOmgProduDip = this.updateRow.pkOmgProduDip
        selectProductionSubAsPage(this.listQuery).then((response) => {
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
        this.subInfoContent.pkOmgProduDip = this.updateRow.pkOmgProduDip
        this.innerDialogVisible = true
      }
      if (btnCode === 'DELETESUBDATA') { // 删除生产计划子表数据
        if (rowData.pkOmgProduDipB) {
          let deleteParam = {
            pkOmgProduDipB: rowData.pkOmgProduDipB,
            dr: 1
          }
          saveProductionSub(deleteParam).then((response) => {
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
        if (rowData.pkOmgProduDipB) {
          let deleteParam = {
            pkOmgProduDipB: rowData.pkOmgProduDipB,
            billState: '2',
            chargePsn: this.userid,
            chargeTime: parseTime(new Date())
          }
          saveProductionSub(deleteParam).then((response) => {
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
          this.subInfoContent.pkOmgProduDip = this.updateRow.pkOmgProduDip // 主表主键
          this.subInfoContent.rematerielTime = parseTime(this.subInfoContent.rematerielTime) // 领料时间
          this.subInfoContent.workStartTime = parseTime(this.subInfoContent.workStartTime) // 开工时间
          this.subInfoContent.workEndTime = parseTime(this.subInfoContent.workEndTime) // 完工时间
          saveProductionSub(this.subInfoContent).then((response) => {
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
        pkOmgProduDipB: null, // 生产流程 dip子表主键
        pkOmgProduDip: null, // dip主表主键
        billState: '0', // 单据状态 
        procedureName: '', // 工序类型
        rematerielTime: '', // 领料时间
        workStartTime: '', // 开工时间
        workEndTime: '', // 完工时间
        totalWorkHours: null, // 总工时
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        chargeTime: '', // 经办时间
        creator: this.userid, // 创建人
        creatorShow: this.name, // 创建人
        creationtime: '', // 创建时间
        dr: 0, // 删除标志
        ts: '' // 时间戳
      }
    }
  }
}
</script>

<style scoped>

</style>

