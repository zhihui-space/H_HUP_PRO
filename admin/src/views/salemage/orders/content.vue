<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="150px">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="人员名称" prop="customerName">
            <el-input v-model="temp.customerName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="customerName">
            <el-input v-model="temp.customerName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="customerTel">
            <el-input v-model="temp.customerTel" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="corpaddress">
            <el-input v-model="temp.corpaddress" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="billState">
            <el-select v-model="temp.billState" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in billStateOptions"
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
      <el-tabs type="border-card">
        <el-tab-pane label="收货地址">
          <el-form-item label="公司地址" prop="pkTakeover">
            <el-input v-model="temp.pkTakeoverShow" :disabled="true"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="订单信息">
          <el-form-item label="供料方式" prop="materialSource">
            <el-select clearable v-model="temp.materialSource" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否含税" prop="taxinclud">
            <el-select clearable v-model="temp.taxinclud" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in taxincludOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否加急" prop="urgent">
            <el-select clearable v-model="temp.urgent" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in urgentOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="运输方式" prop="transportType">
            <el-select clearable v-model="temp.transportType" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in transportTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="付款方式" prop="paymentType">
            <el-select clearable v-model="temp.paymentType" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in paymentTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br/>
      <el-tabs type="border-card">
        <el-button-group>
          <el-button icon="el-icon-circle-plus" @click="subBtnClick('ADD')" :disabled="true">新增</el-button>
        </el-button-group>
        <hr/>
        <el-tab-pane label="订单产品信息">
          <el-table
          :data="temp.billProductOrderBPoList"
          border
          style="width: 100%">
            <el-table-column prop="pkProductOrderB" v-if="false"></el-table-column>
            <el-table-column label="产品名称" prop="orderProductName" width="180">
            </el-table-column>

            <el-table-column label="数量" prop="productNum" width="180">
            </el-table-column>
            
            <el-table-column label="描述" prop="memo" width="180">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="lookupMateriel(scope.$index, scope.row)" type="text" size="small">查看物料信息</el-button>
                <el-button v-if="title!='查看'" @click="deleteSubRow(scope.$index, scope.row)" type="text" size="small" :disabled="true">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button v-if="title!='查看' && temp.billState == 30" type="primary" @click="passOverOrder">完成订单报价</el-button>
      <el-button v-if="title!='查看' && temp.billState == 31" type="primary" @click="signedContract">签订合同</el-button>
    </span>

    <el-dialog
      width="80%"
      title="物料信息"
      :visible.sync="innerVisible"
      append-to-body>
        <el-tabs type="border-card">
            <el-tab-pane label="物料信息">
                <el-table
                :data="materielList"
                border
                style="width: 100%">
                <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
                <el-table-column prop="pkProduct" v-if="false"></el-table-column>
                <el-table-column prop="pkPurchaseQuote" v-if="false"></el-table-column>
                <el-table-column label="物料名称" prop="materialName" width="120"></el-table-column>
                <el-table-column label="型号" prop="model" width="100"></el-table-column>
                <el-table-column label="封装" prop="potting" width="100"></el-table-column>
                <el-table-column label="规格" prop="norms" width="120"></el-table-column>
                <el-table-column label="用量" prop="usageNum" width="80"></el-table-column>
                <el-table-column label="位号" prop="placeNumber" width="100"></el-table-column>
                <el-table-column label="焊点数" prop="weldingNumber" width="80"></el-table-column>
                <el-table-column label="总用量" prop="usageTotal" width="80"></el-table-column>
                <el-table-column label="配料数量" prop="batchingNumber" width="95"></el-table-column>
                <el-table-column label="领料数量" prop="pickingNumber" width="90"></el-table-column>
                <el-table-column label="退料数量" prop="backingNumber" width="90"></el-table-column>
                <el-table-column label="品牌" prop="brand" width="150"></el-table-column>
                <el-table-column label="备注" prop="memo" width="180"></el-table-column>
                <el-table-column label="物料类型" prop="itemType" width="100"></el-table-column>

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
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'
import { selectTaskoverByPkCustomer, selectProductByPkCustomerAsRef, updateProductOrder, updateProductOrderStateByPk, updateProductOrderStateOutByPk } from '@/api/orders/orders'
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { selectPurchaseMaterielByPkProduct } from '@/api/worktools/materieltool'

export default {
  name: 'Customdoccontent',
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name', 'userid', 'corpaddress', 'pkPsndoc', 'customerTel'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      innerVisible: false,
      uploadUrl: process.env.BASE_API + '/', // 上传地址
      temp: {
        pkProductOrder: undefined,
        pkPsndoc: null,
        pkCustomer: null,
        customerName: '',
        customerTel: '',
        corpaddress: '',
        pkTakeover: '',
        materialSource: '',
        taxinclud: '',
        urgent: '',
        transportType: '',
        paymentType: '',
        creator: null,
        creatorShow: '',
        creationtime: parseTime(new Date()),
        modifier: null,
        modifierShow: '',
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        billState: 0,
        billProductOrderBPoList: []
      },
      // 人员信息参照
      psndocOption: [],
      takeOverList: [], // 客户收货地址信息
      customProductList: [], // 客户维护的产品信息
      billStateOptions: [
        { value: 30, label: '报价进行中' },
        { value: 31, label: '报价完成' },
      ],
      materialSourceOption: [ // 供料方式
        { value: '0', label: '甲方提供' },
        { value: '1', label: '乙方提供' },
      ],
      yesOrNoOption: [
        { value: '是', label: '是' },
        { value: '否', label: '否' },
      ],
      taxincludOptions: [ // 是否含税
        { value: 1, label: '不含税' },
        { value: 1.13, label: '含税' },
      ],
      urgentOption: [
        { value: '0', label: '否' },
        { value: '1', label: '料齐三天发货(费用：1000元)' },
        { value: '2', label: '料齐三天发货(费用：500元)' },
      ],
      transportTypeOption: [
        { value: '0', label: '甲方负责' },
        { value: '1', label: '乙方负责' },
      ],
      paymentTypeOption: [
        { value: '0', label: '线下付款' },
        { value: '1', label: '账户扣款' },
      ],
      materielList: [] // 产品物料数据
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      debugger
      this.temp = this.updateRow
    }
  },
  created() {
    let queryParam = { pkCustomer: this.userid }
    // 初始客户收货地址信息
    selectTaskoverByPkCustomer(queryParam).then((response) => {
      if (response.success && response.object) {
        this.takeOverList = response.object
      }
    })

    // 初始客户产品信息
    selectProductByPkCustomerAsRef(queryParam).then((response) => {
      if (response.success && response.object) {
        this.customProductList = response.object
      }
    })

    // 初始人员信息参照
    let psndocRefParam = {pkPsntypeName: '销售人员'}
    listBdPsndocAsRef(psndocRefParam).then((response) => {
      this.psndocOption = response.object
      parseRefKeyInt(this.psndocOption)
    })
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 完成订单
    passOverOrder() {
      this.$confirm('是否确认完成订单报价?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let updateParam = {
          pkProductOrder: this.temp.pkProductOrder,
          billState: 31
        }
        updateProductOrder(updateParam).then((response) => {
          if (response.success) {
            this.$message({ type: 'success', message: '已完成!' })
            this.$emit('close', null)
            this.$emit('queryListData', null)
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消!' })
      })
    },
    // 签订合同
    signedContract() {
      this.$confirm('是否确认与客户签订合同?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let updateParam = {
          pkProductOrder: this.temp.pkProductOrder
        }
        updateProductOrderStateByPk(updateParam).then((response) => {
          if (response.success) {
            this.$message({ type: 'success', message: '签订成功!' })
            this.$emit('close', null)
            this.$emit('queryListData', null)
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消!' })
      })
    },
    subBtnClick(btnCode) {
      if (btnCode === 'ADD') {
        let addNewProduct = {
          pkProductOrderB: undefined,
          pkProductOrder: this.temp.pkProductOrder,
          pkProduct: null,
          productNum: null,
          memo: '',
          creator: null,
          creationtime: parseTime(new Date()),
          dr: 0,
          ts: parseTime(new Date())
        }
        this.temp.billProductOrderBPoList.push(addNewProduct)
      }
    },
    // 删除子表数据
    deleteSubRow(index, row) {
      this.temp.billProductOrderBPoList.splice(index, 1)
      console.log(this.temp.billProductOrderBPoList)
    },
    // 查询物料数据
    lookupMateriel(index, row) {
      let pkProduct = row.pkProduct
      let queryForm = new FormData()
      queryForm.append('pkProduct', pkProduct)
      selectPurchaseMaterielByPkProduct(queryForm).then((response) => {
        this.innerVisible = true
        if (response.success) {
          let materielList = response.object
          this.initDataImageUrl(materielList)
          this.materielList = materielList
        } else {
            this.materielList = []
        }
      })
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
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkProductOrder: undefined,
        pkPsndoc: this.pkPsndoc,
        pkCustomer: this.userid,
        customerName: this.name,
        customerTel: this.customerTel,
        corpaddress: this.corpaddress,
        pkTakeover: '',
        materialSource: '',
        taxinclud: '',
        urgent: '',
        transportType: '',
        paymentType: '',
        creator: null,
        creatorShow: '',
        creationtime: parseTime(new Date()),
        modifier: null,
        modifierShow: '',
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        billState: 0,
        billProductOrderBPoList: []
      }
    }
  }
}
</script>

<style>

</style>
