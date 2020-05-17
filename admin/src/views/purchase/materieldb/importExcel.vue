<template>
  <el-dialog title="导入物料信息" 
    v-loading="importLoading"
    element-loading-text="上传中..."
    :visible.sync="importVisiable"
    @close="closeDialog"
    width="70%">
    <el-upload
      class="upload-demo"
      :limit="1"
      :action="uploadUrl"
      :file-list="fileList"
      :on-change="handleChange"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { resolvMaterielDataBaseExcelData } from '@/api/purchase/materieldb'

export default {
  name: 'Importmaterieldatabase',
  props: ['visiable'],
  data() {
    return {
      fileList: [],
      importFile: null,
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      importVisiable: false,
      importLoading: false, // 控制加载中
    }
  },
  watch: {
    visiable() {
      this.importVisiable = this.visiable
      this.restTemp()
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
      this.$emit('refreshList', null)
    },
    submitUpload() {
      this.importLoading = true
      let formData = new FormData()
      formData.append(`file`, this.importFile)
      resolvMaterielDataBaseExcelData(formData).then((response) => {
        if (response.success) {
          this.$message({ type: 'success', message: '导入完成!' })
        } else {
          this.$message({ type: 'warning', message: '导入失败!' })
        }
        this.importLoading = false
      })
    },
    handleChange(file) {
      this.importFile = file.raw
    },
    restTemp() {
      this.fileList = []
      this.importFile = null
    }
  }
}
</script>

<style>

</style>