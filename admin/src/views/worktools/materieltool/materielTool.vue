<template>
  <div class="app-container">
    <!--图片上传组件-->
    <Uploadmaterieldialog
      :visiable="uploadmaterieldialog.visiable"
      :handleRow="uploadmaterieldialog.handleRow"
      :handleRowIndex="uploadmaterieldialog.handleRowIndex"
      @close="closeUploadMateriel">
    </Uploadmaterieldialog>

    <!--匹配物料数据组件-->
    <Matchmaterieldialog
      :visiable="matchMaterielProp.visiable"
      :queryFilterParam="matchMaterielProp.queryFilter"
      @close="closeMatchMateriel">
    </Matchmaterieldialog>

    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="120px">
      <el-form-item label="关联产品" prop="pkProduct">
        <el-select v-model="temp.pkProduct" placeholder="请选择" @change="productChange()">
          <el-option
            v-for="item in productListRef"
            :key="item.pkProduct"
            :label="item.productName"
            :value="item.pkProduct">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品编码" prop="productCode">
        <el-input v-model="temp.productCode" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="temp.productName" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <el-upload
      class="upload-demo"
      :limit="1"
      :action="uploadUrl"
      :file-list="fileList"
      :on-change="handleChange"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">解析BOM文件</el-button>
    </el-upload><hr/>

    <el-tabs type="border-card">
      <el-button icon="el-icon-circle-plus" @click="subBtnClick('ADD')">新增</el-button>
      <el-button icon="el-icon-success" @click="saveMaterielData()">保存</el-button>
      <hr/>
      <el-tab-pane label="物料信息">
        <el-table
          :data="temp.materielList"
          border
          style="width: 100%;">
          <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
          <el-table-column prop="pkProduct" v-if="false"></el-table-column>
          <el-table-column prop="pkPurchaseQuote" v-if="false"></el-table-column>
          <el-table-column label="序号" prop="rowNum" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.rowNum"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="物料类型" prop="itemType" width="100">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.itemType"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="存货编号" prop="model" width="100">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.model"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="物料名称" prop="materialName" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.materialName"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="存货全名" prop="materialFullname" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.materialFullname"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="存货型号" prop="potting" width="100">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.potting"></el-input>
            </template>
          </el-table-column>
          
          <el-table-column label="存货规格" prop="norms" width="120">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.norms"></el-input>
            </template>
          </el-table-column>
          
          <el-table-column label="位号" prop="placeNumber" width="100">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.placeNumber"></el-input>
            </template>
          </el-table-column>
          
          <el-table-column label="焊点数" prop="weldingNumber" width="80">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.weldingNumber"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="备注" prop="memo" width="180">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.memo"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="品牌" prop="brand" width="150">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.brand"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="单位" prop="usegUnit" width="150">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.usegUnit"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="用量" prop="usageNum" width="80">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.usageNum"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="总用量" prop="usageTotal" width="80">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.usageTotal"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="配料数量" prop="batchingNumber" width="95">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.batchingNumber"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="领料数量" prop="pickingNumber" width="90">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.pickingNumber"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="退料数量" prop="backingNumber" width="90">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.backingNumber"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="采购单价" prop="purchaseUnitPrice" width="90">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.purchaseUnitPrice"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="采购总价" prop="purchaseTotalPrice" width="90">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.purchaseTotalPrice"></el-input>
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

          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button @click="deleteSubRow(scope.$index, scope.row)" type="text" size="small">移除</el-button>
              <el-button @click="uploadMateriel(scope.$index, scope.row)" type="text" size="small">图片上传</el-button>
              <el-button @click="matchMateriel(scope.$index, scope.row)" type="text" size="small">匹配价格</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { parseTime, randomNum } from '@/utils/viewCompUtil'
import { resolvPurchaseItemFile, selectPurchaseQuoteToWorkToolRef, selectPurchaseMaterielByPkProduct, savePurchaseMaterielPo } from '@/api/worktools/materieltool'
import Uploadmaterieldialog from '@/views/worktools/materieltool/uploadImage'
import Matchmaterieldialog from '@/views/worktools/materieltool/matchMaterielDialog'

export default {
  name: 'MaterielTool',
  components: { Uploadmaterieldialog, Matchmaterieldialog },
  data() {
    return {
      fileList: [],
      materielFile: null,
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      temp: {
        pkProduct: null,
        productCode: '',
        productName: '',
        materielList: []
      },
      // 图片上传组件
      uploadmaterieldialog: {
        visiable: false,
        handleRow: null,
        handleRowIndex: null
      },
      // 物料匹配组件
      matchMaterielProp: {
        visiable: false,
        handleMatchRowIndex: null,
        queryFilter: {
          itemType: '', // 工序-物料类型
          model: '', // 存货编号
          materialFullname: '', // 存货全名
          potting: '', // 存货型号
        }
      },
      // 产品信息参照集合
      productListRef: []
    }
  },
  created() {
    // 加载初始界面
    let pkProduct = this.$route.query.pkProduct
    if (pkProduct) {
      this.pkProduct = pkProduct
      this.initViewDefData()
    }
  },
  methods: {
    // 初始加载界面默认数据
    initViewDefData() {
      if (this.pkProduct) {
        // 初始产品参照
        let queeryParam = { pkProduct: this.pkProduct, dr: 0 }
        selectPurchaseQuoteToWorkToolRef(queeryParam).then((response) => {
          if (response.success) {
            this.productListRef = response.object
            // 初始产品信息
            this.temp.pkProduct = this.pkProduct
            this.productChange()
          }
        })
      }
    },
    handleChange(file) {
      this.materielFile = file.raw
    },
    submitUpload() { // 上传文件进行转换
      let materielFile = this.materielFile
      if (materielFile) {
        let formData = new FormData()
        formData.append(`file`, materielFile)
        resolvPurchaseItemFile(formData).then((response) => {
          if (response.success && response.object) {
            let SMTObject = this.initDataImageUrl(response.object.SMT)
            let DIPObject = this.initDataImageUrl(response.object.DIP)
            if (SMTObject || DIPObject) {
              this.temp.materielList = SMTObject.concat(DIPObject)
            }
          }
        })
      }
    },
    initDataImageUrl(dataObject) {
      if (dataObject) {
        for (let index in dataObject) {
          let dataOne = dataObject[index]
          if (dataOne && dataOne.previewUrl) {
            dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl
            let previewUrlList = [dataOne.previewUrlShow]
            dataOne.previewUrlList = previewUrlList
          }
        }
      }
      return dataObject
    },
    productChange() { // 选择关联产品变化事件
      let pkProduct = this.temp.pkProduct
      let productListRef = this.productListRef
      if (pkProduct && productListRef) {
        for (let index in productListRef) {
          let productOne = productListRef[index]
          if (productOne) {
            if (pkProduct === productOne.pkProduct) {
              this.temp.productCode = productOne.productCode
              this.temp.productName = productOne.productName
            }
          }
        }
      }

      let queryForm = new FormData()
      queryForm.append('pkProduct', pkProduct)
      selectPurchaseMaterielByPkProduct(queryForm).then((response) => {
        if (response.success) {
          let materielList = response.object
          this.initDataImageUrl(materielList)
          this.temp.materielList = materielList
        }
      })
    },
    uploadMateriel(index, row) {
      this.uploadmaterieldialog.visiable = true
      row.productCode = this.temp.productCode
      this.uploadmaterieldialog.handleRow = row
      this.uploadmaterieldialog.handleRowIndex = index
    },
    closeUploadMateriel(updateData) {
      this.uploadmaterieldialog.visiable = false
      if (updateData) {
        this.temp.materielList[updateData.handleRowIndex].previewUrl = updateData.previewUrl
        this.temp.materielList[updateData.handleRowIndex].previewUrlShow = updateData.previewUrlShow
        this.temp.materielList[updateData.handleRowIndex].previewUrlShowList = updateData.previewUrlShowList
      }
    },
    subBtnClick(btnCode) { // 新增物料信息
      if (btnCode === 'ADD') {
        let addNewMateriel = {
          pkMateriel: undefined,
          pkProduct: undefined,
          pkPurchaseQuote: undefined,
          rowNum: null,
          itemType: '',
          model: '',
          materialName: '',
          materialFullname: '',
          potting: '',
          norms: '',
          placeNumber: '',
          weldingNumber: null,
          memo: '',
          brand: '',
          usegUnit: '',
          usageNum: null,
          usageTotal: null,
          batchingNumber: null,
          pickingNumber: null,
          backingNumber: null,
          purchaseUnitPrice: null,
          purchaseTotalPrice: null,
          saleUnitPrice: null,
          saleTotalPrice: null,
          previewUrl: '',
          previewUrlShow: '',
          previewUrlShowList: [],
          creator: null,
          creationtime: parseTime(new Date()),
          dr: 0,
          ts: parseTime(new Date())
        }
        this.temp.materielList.push(addNewMateriel)
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
            billMaterielPoList: this.temp.materielList
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
    // 删除子表数据
    deleteSubRow(index, row) {
      this.temp.materielList.splice(index, 1)
    },
    // 匹配物料价格信息
    matchMateriel(index, row) {
      this.matchMaterielProp.handleMatchRowIndex = index
      this.matchMaterielProp.visiable = true
      this.matchMaterielProp.queryFilter.itemType = row.itemType
      this.matchMaterielProp.queryFilter.model = row.model
      this.matchMaterielProp.queryFilter.materialFullname = row.materialFullname
      this.matchMaterielProp.queryFilter.potting = row.potting
    },
    closeMatchMateriel(closeParam) {
      this.matchMaterielProp.visiable = false
      let handleMatchRowIndex = this.matchMaterielProp.handleMatchRowIndex
      if (closeParam) {
        let unitPrice = closeParam.unitPrice
        let usageNum = this.temp.materielList[handleMatchRowIndex].usageNum
        this.temp.materielList[handleMatchRowIndex].purchaseUnitPrice = unitPrice
        this.temp.materielList[handleMatchRowIndex].purchaseTotalPrice = unitPrice * usageNum
      }
    }
  }
}
</script>

<style>

</style>