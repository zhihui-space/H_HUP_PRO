<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="120px">
      <el-form-item label="关联订单产品" prop="pkProductOrderB">
        <el-select v-model="temp.pkProductOrderB" placeholder="请选择" :disabled="true">
          <el-option
            v-for="item in orderBProductSelOptions"
            :key="item.pkProductOrderB"
            :label="`${item.pkProductOrderB}-${item.name}-${item.code}`"
            :value="item.pkProductOrderB">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="质检数量" prop="qualityNum">
        <el-input v-model="temp.qualityNum"></el-input>
      </el-form-item>
      <el-form-item label="质检说明" prop="memo">
        <el-input v-model="temp.memo"></el-input>
      </el-form-item>
      <el-form-item label="附件名称" prop="fileName">
        <el-input v-model="temp.fileName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="经办人" prop="chargePsn">
        <el-input v-model="temp.chargePsn" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="经办时间" prop="chargeTime">
        <el-input v-model="temp.chargeTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单据状态" prop="billState">
        <el-input v-model="temp.billState" :disabled="true"></el-input>
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
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum } from '@/utils/viewCompUtil'
import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage"
import { updateOmgMaterielQuality } from '@/api/orderCompMage/OrderMaterialQc'
import { saveOrderCompFile } from '@/api/orderCompMage/AproductionPub'

export default {
  name: 'ProductionFlowOrderMaterialQcContent',
  props: ["replace", "title", "visiable", 'action', 'updateRow', 'pkProductOrder'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      orderBProductSelOptions: [ // 选择关联订单字表数据

      ],
      temp: {
        pkOmgMaterielQuality: undefined, // 来料质检主键 
        pkProductOrderB: null, // 合同子表主键 
        qualityNum: null, // 质检数量 
        billState: '', // 单据状态
        memo: '', // 备注
        fileName: '', // 文件名称
        fileFullname: '', // 文件全路径名称
        chargePsn: '', // 经办人
        chargeTime: '', // 经办时间
        creator: '', // 创建人 
        creationtime: parseTime(new Date()), // 创建时间 
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      },

      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + '/', // 上传地址
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.title === '录入') {
        this.restTemp()
      }
      if (this.title === '修改' && this.updateRow) {
        this.temp = this.updateRow
      }
      
      if (this.visiable === true) { // 每次打开重新加载当前选择订单的字表数据信息
        this.initOrderBProductListInfo()
      }
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
    // 加载当前选择订单的字表数据信息
    initOrderBProductListInfo() {
      if (this.pkProductOrder) {
        let initQueryParam = {
          pkProductOrder: this.pkProductOrder
        }
        selectOrderInfoAsRef(initQueryParam).then((response) => {
          if (response && response.success && response.object) {
            this.orderBProductSelOptions = response.object[0].orderCompMageProductPoList
          } else {
            this.orderBProductSelOptions = []
          }
        })
      }
    },
    sureDialog() { // 确定保存回调Dialog
      let formData = new FormData()
      formData.append(`file`, this.upFileTemp.raw)
      formData.append(`constractNo`, this.updateRow.contractNo)
      saveOrderCompFile(formData).then((response) => {
        if (response && response.success && response.object) {
          let saveParam = {
            pkOmgMaterielQuality: this.temp.pkOmgMaterielQuality,
            fileName: response.object.SALE_PROCPRODUCTION_NAME,
            fileFullname: response.object.SALE_PROCPRODUCTION_FULL_NAME,
            qualityNum: this.temp.qualityNum,
            memo: this.temp.memo
          }
          updateOmgMaterielQuality(saveParam).then((response) => {
            if (response.success) {
              this.$emit('close', null)
              this.$message({ message: '操作成功', type: 'success' })
            } else {
              this.$message({ message: `操作失败:${response.message}`, type: 'error' })
            }
          })
        } else {
          this.$message({ message: `操作失败:${response.message}`, type: 'error' })
        }
      })
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkOmgMaterielQuality: undefined, // 来料质检主键 
        pkProductOrderB: null, // 合同子表主键 
        qualityNum: null, // 质检数量 
        billState: '', // 单据状态
        memo: '', // 备注
        fileName: '', // 文件名称
        fileFullname: '', // 文件全路径名称
        chargePsn: '', // 经办人
        chargeTime: '', // 经办时间
        creator: '', // 创建人 
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

<style scoped>

</style>
