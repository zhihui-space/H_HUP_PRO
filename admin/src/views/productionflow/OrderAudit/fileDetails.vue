<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-row>
      <el-button type="primary" @click=" () => { 
        innerDialogVisible = true 
        restUploadTempFile()
      }">新增</el-button>
      <el-table :data="fileDetailsList" border style="width: 100%">
        <el-table-column prop="pkOmgTechnicsB" label="文件信息主键" v-if="false" width="180">
        </el-table-column>
        <el-table-column prop="pkOmgTechnics" label="工艺审核主表主键" v-if="false" width="180">
        </el-table-column>
        <el-table-column prop="receiver" label="接收人" width="180">
        </el-table-column>
        <el-table-column prop="state" label="确认状态" width="180" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" width="180">
        </el-table-column>
        <el-table-column prop="fileFullname" label="文件全路径名称" v-if="false" width="180">
        </el-table-column>
        <el-table-column prop="fileType" label="文件类型" width="180">
        </el-table-column>
        <el-table-column prop="creationtime" label="上传时间" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.state == 0" @click="handleUpdateFileDetails({
              pkOmgTechnicsB: scope.row.pkOmgTechnicsB,
              state: 2
            })">确认</el-button>
            <el-button type="text" size="small" v-if="scope.row.state == 0 " @click="handleUpdateFileDetails(
              {
                pkOmgTechnicsB: scope.row.pkOmgTechnicsB,
                dr: 1
              }
            )">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--新增文件上传Dialog-->
    <el-dialog width="50%" title="新增文件上传" :visible.sync="innerDialogVisible" append-to-body>
      <el-form ref="form" :model="uploadFileTemp" label-position="left" label-width="120px" :inline="true">
        <el-form-item label="文件名称">
          <el-input v-model="uploadFileTemp.fileName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="文件全路径名称">
          <el-input v-model="uploadFileTemp.fileFullname" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="接收人">
          <el-select v-model="uploadFileTemp.receiver" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in userInfoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文件类型">
          <el-input v-model="uploadFileTemp.fileType"></el-input>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSaveOrderAuditFile">保存上传</el-button>
        <el-button @click="innerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectOrderTechnicsFileDetails, saveOrderTechnicsBFile, updateTechnicsSubData } from '@/api/orderCompMage/OrderAudit'
import { saveOrderCompFile } from '@/api/orderCompMage/AproductionPub'
import { listUserInfoAsRef } from '@/api/rbac/smuser'

export default {
  name: 'ProductionFlowOrderAuditFileDetails',
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

      innerDialogVisible: false, // 内层上传文件Dialog
      uploadFileTemp: { // 上传文件临时Temp
        pkOmgTechnics: null, // 工艺审核主表主键
        receiver: '', // 接收人
        fileName: '', // 文件名称
        fileFullname: '', // 文件全路径名称
        fileType: '', // 文件类型
        creationtime: '' // 创建时间
      },
      userInfoOptions: [], // 人员集合
      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + '/', // 上传地址
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable === true) {
        this.initFileDetailsListData()
        this.initUserOptions()
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
    // 保存新增工艺审核文件 
    handleSaveOrderAuditFile() {
      let formData = new FormData()
      formData.append(`file`, this.upFileTemp.raw)
      formData.append(`constractNo`, this.updateRow.contractNo)
      saveOrderCompFile(formData).then((response) => {
        if (response && response.success && response.object) {
          this.uploadFileTemp.fileName = response.object.SALE_PROCPRODUCTION_NAME // 上传文件名称
          this.uploadFileTemp.fileFullname = response.object.SALE_PROCPRODUCTION_FULL_NAME // 上传文件名称

          this.uploadFileTemp.pkOmgTechnics = this.updateRow.pkOmgTechnics
          this.uploadFileTemp.pkProduct = this.updateRow.pkProduct // 产品主键
          saveOrderTechnicsBFile(this.uploadFileTemp).then((response) => {
            if (response && response.success) {
              this.$message({ message: '操作成功', type: 'success' })
              this.innerDialogVisible = false
              this.initFileDetailsListData()
            } else {
              this.$message({ message: `操作失败:${response.message}`, type: 'error' })
            }
          })
        } else {
          this.$message({ message: `操作失败:${response.message}`, type: 'error' })
        }
      })
    },
    // 查询经办人参照数据
    initUserOptions() {
      listUserInfoAsRef({dr: 0}).then((response) => {
        if (response && response.success && response.object) {
          this.userInfoOptions = response.object
        }
      })
    },
    // 根据主键更新工艺子表主键
    handleUpdateFileDetails(updateParam) {
      updateTechnicsSubData(updateParam).then((response) => {
        if (response && response.success) {
          this.$message({ message: '操作成功', type: 'success' })
          this.initFileDetailsListData()
        } else {
          this.$message({ message: `操作失败:${response.message}`, type: 'error' })
        }
      })
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgTechnics) {
        let initQueryParam = {
          pkOmgTechnics: this.updateRow.pkOmgTechnics
        }
        selectOrderTechnicsFileDetails(initQueryParam).then((response) => {
          if (response && response.success) {
            this.fileDetailsList = response.object
          } else {
            this.fileDetailsList = []
          }
        })
      }
    },
    // 转义工艺审核字表状态
    stateFormatter(row, column) {
      if (row.state === '-1') { return '产品自带' }
      if (row.state === '0') { return '自由态' }
      if (row.state === '1') { return '确认中' }
      if (row.state === '2') { return '确认完成' }
    },
    restUploadTempFile() { // 新增重置文件上传描述信息Temp
      this.upFileTemp = null
      this.upFileFileList = []
      // 上传文件临时Temp
      this.uploadFileTemp = {
        pkOmgTechnics: null, // 工艺审核主表主键
        receiver: '', // 接收人
        fileName: '', // 文件名称
        fileFullname: '', // 文件全路径名称
        fileType: '', // 文件类型
        creationtime: '' // 创建时间
      }
    }
  }
}
</script>

<style scoped>

</style>

