<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">
    <el-form :inline="true" ref="dataForm" :disabled="title=='查看'" :model="temp" :rules="rules" label-position="left" label-width="150px">
      <!--产品基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="客户编码" prop="customerCode">
            <el-input v-model="temp.customerCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品编码" prop="productCode">
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

          <el-form-item label="物料来源" prop="materialSource">
            <el-select v-model="temp.materialSource" placeholder="请选择" :disabled="true">
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

        </el-tab-pane>
      </el-tabs>

      <!--生产报价-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="生产报价">
          <el-tag>工序报价</el-tag>
          <el-table :data="temp.billProduceQuoteBPoList" show-summary>
            <el-table-column prop="pkProduceQuoteB" v-if="false"></el-table-column>
            <el-table-column prop="ismodel" v-if="false"></el-table-column>
            <el-table-column prop="type" label="工序类别" width="160"></el-table-column>
            <el-table-column prop="param" label="工序参数" width="160"></el-table-column>
            <el-table-column prop="unitPriceOut" label="外协工序单价" width="160"></el-table-column>
            <el-table-column prop="unitTotalPriceOut" label="外协工序总价" width="160"></el-table-column>
            <el-table-column prop="unitTotalOut" label="外协订单合计" width="160"></el-table-column>

            <el-table-column label="销售工序单价" prop="unitPriceSale" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.unitPriceSale" @change="gongxuChange(scope.row, '1')"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="unitTotalPriceSale" label="销售工序总价" width="160"></el-table-column>

            <el-table-column label="销售订单合计" prop="unitTotalSale" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.unitTotalSale" @change="gongxuChange(scope.row, '2')"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <br/>
          <el-tag>制具报价</el-tag>
          <el-table :data="temp.modelQuoteBPoList" show-summary>
            <el-table-column prop="pkProduceQuoteB" v-if="false"></el-table-column>
            <el-table-column prop="ismodel" v-if="false"></el-table-column>
            <el-table-column prop="type" label="工序类别" width="180"></el-table-column>
            <el-table-column prop="param" label="单价" width="180"></el-table-column>
            <el-table-column prop="unitPriceOut" label="数量" width="180"></el-table-column>
            <el-table-column prop="unitTotalPriceOut" label="总价" width="180"></el-table-column>

            <el-table-column label="销售制具报价" prop="unitTotalSale" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.unitTotalSale" @change="zhijuChange(scope.row)"></el-input>
              </template>
            </el-table-column>
          </el-table>

          <br/>
          <el-tag>特殊工艺</el-tag>
          <el-table :data="temp.specialQuoteBPoList" show-summary>
            <el-table-column prop="pkProduceQuoteB" v-if="false"></el-table-column>
            <el-table-column prop="ismodel" v-if="false"></el-table-column>
            <el-table-column prop="type" label="报价项" width="180"></el-table-column>

            <el-table-column label="单板收费" prop="param" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.param" @change="specialChange(scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="unitTotalPriceOut" label="总价" width="180"></el-table-column>

            <el-table-column label="备注" prop="memo" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.memo"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!--采购报价-->
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="销售物料报价">
          <el-form-item label="报价有效日期" prop="quoteEndDate">
            <el-date-picker v-model="temp.billPurchaseQuotePo.quoteEndDate" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
          </el-form-item>

          <el-form-item label="物料成本单价" prop="purchasePrice">
            <el-input v-model="temp.billPurchaseQuotePo.purchasePrice" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="物料成本总价" prop="purchaseTotal">
            <el-input v-model="temp.billPurchaseQuotePo.purchaseTotal" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="物料销售单价" prop="billPurchaseQuotePo.purchasePriceSale">
            <el-input v-model="temp.billPurchaseQuotePo.purchasePriceSale" @change="priceCount('single')"></el-input>
          </el-form-item>

          <el-form-item label="物料销售总价" prop="billPurchaseQuotePo.purchaseTotalSale">
            <el-input v-model="temp.billPurchaseQuotePo.purchaseTotalSale" @change="priceCount('sum')"></el-input>
          </el-form-item>

          <br/>
          <el-form-item label="PCB成本单价" prop="productPcbPrice">
            <el-input v-model="temp.billPurchaseQuotePo.productPcbPrice" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="PCB成本总价" prop="productPcbTotal">
            <el-input v-model="temp.billPurchaseQuotePo.productPcbTotal" :disabled="true"></el-input>
          </el-form-item>

          <br/>
          <el-form-item label="PCB成本销售单价" prop="billPurchaseQuotePo.productPcbPriceSale">
            <el-input v-model="temp.billPurchaseQuotePo.productPcbPriceSale" @change="pcbPriceCount('single')"></el-input>
          </el-form-item>

          <el-form-item label="PCB成本销售总价" prop="billPurchaseQuotePo.productPcbTotalSale">
            <el-input v-model="temp.billPurchaseQuotePo.productPcbTotalSale" @change="pcbPriceCount('sum')"></el-input>
          </el-form-item>
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
      <el-tab-pane label="文件信息">
        <el-row>
          <!--采购报价文件-->
          <el-col :span="8">
            <el-upload drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="PURFileList"
              :on-preview="downloadProccessFile"
              :limit="1"
              :auto-upload="false"
              :disabled="true">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">采购物料报价文件   <em>点击上传</em></div>
            </el-upload>
          </el-col>
          <!--物料报价文件-->
          <el-col :span="8">
            <el-upload drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="MATTERFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="MATTERFileChange"
              :on-preview="downloadProccessFile"
              :before-remove="MATTERFileRemove"
              :auto-upload="false"
              :disabled="title == '查看'">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">销售物料报价文件   <em>点击上传</em></div>
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

    <br/>
    <el-form>
      <el-form-item label="物料信息" prop="showMaterielData" label-width="200px">
        <el-switch v-model="showMaterielData"></el-switch>
      </el-form-item>
      <el-tabs type="border-card" v-if="showMaterielData">
        <el-button icon="el-icon-success" @click="saveMaterielData()">保存</el-button>
        <hr/>
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
          <el-table-column label="销售单价" prop="saleUnitPrice" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.saleUnitPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="销售总价" prop="saleTotalPrice" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.saleTotalPrice"></el-input>
            </template>
          </el-table-column>
          
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
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" v-if="title!='查看'">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum } from '@/utils/viewCompUtil'
import { updateBatchProduceQuoteB } from '@/api/produce/quote'
import { updatePurchaseQuoteFunc } from '@/api/purchase/quote'
import { updateSaleQuote, saveMatterFile } from '@/api/salemage/salequote'
import { downloadProductFile } from '@/api/pub/pub'
import { selectPurchaseMaterielByPkProduct } from '@/api/technics/tecaudit'
import { savePurchaseMaterielPo } from '@/api/worktools/materieltool'

export default {
  name: 'Salequotecontent',
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
          return callback(new Error('必须为数字类型'))
        }
      } else {
        callback()
      }
    }
    return {
      contentVisiable: false, // dialog 显示框
      showMaterielData: false, // 是否显示物料信息
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      // BOM文件
      BOMFileList: [],
      // PCB文件
      PCBFileList: [],
      // 工艺文件
      GONGYIFileList: [],
      // 采购报价文件
      PURFileList: [],
      PURFile: null,
      // 销售物料报价文件
      MATTERFileList: [],
      MATTERFile: null,
      temp: {
        pkSaleQuote: undefined,
        // 基本信息
        pkCustomer: null,
        customerCode: '',
        pkProduct: null,
        productCode: '',
        productName: '',
        productModel: '',
        productNum: null,
        materialSource: '',
        productSteelMeshSource: '',
        // 生产报价
        billProduceQuoteBPoList: [],
        // 制具报价
        modelQuoteBPoList: [],
        // 特殊工艺
        specialQuoteBPoList: [],
        // 采购报价
        billPurchaseQuotePo: {
          pkPurchaseQuote: null,
          quoteEndDate: '',
          purchasePrice: null,
          purchaseTotal: null,
          purchasePriceSale: null,
          purchaseTotalSale: null,
          productPcbPrice: null,
          productPcbTotal: null,
          productPcbPriceSale: null,
          productPcbTotalSale: null,
          fileName: '',
          fileFullname: ''
        },
        approver: '',
        approverShow: '',
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        // 物料报价文件信息
        matterFilename: '',
        matterFileFullName: '',
        materielPoList: [],
      },
      rules: {
        // 销售采购单价
        'billPurchaseQuotePo.purchasePriceSale': [
          {required: true, message: '销售采购单价不能为空', trigger: 'blur' },
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 销售采购总价
        'billPurchaseQuotePo.purchaseTotalSale': [
          {required: true, message: '销售采购总价不能为空', trigger: 'blur' },
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
      },
      steelMeshSourceOption: [ // 钢网来源
        { value: '0', label: '无' },
        { value: '1', label: '甲方提供' },
        { value: '2', label: '乙方提供' }
      ],
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
      ]
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      // 报价事件
      if (this.title === '销售报价' && this.updateRow) {
        this.restTemp()
        this.temp = this.updateRow
        if (!this.temp.billPurchaseQuotePo) {
          this.temp.billPurchaseQuotePo = {
            quoteEndDate: '',
            purchasePrice: null,
            purchaseTotal: null,
            purchasePriceSale: null,
            purchaseTotalSale: null,
            fileName: '',
            fileFullname: ''
          }
        }
        // 采购报价文件
        if (this.temp.billPurchaseQuotePo.fileName) {
          let purfile = { name: this.temp.billPurchaseQuotePo.fileName, fullName: this.temp.billPurchaseQuotePo.fileFullname }
          this.PURFileList = [ purfile ]
          this.PURFile = purfile
        }
        // 物料报价文件
        if (this.temp.matterFilename) {
          let matterfile = { name: this.temp.matterFilename, fullName: this.temp.matterFileFullName }
          this.MATTERFileList = [ matterfile ]
          this.MATTERFile = matterfile
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
      }
      // 查看事件
      if (this.title === '查看' && this.updateRow) {
        this.restTemp()
        this.temp = this.updateRow
        if (!this.temp.billPurchaseQuotePo) {
          this.temp.billPurchaseQuotePo = {
            quoteEndDate: '',
            purchasePrice: null,
            purchaseTotal: null,
            purchasePriceSale: null,
            purchaseTotalSale: null,
            fileName: '',
            fileFullname: ''
          }
        }
        // 采购报价文件
        if (this.temp.billPurchaseQuotePo.fileName) {
          let purfile = { name: this.temp.billPurchaseQuotePo.fileName, fullName: this.temp.billPurchaseQuotePo.fileFullname }
          this.PURFileList = [ purfile ]
          this.PURFile = purfile
        }
        // 物料报价文件
        if (this.temp.matterFilename) {
          let matterfile = { name: this.temp.matterFilename, fullName: this.temp.matterFileFullName }
          this.MATTERFileList = [ matterfile ]
          this.MATTERFile = matterfile
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
        let queryMaterielParam = {
          pkProduct: this.temp.pkProduct
        }
        selectPurchaseMaterielByPkProduct(queryMaterielParam).then((response) => {
          if (response.success) {
            this.temp.materielPoList = response.object
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
        })
      }
    }
  },
  methods: {
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
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    MATTERFileChange(file, fileList) { // 记录文件变化
      this.MATTERFile = file
    },
    MATTERFileRemove(file, fileList) { // 文件删除事件
      this.MATTERFile = null
    },
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      let formData = new FormData()
      if (this.title === '销售报价' && this.MATTERFile == null) {
        this.$message.warning('上传文件不完整!请选择需要上传的文件。')
        return
      }
      formData.append(`matterfile`, this.MATTERFile.raw)
      formData.append(`productCode`, this.temp.productCode)

      // 表单校验
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          saveMatterFile(formData).then((response) => {
            if (response.object) {
              this.temp.matterFilename = response.object.SALE_MATTER_NAME
              this.temp.matterFileFullName = response.object.SALE_MATTER_FULL_NAME

              // 更细销售报价
              let updateSaleQuoteParam = { 
                pkSaleQuote: this.temp.pkSaleQuote,
                matterFilename: response.object.SALE_MATTER_NAME,
                matterFileFullName: response.object.SALE_MATTER_FULL_NAME
               }
              updateSaleQuote(updateSaleQuoteParam).then((response) => {
                // 更新销售报价
              })
            }
            
            // 生产数据
            const billProduceQuoteBPoList = this.temp.billProduceQuoteBPoList == null ? [] : this.temp.billProduceQuoteBPoList
            const modelQuoteBPoListList = this.temp.modelQuoteBPoList == null ? [] : this.temp.modelQuoteBPoList
            let updateProductList = billProduceQuoteBPoList.concat(modelQuoteBPoListList)
            // 采购数据
            let updatePurchaseData = this.temp.billPurchaseQuotePo
            // 这里只更新报价信息
            updateBatchProduceQuoteB(updateProductList).then((response) => {
              if (response.success) {
                  initReplaceAddData(billProduceQuoteBPoList, this.replace)
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({ message: `操作失败:${response.message}`, type: 'error' })
                }
                // 更新采购数据
                updatePurchaseQuoteFunc(updatePurchaseData).then((responset) => {
                  if (responset.success) {
                  }
                })
            })
          })
          this.$emit('close', null)
        }
      })
    },
    // 工序报价计算公式
    gongxuChange(row, type) {
      if ('1' === type) {
        let sourceUnitPriceSale = Number.parseFloat(row.unitPriceSale)
        if (isNaN(sourceUnitPriceSale)) {
          row.unitPriceSale = 0
        } else {
          row.unitPriceSale = sourceUnitPriceSale.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        }
        // 销售外协工序总价 = 工序参数 * 销售外协工序单价
        row.unitTotalPriceSale = (row.param * row.unitPriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        // 销售外协订单合计 = 销售外协工序总价 * 订单数量
        row.unitTotalSale = (row.unitTotalPriceSale * this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
      }
      if ('2' === type) {
        let sourceUnitTotalSale = Number.parseFloat(row.unitTotalSale)
        if (isNaN(sourceUnitTotalSale)) {
          row.unitTotalSale = 0
        } else {
          row.unitTotalSale = sourceUnitTotalSale.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        }
        // 销售外协工序总价 = 销售外协订单合计 / 数量
        row.unitTotalPriceSale = (row.unitTotalSale / this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        if (row.unitTotalPriceSale === 'Infinity') {
          row.unitTotalPriceSale = 0.00
        }
        // 销售外协工序单价 = 销售外协工序总价 / 工序参数
        row.unitPriceSale = (row.unitTotalPriceSale / row.param).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        if (row.unitPriceSale === 'Infinity') {
          row.unitPriceSale = 0.00
        }
      }
    },
    // 制具报价数据格式校验
    zhijuChange(row) {
      // 销售制具报价
      let sourceUnitTotalSale = Number.parseFloat(row.unitTotalSale)
      if (isNaN(sourceUnitTotalSale)) {
        row.unitTotalSale = 0
      } else {
        row.unitTotalSale = sourceUnitTotalSale.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
      }
    },
    // 采购报价公式计算
    priceCount(flag) {
      if (flag === 'single') {
        // 采购总价 = 采购单价 * 数量
        this.temp.billPurchaseQuotePo.purchasePriceSale = Number.parseFloat(this.temp.billPurchaseQuotePo.purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countPurchaseTotal = (this.temp.billPurchaseQuotePo.purchasePriceSale * this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.billPurchaseQuotePo.purchaseTotalSale = countPurchaseTotal
      }
      if (flag === 'sum') {
        // 采购单价 = 采购总价 / 数量
        this.temp.billPurchaseQuotePo.purchaseTotalSale = Number.parseFloat(this.temp.billPurchaseQuotePo.purchaseTotalSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countPurchasePrice = (this.temp.billPurchaseQuotePo.purchaseTotalSale / this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.billPurchaseQuotePo.purchasePriceSale = countPurchasePrice
        if (this.temp.billPurchaseQuotePo.purchasePriceSale === 'Infinity') {
          this.temp.billPurchaseQuotePo.purchasePriceSale = 0.00
        }
      }
    },
    pcbPriceCount(flag) {
      if (flag === 'single') {
        // PCB成本总价 = PCB成本单价 * 数量
        this.temp.billPurchaseQuotePo.productPcbPriceSale = Number.parseFloat(this.temp.billPurchaseQuotePo.productPcbPriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countProductPcbTotalSale = (this.temp.billPurchaseQuotePo.productPcbPriceSale * this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.billPurchaseQuotePo.productPcbTotalSale = countProductPcbTotalSale
      }
      if (flag === 'sum') {
        // PCB成本单价 = PCB成本总价 / 数量
        this.temp.billPurchaseQuotePo.productPcbTotalSale = Number.parseFloat(this.temp.billPurchaseQuotePo.productPcbTotalSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        let countProductPcbPriceSale = (this.temp.billPurchaseQuotePo.productPcbTotalSale / this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
        this.temp.billPurchaseQuotePo.productPcbPriceSale = countProductPcbPriceSale
        if (this.temp.billPurchaseQuotePo.productPcbPriceSale === 'Infinity') {
          this.temp.billPurchaseQuotePo.productPcbPriceSale = 0.00
        }
      }
    },
    saveMaterielData() { // 保存物料信息数据
      let pkProduct = this.temp.pkProduct
      if (pkProduct) {
        this.$confirm('是否确认保存物料数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let saveParamData = {
            pkProduct: pkProduct,
            billMaterielPoList: this.temp.materielPoList
          }

          savePurchaseMaterielPo(saveParamData).then((response) => {
            if (response.success) {
              this.$message.info('保存成功!')
            } else {
              this.$message.warning(`保存失败!${response.errorMessage}`)
            }
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消保存!' })
        })
      } else {
        this.$message.warning('产品信息为空!')
      }
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkSaleQuote: undefined,
        // 基本信息
        pkCustomer: null,
        customerCode: '',
        pkProduct: null,
        productCode: '',
        productName: '',
        productModel: '',
        productNum: null,
        materialSource: '',
        productSteelMeshSource: '',
        // 生产报价
        billProduceQuoteBPoList: [],
        // 制具报价
        modelQuoteBPoList: [],
        // 特殊工艺
        specialQuoteBPoList: [],
        // 采购报价
        billPurchaseQuotePo: {
          quoteEndDate: '',
          purchasePrice: null,
          purchaseTotal: null,
          purchasePriceSale: null,
          purchaseTotalSale: null,
          productPcbPriceSale: null,
          productPcbTotalSale: null,
          fileName: '',
          fileFullname: ''
        },
        approver: '',
        approverShow: '',
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        // 物料报价文件信息
        matterFilename: '',
        matterFileFullName: '',
        materielPoList: [],
      }
    }
  }
}
</script>

<style>

</style>
