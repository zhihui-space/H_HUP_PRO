<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="70%">
    <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules"  label-position="left" label-width="120px">
      <!--基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="客户编号" prop="customerCode">
            <el-input v-model="temp.customerCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品编号" prop="productCode">
            <el-input v-model="temp.productCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="temp.productName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品型号" prop="productModel">
            <el-input v-model="temp.productModel" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="订单数量" prop="productNum">
            <el-input v-model="temp.productNum" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="物料来源" prop="productMaterialSource">
            <el-select v-model="temp.productMaterialSource" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="钢网来源" prop="productSteelMeshSource">
            <el-select v-model="temp.productSteelMeshSource" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="销售负责人" prop="pkPsndoc">
            <el-select v-model="temp.pkPsndoc" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in psndocOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          
        </el-tab-pane>
      </el-tabs>

      <br/>
      <el-form-item label="PCB" prop="ispcb" label-width="200px">
        <el-switch v-model="temp.ispcb" active-value="是" inactive-value="否" :disabled="true"></el-switch>
      </el-form-item>

      <!--PCB参数-->
      <el-tabs type="border-card" v-if="temp.ispcb === '是' ? true : false">
        <el-tab-pane label="PCB参数">
          
          <el-form-item label="PCB来源" prop="pcbSource">
            <el-select v-model="temp.pcbSource" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="板子厚度" prop="pcbThick">
            <el-select v-model="temp.pcbThick" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbThickOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻焊颜色" prop="pcbResistColor">
            <el-select v-model="temp.pcbResistColor" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbResistColorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="字符颜色" prop="pcbCharColor">
            <el-select v-model="temp.pcbCharColor" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbCharColorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻焊覆盖" prop="pcbResistCover">
            <el-select v-model="temp.pcbResistCover" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbResistCoverOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="焊盘喷镀" prop="pcbPadSpary">
            <el-select v-model="temp.pcbPadSpary" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbPadSparyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="铜厚" prop="pcbCopperThick">
            <el-select v-model="temp.pcbCopperThick" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbCopperThick"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

      <!--报价信息-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="报价信息">
          <el-form-item label="报价有效日期" prop="quoteEndDate">
            <el-date-picker v-model="temp.quoteEndDate" type="date" placeholder="选择日期" @change="dateFormat()" :disabled="title!='采购报价'"></el-date-picker>
          </el-form-item>

          <el-form-item label="物料成本单价" prop="purchasePrice">
            <el-input v-model="temp.purchasePrice" @change="priceCount('single')" :disabled="title!='采购报价'"></el-input>
          </el-form-item>

          <el-form-item label="物料成本总价" prop="purchaseTotal">
            <el-input v-model="temp.purchaseTotal" @change="priceCount('sum')" :disabled="title!='采购报价'"></el-input>
          </el-form-item>

          <el-form-item label="PCB成本单价" prop="productPcbPrice">
            <el-input v-model="temp.productPcbPrice" @change="pcbPriceCount('single')" :disabled="temp.ispcb != '是' || title!='采购报价'"></el-input>
          </el-form-item>

          <el-form-item label="PCB成本总价" prop="productPcbTotal">
            <el-input v-model="temp.productPcbTotal" @change="pcbPriceCount('sum')" :disabled="temp.ispcb != '是' || title!='采购报价'"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br/>
      <el-form-item label="物料信息" prop="showMaterielData" label-width="200px">
        <el-switch v-model="showMaterielData"></el-switch>
      </el-form-item>
      <el-tabs type="border-card" v-if="showMaterielData">
        <el-tab-pane label="物料信息">
          <el-table
          :data="temp.materielPoList"
          border
          style="width: 100%">
          <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
          <el-table-column prop="pkProduct" v-if="false"></el-table-column>
          <el-table-column prop="pkPurchaseQuote" v-if="false"></el-table-column>
          <el-table-column label="序号" prop="rowNum" width="120"></el-table-column>
          <el-table-column label="物料类型" prop="itemType" width="120"></el-table-column>
          <el-table-column label="型号" prop="model" width="120"></el-table-column>
          <el-table-column label="物料名称" prop="materialName" width="120"></el-table-column>
          <el-table-column label="存货全名" prop="materialFullname" width="120"></el-table-column>
          <el-table-column label="存货型号" prop="potting" width="120"></el-table-column>
          <el-table-column label="存货规格" prop="norms" width="120"></el-table-column>
          <el-table-column label="位号" prop="placeNumber" width="120"></el-table-column>
          <el-table-column label="焊点数" prop="weldingNumber" width="120"></el-table-column>
          <el-table-column label="备注" prop="memo" width="120"></el-table-column>
          <el-table-column label="品牌" prop="brand" width="120"></el-table-column>
          <el-table-column label="单位" prop="usegUnit" width="120"></el-table-column>
          <el-table-column label="用量" prop="usageNum" width="120"></el-table-column>
          <el-table-column label="总用量" prop="usageTotal" width="120"></el-table-column>
          <el-table-column label="配料数量" prop="batchingNumber" width="120"></el-table-column>
          <el-table-column label="领料数量" prop="pickingNumber" width="120"></el-table-column>
          <el-table-column label="退料数量" prop="backingNumber" width="120"></el-table-column>
          <el-table-column label="采购单价" prop="purchaseUnitPrice" width="120"></el-table-column>
          <el-table-column label="采购总价" prop="purchaseTotalPrice" width="120"></el-table-column>
          
          <el-table-column label="图片预览" prop="itemType" width="100">
            <template slot-scope="scope">
              <div class="demo-image__preview">
                <el-image 
                  style="width: 80px; height: 80px"
                  :src="scope.row.previewUrlShow"
                  :preview-src-list="scope.row.previewUrlListShow">
                </el-image>
              </div>
            </template>
          </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!--单据信息-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="单据信息">
          
          <el-form-item label="单据状态" prop="billState">
            <el-select v-model="temp.billState" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in billStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审批人" prop="approverShow">
            <el-input v-model="temp.approverShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="审批时间" prop="approvetime">
            <el-input v-model="temp.approvetime" :disabled="true"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>


    <!--附件管理Controller-->
    <br/>
    <el-tabs type="border-card">
      <el-tab-pane label="附件上传">
        <el-row>
          <el-col :span="8">
            <el-upload drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="PURFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="PURFileChange"
              :before-remove="PURFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false"
              :disabled="title == '查看'">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">采购报价文件   <em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                1: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <!--BOM、PCB、工艺文件下载-->
        <hr/>
        <!--BOM文件-->
        <el-col :span="8">
          <el-upload drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="BOMFileList"
            :on-preview="downloadProccessFile"
            :limit="1"
            :auto-upload="false"
            :disabled="true">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">BOM文件</div>
          </el-upload>
        </el-col>
        <!--PCB文件-->
        <el-col :span="8">
          <el-upload drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="PCBFileList"
            :on-preview="downloadProccessFile"
            :limit="1"
            :auto-upload="false"
            :disabled="true">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">PCB文件</div>
          </el-upload>
        </el-col>
        <!--工艺文件-->
        <el-col :span="8">
          <el-upload drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="GONGYIFileList"
            :on-preview="downloadProccessFile"
            :limit="1"
            :auto-upload="false"
            :disabled="true">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">工艺文件</div>
          </el-upload>
        </el-col>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" v-if="title!='查看'">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'
import { savePurchaseFile } from '@/api/purchase/quote'
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { downloadProductFile } from '@/api/pub/pub'

export default {
  name: 'Purchasequotecontent',
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns'
    ])
  },
  data() {
    // 整数类型校验
    let checkNumberAsInt = (rule, value, callback) => {
      if (value || isNaN(value)) {
        let numVal = Number.parseInt(value)
        if (value && Number.isFinite(numVal)) {
          callback()
        } else {
          return callback(new Error('订单数量必须为数字类型'))
        }
      } else {
        callback()
      }
    }
    return {
      contentVisiable: false, // dialog 显示框
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      showMaterielData: false, // 是否显示物料信息
      // BOM文件
      BOMFileList: [],
      // PCB文件
      PCBFileList: [],
      // 工艺文件
      GONGYIFileList: [],
      // 采购报价文件
      PURFileList: [],
      PURFile: null,
      temp: {
        pkPurchaseQuote: undefined,
        contractno: '',
        pkCustomer: null,
        customerCode: '',
        pkPsndoc: null,
        pkProduct: null,
        productCode: '',
        productName: '',
        productModel: '',
        productNum: null,
        productMaterialSource: '',
        productSteelMeshSource: '',
        ispcb: '否',
        pcbSource: '',
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
        pcbResistColor: '',
        pcbCharColor: '',
        pcbResistCover: '',
        pcbPadSpary: '',
        pcbCopperThick: '',
        quoteEndDate: '',
        purchasePrice: null,
        purchaseTotal: null,
        materielPoList: [],
        fileName: '',
        fileFullname: '',
        billState: 0,
        approver: '',
        approverShow: '',
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      },
      // 页面填写数据规则校验
      rules: {
        // 采购单价
        purchasePrice: [
          {required: true, message: '采购单价不能为空', trigger: 'blur' },
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 采购总价
        purchaseTotal: [
          {required: true, message: '采购总价不能为空', trigger: 'blur' },
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
      },
      materialSourceOption: [ // 物料来源
        { value: '1', label: '甲方提供' },
        { value: '2', label: '乙方提供' },
        { value: '3', label: '部分甲方提供' }
      ],
      billStateOprion: [
        { value: 0, label: '自由态' },
        { value: 1, label: '报价流程进行中' },
        { value: 2, label: '已认领' },
        { value: 3, label: '采购报价完成' },
        { value: 4, label: '工艺审核完成' },
        { value: 5, label: '生产报价完成' },
        { value: 6, label: '销售报价完成' }
      ],
      steelMeshSourceOption: [ // 钢网来源
        { value: '0', label: '无' },
        { value: '1', label: '甲方提供' },
        { value: '2', label: '乙方提供' }
      ],
      pcbThickOption: [ // 板子厚度
        { value: 0.4, label: '0.4' },
        { value: 0.6, label: '0.6' },
        { value: 0.8, label: '0.8' },
        { value: 1.0, label: '1.0' },
        { value: 1.2, label: '1.2' },
        { value: 1.6, label: '1.6' },
        { value: 2.0, label: '2.0' }
      ],
      pcbResistColorOption: [ // 阻焊颜色
        { value: '绿色', label: '绿色' },
        { value: '红色', label: '红色' },
        { value: '黄色', label: '黄色' },
        { value: '蓝色', label: '蓝色' },
        { value: '白色', label: '白色' },
        { value: '黑色', label: '黑色' }
      ],
      pcbCharColorOption: [ // 字符颜色
        { value: '白色', label: '白色' }
      ],
      pcbResistCoverOption: [ // 阻焊覆盖
        { value: '0', label: '过孔盖油' },
        { value: '1', label: '过孔开窗' }
      ],
      pcbPadSparyOption: [ // 焊盘喷镀
        { value: '0', label: '有铅喷锡' },
        { value: '1', label: '无铅喷锡' },
        { value: '2', label: '沉金' }
      ],
      pcbCopperThick: [ // 铜厚
        { value: '0', label: '1盎司' },
        { value: '1', label: '2盎司' }
      ],
      // 人员档案
      psndocOption: []
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.updateRow) {
        this.restTemp()
        this.temp = this.updateRow
        // 采购文件信息
        if (this.updateRow.fileName) {
          let purfile = { name: this.updateRow.fileName, fullName: this.updateRow.fileFullname }
          this.PURFileList = [ purfile ]
          this.PURFile = purfile
        }

        // BOM文件信息
        if (this.updateRow.bomFilename) {
          this.BOMFileList = [ {name: this.updateRow.bomFilename, fullName: this.updateRow.bomFilefullname} ]
        }
        // PCB文件信息
        if (this.updateRow.pcbFilename) {
          this.PCBFileList = [ {name: this.updateRow.pcbFilename, fullName: this.updateRow.pcbFilefullname} ]
        }
        // 工艺文件信息
        if (this.updateRow.craftFilename) {
          this.GONGYIFileList = [ {name: this.updateRow.craftFilename, fullName: this.updateRow.craftFilefullname} ]
        }

        // 预制物料信息的图片URL信息
        let tempThis = this.temp
        if (tempThis && tempThis.materielPoList) {
          let materielPoList = tempThis.materielPoList
          for (let index in materielPoList) {
            let dataOne = materielPoList[index]
            if (dataOne && dataOne.previewUrl) {
              dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl
              let previewUrlListShow = [dataOne.previewUrlShow]
              dataOne.previewUrlListShow = previewUrlListShow
            }
          }
        }
      }
    }
  },
  created() {
    // 初始人员信息参照
    listBdPsndocAsRef().then((response) => {
      this.psndocOption = response.object
      parseRefKeyInt(this.psndocOption)
    })
  },
  methods: {
    // 解析日期
    dateFormat() {
      if (this.temp.quoteEndDate) {
        this.temp.quoteEndDate = parseTime(this.temp.quoteEndDate, '{y}-{m}-{d}')
      }
    },
    priceCount(flag) {
      if (flag === 'single') {
        // 采购总价 = 采购单价 * 数量
        this.temp.purchasePrice = Number.parseFloat(this.temp.purchasePrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countPurchaseTotal = (this.temp.purchasePrice * this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.purchaseTotal = countPurchaseTotal
      }
      if (flag === 'sum') {
        // 采购单价 = 采购总价 / 数量
        this.temp.purchaseTotal = Number.parseFloat(this.temp.purchaseTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countPurchasePrice = (this.temp.purchaseTotal / this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.purchasePrice = countPurchasePrice
        if (this.temp.purchasePrice === 'Infinity') {
          this.temp.purchasePrice = 0.00
        }
      }
    },
    pcbPriceCount(flag) {
      if (flag === 'single') {
        // PCB成本总价 = PCB成本单价 * 数量
        this.temp.productPcbPrice = Number.parseFloat(this.temp.productPcbPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countProductPcbTotal = (this.temp.productPcbPrice * this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.productPcbTotal = countProductPcbTotal
      }
      if (flag === 'sum') {
        // PCB成本单价 = PCB成本总价 / 数量
        this.temp.productPcbTotal = Number.parseFloat(this.temp.productPcbTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countProductPcbPrice = (this.temp.productPcbTotal / this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.productPcbPrice = countProductPcbPrice
        if (this.temp.productPcbPrice === 'Infinity') {
          this.temp.productPcbPrice = 0.00
        }
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    PURFileChange(file, fileList) { // 记录文件变化
      this.PURFile = file
    },
    PURFileRemove(file, fileList) { // 采购报价文件删除
      this.PURFile = null
    },
    // 文件下载
    downloadProccessFile(file) {
      let fileName = file.name
      let fileFullName = file.fullName
      if (fileName && fileFullName) {
        let downLoadParma = {fileName: fileName, fileFullName: fileFullName}
        downloadProductFile(downLoadParma).then((response) => {
          const blob = response.data
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = (e) => {
            const a = document.createElement('a')
            if (fileName) {
              a.download = fileName
            } else {
              a.download = fileName
            }
            a.href = e.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          }
        })
      }
    },
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      
      let formData = new FormData()
      if (this.title === '采购报价' && this.PURFile == null) {
        this.$message.warning('上传文件不完整!请选择需要上传的文件。')
        return
      }
      formData.append(`purfile`, this.PURFile.raw)
      formData.append(`productCode`, this.temp.productCode)

      // 表单校验
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          savePurchaseFile(formData).then((response) => {
            if (response.object) {
              this.temp.fileName = response.object.PURCHASE_FILE_NAME
              this.temp.fileFullname = response.object.PURCHASE_FILE_FULL_NAME
            }

            const actTemp = this.temp
            if (this.action) {
              initReplaceUpdateData(actTemp, this.replace)
              this.action(actTemp).then((response) => {
                if (response.primary) {
                  actTemp.pkProvince = response.primary
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
        } else {
          this.$message.warning('表单验证未通过!')
          return false
        }
      })
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkPurchaseQuote: undefined,
        contractno: '',
        pkCustomer: null,
        customerCode: '',
        pkPsndoc: null,
        pkProduct: null,
        productCode: '',
        productName: '',
        productModel: '',
        productNum: null,
        productMaterialSource: '',
        productSteelMeshSource: '',
        ispcb: '否',
        pcbSource: '',
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
        pcbResistColor: '',
        pcbCharColor: '',
        pcbResistCover: '',
        pcbPadSpary: '',
        pcbCopperThick: '',
        quoteEndDate: '',
        purchasePrice: null,
        purchaseTotal: null,
        materielPoList: [],
        fileName: '',
        fileFullname: '',
        billState: 0,
        approver: '',
        approverShow: '',
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      }
      this.PURFileList = []
      this.PURFile = null
      this.showMaterielData = false
    }
  }
}
</script>

<style>

</style>
