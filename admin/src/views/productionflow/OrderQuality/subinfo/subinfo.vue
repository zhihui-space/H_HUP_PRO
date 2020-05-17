<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">

    <el-button type="primary" @click="onButtonClick('ADDSUBDATA', null)">录入</el-button>
    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column prop="pkOmgBecomeB" label="成品质检子表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="pkOmgBecome" label="成品质检主表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="procedureName" label="工序类型" width="90">
      </el-table-column>
      <el-table-column prop="sequenceNum" label="序列号段" width="100">
      </el-table-column>
      <el-table-column prop="checkNum" label="检查数量" width="100">
      </el-table-column>
      <el-table-column prop="passNum" label="通过数量" width="100">
      </el-table-column>
      <el-table-column prop="passRate" label="通过率" width="100">
      </el-table-column>
      <el-table-column prop="fileName" label="文件名称" width="160">
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

    <!--成品质检Dialog-->
    <el-dialog width="50%" title="成品质检" :visible.sync="innerDialogVisible" append-to-body>
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

        <el-form-item label="序列号段">
          <el-input v-model="subInfoContent.sequenceNum"></el-input>
        </el-form-item>

        <el-form-item label="检查数量">
          <el-input v-model="subInfoContent.checkNum"></el-input>
        </el-form-item>

        <el-form-item label="通过数量">
          <el-input v-model="subInfoContent.passNum"></el-input>
        </el-form-item>

        <el-form-item label="通过率">
          <el-input v-model="subInfoContent.passRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item label="文件名称">
          <el-input v-model="subInfoContent.fileName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="文件全名称">
          <el-input v-model="subInfoContent.fileFullname" :disabled="true"></el-input>
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

      <el-row>
        <el-col :span="8">
          <el-upload drag
            class="upload-demo"
            ref="FileUpLoad"
            :action="uploadUrl"
            :limit="1"
            :file-list="upFileFileList"
            :on-exceed="handleExceed"
            :on-change="upFileChange"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">文件   <em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onButtonClick('SAVESUBDATA', null)">保存</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectAllOmgBecomeSubDataAsPage, saveOmgBecomeSubData } from '@/api/orderCompMage/OrderQuality'
import { saveOrderCompFile } from '@/api/orderCompMage/AproductionPub'
import { parseTime } from '@/utils/viewCompUtil'

export default {
  name: 'ProductionFlowOrderQualityContent',
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
        pkOmgBecomeB: null, // 成品质检子表主键
        pkOmgBecome: null, // 成品质检主表主键
        billState: '0', // 单据状态
        procedureName: '', // 工序名称
        sequenceNum: '', // 序列号段
        checkNum: null, // 检查数量
        passNum: null, // 通过数量
        passRate: null, // 合格率
        fileName: '', // 附件名称
        fileFullname: '', // 附件全名称
        chargePsn: '', // 经办人
        chargeTime: '', // 经办时间
        creator: null, // 创建人
        creatorShow: '', // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      },
      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + '/', // 上传地址

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
        this.initFileDetailsListData()
      }

      this.upFileTemp = null // 记录临时文件
      this.upFileFileList = [] // 文件存储List集合
    }
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    upFileChange(file, fileList) { // 记录工艺文件
      this.upFileTemp = file
    },
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgBecome) {
        this.listQuery = {
          page: 1,
          limit: 20
        }
        this.listQuery.pkOmgBecome = this.updateRow.pkOmgBecome
        selectAllOmgBecomeSubDataAsPage(this.listQuery).then((response) => {
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
        this.subInfoContent.pkOmgBecome = this.updateRow.pkOmgBecome
        this.innerDialogVisible = true
      }
      if (btnCode === 'DELETESUBDATA') { // 删除生产计划子表数据
        if (rowData.pkOmgBecomeB) {
          let deleteParam = {
            pkOmgBecomeB: rowData.pkOmgBecomeB,
            dr: 1
          }
          saveOmgBecomeSubData(deleteParam).then((response) => {
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
        if (rowData.pkOmgBecomeB) {
          let deleteParam = {
            pkOmgBecomeB: rowData.pkOmgBecomeB,
            billState: '2',
            chargePsn: this.userid,
            chargeTime: parseTime(new Date())
          }
          saveOmgBecomeSubData(deleteParam).then((response) => {
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
        let formData = new FormData()
        formData.append(`file`, this.upFileTemp.raw)
        formData.append(`constractNo`, this.updateRow.contractNo)
        saveOrderCompFile(formData).then((response) => {
          if (response && response.success && response.object) {
            this.subInfoContent.fileName = response.object.SALE_PROCPRODUCTION_NAME // 上传文件名称
            this.subInfoContent.fileFullname = response.object.SALE_PROCPRODUCTION_FULL_NAME // 上传文件名称
            saveOmgBecomeSubData(this.subInfoContent).then((response) => {
              if (response && response.success) {
                this.initFileDetailsListData()
                this.innerDialogVisible = false
                this.$message({ message: '操作成功', type: 'success' })
              } else {
                this.$message({ message: `操作失败:${response.message}`, type: 'error' })
              }
            })
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
        })
      }
    },
    // 刷新临时文件目录
    restSubInfoContent() {
      this.subInfoContent = {
        pkOmgBecomeB: null, // 成品质检子表主键
        pkOmgBecome: null, // 成品质检主表主键
        billState: '0', // 单据状态
        procedureName: '', // 工序名称
        sequenceNum: '', // 序列号段
        checkNum: null, // 检查数量
        passNum: null, // 通过数量
        passRate: null, // 合格率
        fileName: '', // 附件名称
        fileFullname: '', // 附件全名称
        chargePsn: '', // 经办人
        chargeTime: '', // 经办时间
        creator: this.userid, // 创建人
        creatorShow: this.name, // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      }

      this.upFileTemp = null // 记录临时文件
      this.upFileFileList = [] // 文件存储List集合
    }
  }
}
</script>

<style scoped>

</style>

