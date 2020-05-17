<template>
  <el-dialog title="图片上传" 
    :visible.sync="imageVisiable" 
    @close="closeDialog"
    width="80%">
    <el-upload drag
      class="upload-demo"
      ref="MaterielFile"
      :action="uploadUrl"
      :file-list="materielFileList"
      :limit="1"
      :on-change="materielFileChange"
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">图片文件   <em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        1: 图片必须是jpg或png格式
      </div>
    </el-upload>
    <hr/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="doUploadService">上传图片</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { savePurchaseImageFile } from '@/api/worktools/materieltool'

export default {
  name: 'Uploadmaterieldialog',
  props: ['visiable', 'handleRow', 'handleRowIndex'],
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      materielFileList: [],
      materielImageFile: null,
      imageVisiable: false,
    }
  },
  watch: {
    visiable() {
      this.imageVisiable = this.visiable
      this.restTemp()
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    materielFileChange(file) {
      this.materielImageFile = file.raw
    },
    doUploadService() {
      let handleRow = this.handleRow
      let materielImageFile = this.materielImageFile
      if (handleRow && materielImageFile) {
        let formData = new FormData()
        formData.append(`file`, materielImageFile)
        formData.append(`productCode`, handleRow.productCode)
        savePurchaseImageFile(formData).then((response) => {
          if (response.success && response.object) {
            let object = response.object
            let imageRefFilePath = object.IMAGE_REF_FILE_PATH
            let previewUrlShow = process.env.BASE_API + '/' + imageRefFilePath
            let previewUrlShowList = [previewUrlShow]

            let updateData = {
              handleRow: handleRow,
              handleRowIndex: this.handleRowIndex,
              previewUrl: imageRefFilePath,
              previewUrlShow: previewUrlShow,
              previewUrlShowList: previewUrlShowList
            }
            this.$emit('close', updateData)
          }
        })
      }
    },
    restTemp() {
      this.materielFileList = []
      this.materielImageFile = null
    }
  }
}
</script>

<style>

</style>