<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">

    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="120px">
      <el-form-item label="产品信息" prop="pkProductOrderB">
        <el-select v-model="temp.pkProductOrderB" multiple placeholder="请选择">
          <el-option
            v-for="item in productInfoOrderList"
            :key="item.pkProductOrderB"
            :label="`${item.productName}_${item.productCode}`"
            :value="item.pkProductOrderB">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票号" prop="lnvoiceNo">
        <el-input v-model="temp.lnvoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="billNumber">
        <el-input v-model="temp.billNumber"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="billAmount">
        <el-input v-model="temp.billAmount"></el-input>
      </el-form-item>
      <el-form-item label="文件名称" prop="fileName">
        <el-input v-model="temp.fileName"></el-input>
      </el-form-item>
      <el-form-item label="文件全路径名称" prop="fileFullname">
        <el-input v-model="temp.fileFullname"></el-input>
      </el-form-item>
      <el-form-item label="经办人" prop="chargePsn">
        <el-input v-model="temp.chargePsn" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="经办时间" prop="chargeTime">
        <el-input v-model="temp.chargeTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="creatorShow">
        <el-input v-model="temp.creatorShow" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="creationtime">
        <el-input v-model="temp.creationtime" :disabled="true"></el-input>
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
import { saveOrderCompFile } from '@/api/orderCompMage/AproductionPub'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum } from '@/utils/viewCompUtil'
import { selectAllProductOrderInfoAs } from '@/api/orderCompMage/OrderInform'

export default {
  name: 'OrderInformEditContent',
  props: ["replace", "title", "visiable", 'action', 'updateRow', 'contractNo', 'pkProductOrder'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      temp: {
        pkOmgNoticeInvoice: null,
        pkProductOrder: null,
        pkProductOrderB: '',
        billState: '',
        lnvoiceNo: '',
        billNumber: null,
        billAmount: null,
        fileName: '',
        fileFullname: '',
        chargePsn: null,
        chargeTime: '',
        creator: null,
        creatorShow: '',
        creationtime: parseTime(new Date()),
        dr: null,
        ts: parseTime(new Date())
      },

      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + '/', // 上传地址

      productInfoOrderList: []
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable == true) {
        this.initProductInfoByPkProductOrder()
      }
      if (this.title === '录入') {
        this.restTemp()
      }
      if (this.title === '修改' && this.updateRow) {
        this.temp = this.updateRow
        // 解析合同字表数据为数组 供多选组件使用
        let pkProductOrderB = this.updateRow.pkProductOrderB
        if (pkProductOrderB) {
          this.temp.pkProductOrderB = pkProductOrderB.split(',')
        }
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
    // 根据合同主键查询该合同下的所有产品信息
    initProductInfoByPkProductOrder() {
      this.productInfoOrderList = []
      if (this.pkProductOrder) {
        let initQueryParam = {
          pkProductOrder: this.pkProductOrder
        }
        selectAllProductOrderInfoAs(initQueryParam).then((response) => {
          if (response && response.success && response.object) {
            this.productInfoOrderList = response.object
          }
        })
      }
    },
    sureDialog() { // 确定保存回调Dialog
      let actTemp = this.temp
      actTemp.pkProductOrder = this.pkProductOrder
      if (this.action) {
        initReplaceUpdateData(actTemp, this.replace)
        if (this.upFileTemp != null) {
          let formData = new FormData()
          formData.append(`file`, this.upFileTemp.raw)
          formData.append(`constractNo`, this.contractNo)
          saveOrderCompFile(formData).then((response) => {
            if (response && response.success && response.object) {
              actTemp.fileName = response.object.SALE_PROCPRODUCTION_NAME
              actTemp.fileFullname = response.object.SALE_PROCPRODUCTION_FULL_NAME

              // 转义pkProductOrderB
              if (actTemp.pkProductOrderB && actTemp.pkProductOrderB.length > 0) {
                let pkProductOrderBStr = ''
                actTemp.pkProductOrderB.forEach((element) => {
                  if (element) {
                    pkProductOrderBStr = pkProductOrderBStr + element + ','
                  }
                })
                if (pkProductOrderBStr && pkProductOrderBStr.endsWith(',')) {
                  pkProductOrderBStr = pkProductOrderBStr.substring(0, pkProductOrderBStr.length - 1)
                }
                actTemp.pkProductOrderB = pkProductOrderBStr
              }
              this.action(actTemp).then((response) => {
                if (response.primary) {
                  actTemp.pkOmgNoticeInvoice = response.primary
                }
                if (response.success) {
                  initReplaceAddData(actTemp, this.replace)
                  this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
                  this.$message({ message: '操作成功', type: 'success' })
                  this.$emit('close', actTemp)
                } else {
                  this.$message({ message: `操作失败:${response.message}`, type: 'error' })
                }
              })
            }
          })
        }
        
        if (this.upFileTemp === null) {
          this.action(actTemp).then((response) => {
            if (response.primary) {
              actTemp.pkOmgNoticeInvoice = response.primary
            }
            if (response.success) {
              initReplaceAddData(actTemp, this.replace)
              this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
              this.$message({ message: '操作成功', type: 'success' })
              this.$emit('close', actTemp)
            } else {
              this.$message({ message: `操作失败:${response.message}`, type: 'error' })
            }
          })
        }
        
      }
      
      this.$emit('close', actTemp)
    },
    restTemp() {
      this.temp = {
        pkOmgNoticeInvoice: null,
        pkProductOrder: null,
        pkProductOrderB: '',
        billState: '0',
        lnvoiceNo: '',
        billNumber: null,
        billAmount: null,
        fileName: '',
        fileFullname: '',
        chargePsn: null,
        chargeTime: '',
        creator: null,
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        dr: null,
        ts: parseTime(new Date())
      }
    }
  }
}
</script>


<style>

</style>
    