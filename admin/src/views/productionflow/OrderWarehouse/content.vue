<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="120px">
      <el-form-item label="文件名称" prop="fileName">
        <el-input v-model="temp.fileName"></el-input>
      </el-form-item>
      <el-form-item label="文件全路径名称" prop="fileFullname">
        <el-input v-model="temp.fileFullname"></el-input>
      </el-form-item>
      <el-form-item label="单据状态" prop="billState">
        <el-select v-model="temp.billState" clearable placeholder="请选择" :disabled="true">
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

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSaveWarehouseFile">保存上传</el-button>
      <el-button @click="innerDialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum } from '@/utils/viewCompUtil'
import { saveOrderCompFile } from '@/api/orderCompMage/AproductionPub'
import { updateMaterielWareHouse } from '@/api/orderCompMage/OrderWarehouse'

export default {
  name: 'OrderWarehouseContent',
  props: ["replace", "title", "visiable", 'updateRow'],
  computed: {
    ...mapGetters([
      'columns', 'name', 'userid'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      temp: {
        pkOmgWareHouse: null, // 库房备料主键
        pkProductOrderB: null, // 订单子表主键
        billState: '0', // 单据状态
        fileName: '', // 文件名称
        fileFullname: '', // 文件全路径名称
        creator: this.userid, // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      },

      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + '/', // 上传地址

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
      this.temp = this.updateRow

      this.upFileTemp = null
      this.upFileFileList = []
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
    handleSaveWarehouseFile() { // 保存库房备料附件
      let formData = new FormData()
      formData.append(`file`, this.upFileTemp.raw)
      formData.append(`constractNo`, this.updateRow.contractNo)
      saveOrderCompFile(formData).then((response) => {
        if (response && response.success && response.object) {
          let saveParam = {
            pkOmgWareHouse: this.temp.pkOmgWareHouse,
            fileName: response.object.SALE_PROCPRODUCTION_NAME,
            fileFullname: response.object.SALE_PROCPRODUCTION_FULL_NAME
          }
          updateMaterielWareHouse(saveParam).then((responseT) => {
            if (responseT && responseT.success) {
              this.$message({ message: '操作成功', type: 'success' })
              this.$emit('close', null)
            } else {
              this.$message({ message: `操作失败:${responseT.message}`, type: 'error' })
            }
          })
        } else {
          this.$message({ message: `操作失败:${response.message}`, type: 'error' })
        }
      })
    },
    restTemp() {
      this.temp = {
        pkOmgWareHouse: null, // 库房备料主键
        pkProductOrderB: null, // 订单子表主键
        billState: '0', // 单据状态
        fileName: '', // 文件名称
        fileFullname: '', // 文件全路径名称
        creator: this.userid, // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      }
      this.upFileTemp = null
      this.upFileFileList = []
    }
  }
}
</script>

<style>

</style>
