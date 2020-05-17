<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">

    <el-button type="primary" @click="onButtonClick('ADDSUBDATA', null)">录入</el-button>
    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column prop="pkOmgPrduFinishPutoutB" label="成品出库子表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="pkOmgPrduFinishPutout" label="成品出库主表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="90">
      </el-table-column>
      <el-table-column prop="sequenceNum" label="序列号段" width="100">
      </el-table-column>
      <el-table-column prop="putoutNum" label="出库数量" width="100">
      </el-table-column>
      <el-table-column prop="putoutTotalNum" label="累计出库数量" width="100">
      </el-table-column>
      <el-table-column prop="fileName" label="附件名称" width="180">
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

    <!--新增成品出库Dialog-->
    <el-dialog width="50%" title="新增成品出库" :visible.sync="innerDialogVisible" append-to-body>
      <el-form ref="form" :model="subInfoContent" label-width="120px" :inline="true">
        <el-form-item label="工序名称">
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

        <el-form-item label="出库数量">
          <el-input v-model="subInfoContent.putoutNum"></el-input>
        </el-form-item>

        <el-form-item label="累计出库数量">
          <el-input v-model="subInfoContent.putoutTotalNum"></el-input>
        </el-form-item>

        <el-form-item label="附件名称">
          <el-input v-model="subInfoContent.fileName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="附件全名称">
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
import { selectAllOmgPrduFinishPutoutSubDataAsPage, saveOmgPrduFinishPutoutSubData } from '@/api/orderCompMage/OrderCome'
import { saveOrderCompFile } from '@/api/orderCompMage/AproductionPub'
import { parseTime } from '@/utils/viewCompUtil'

export default {
  name: 'ProductionFlowOrderComeContent',
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

      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        pkOmgPrduFinishPutoutB: null, // 成品出库子表主键
        pkOmgPrduFinishPutout: null, // 成品出库主表主键
        billState: '0', // 单据状态
        procedureName: '', // 工序类型
        sequenceNum: '', // 序列号段
        putoutNum: '', // 出库数量
        putoutTotalNum: '', // 累计出库数量
        fileName: '', // 文件名称
        fileFullname: '', // 文件全名称
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
      if (this.updateRow && this.updateRow.pkOmgPrduFinishPutout) {
        this.listQuery = {
          page: 1,
          limit: 20
        }
        this.listQuery.pkOmgPrduFinishPutout = this.updateRow.pkOmgPrduFinishPutout
        selectAllOmgPrduFinishPutoutSubDataAsPage(this.listQuery).then((response) => {
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
        this.subInfoContent.pkOmgPrduFinishPutout = this.updateRow.pkOmgPrduFinishPutout
        this.innerDialogVisible = true
      }
      if (btnCode === 'DELETESUBDATA') { // 删除生产计划子表数据
        if (rowData.pkOmgPrduFinishPutoutB) {
          let deleteParam = {
            pkOmgPrduFinishPutoutB: rowData.pkOmgPrduFinishPutoutB,
            dr: 1
          }
          saveOmgPrduFinishPutoutSubData(deleteParam).then((response) => {
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
        if (rowData.pkOmgPrduFinishPutoutB) {
          let deleteParam = {
            pkOmgPrduFinishPutoutB: rowData.pkOmgPrduFinishPutoutB,
            billState: '2',
            chargePsn: this.userid,
            chargeTime: parseTime(new Date())
          }
          saveOmgPrduFinishPutoutSubData(deleteParam).then((response) => {
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
            saveOmgPrduFinishPutoutSubData(this.subInfoContent).then((response) => {
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
        pkOmgPrduFinishPutoutB: null, // 成品出库子表主键
        pkOmgPrduFinishPutout: null, // 成品出库主表主键
        billState: '0', // 单据状态
        procedureName: '', // 工序类型
        sequenceNum: '', // 序列号段
        putoutNum: '', // 出库数量
        putoutTotalNum: '', // 累计出库数量
        fileName: '', // 文件名称
        fileFullname: '', // 文件全名称
        chargePsn: '', // 经办人
        chargeTime: '', // 经办时间
        creator: null, // 创建人
        creatorShow: '', // 创建人
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

