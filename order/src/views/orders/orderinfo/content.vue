<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="150px" :disabled="title=='查看'">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="合同号" prop="contractNo">
            <el-input v-model="temp.contractNo" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="人员名称" prop="customerName">
            <el-input v-model="temp.customerName"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="customerName">
            <el-input v-model="temp.customerName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="customerTel">
            <el-input v-model="temp.customerTel"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="corpaddress">
            <el-input v-model="temp.corpaddress"></el-input>
          </el-form-item>

          <el-form-item label="销售负责人" prop="pkPsndoc">
            <el-select v-model="temp.pkPsndoc" placeholder="请选择">
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
          <div v-for="(item, key) in takeOverList" :key="key">
            <el-radio v-model="temp.pkTakeover" :label="item.pkTakeover" border>{{item.address}}</el-radio>
            <hr/>
          </div>
        </el-tab-pane>
      </el-tabs>
      <br/>
      <el-tabs type="border-card">
        <el-tab-pane label="订单信息">
          <el-form-item label="供料方式" prop="materialSource">
            <el-select clearable v-model="temp.materialSource" placeholder="请选择">
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否含税" prop="taxinclud">
            <el-select clearable v-model="temp.taxinclud" placeholder="请选择">
              <el-option
                v-for="item in taxincludOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否加急" prop="urgent">
            <el-select clearable v-model="temp.urgent" placeholder="请选择">
              <el-option
                v-for="item in urgentOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="运输方式" prop="transportType">
            <el-select clearable v-model="temp.transportType" placeholder="请选择">
              <el-option
                v-for="item in transportTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="付款方式" prop="paymentType">
            <el-select clearable v-model="temp.paymentType" placeholder="请选择">
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
          <el-button icon="el-icon-circle-plus" @click="subBtnClick('ADD')">新增</el-button>
          <el-button icon="el-icon-circle-plus" @click="() => { orderProductInfo.visiable = true }">参照新增</el-button>
        </el-button-group>
        <hr/>
        <el-tab-pane label="订单产品信息">
          <el-table
          :data="temp.billProductOrderBPoList"
          border
          style="width: 100%">
            <el-table-column prop="pkProductOrderB" v-if="false"></el-table-column>
            <el-table-column label="产品名称" prop="pkProduct" width="180">
              <template slot-scope="scope">
                <el-select clearable v-model="scope.row.pkProduct" placeholder="请选择">
                  <el-option
                    v-for="item in customProductList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="数量" prop="productNum" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.productNum"></el-input>
              </template>
            </el-table-column>
            
            <el-table-column label="描述" prop="memo" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.memo"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="lookupMateriel(scope.$index, scope.row)" type="text" size="small">查看物料信息</el-button>
                <el-button @click="deleteSubRow(scope.$index, scope.row)" type="text" size="small">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog">确 定</el-button>
    </span>

    <el-dialog
      width="80%"
      title="物料信息"
      :visible.sync="innerVisible"
      append-to-body>
      <el-tabs type="border-card">
        <el-button icon="el-icon-circle-plus" @click="addNewMateriel()">新增</el-button>
        <el-button icon="el-icon-success" @click="saveMaterielData()">保存</el-button>
        <hr/>
        <el-tab-pane label="物料信息">
          <el-table
          :data="materielList"
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

            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                <el-button @click="deleteSubMaterielRow(scope.$index, scope.row)" type="text" size="small">移除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        </el-tabs>
  </el-dialog>

    <!--新增产品 选择参照-->
    <OrderProductSelectDialog
      :visiable="orderProductInfo.visiable"
      @initOrderProductListInfo="initOrderProductListInfo"
      @close="() => {orderProductInfo.visiable = false}">
    </OrderProductSelectDialog>
  </el-dialog>
</template>

<script>
import OrderProductSelectDialog from '@/views/orders/orderinfo/productSelect'
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'
import { selectTaskoverByPkCustomer, selectProductByPkCustomerAsRef } from '@/api/orders/orders'
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { selectPurchaseMaterielByPkProduct, savePurchaseMaterielPo } from '@/api/orders/orders'

export default {
  name: 'Customdoccontent',
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  components: { OrderProductSelectDialog },
  computed: {
    ...mapGetters([
      'listDataOC', 'columnsOC', 'nameOC', 'useridOC', 'corpaddressOC', 'pkPsndocOC', 'customerTelOC'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      innerVisible: false,
      handlePkProduct: null, // 当前查看产品
      uploadUrl: process.env.BASE_API + '/', // 上传地址

      orderProductInfo: { // 参照新建选择产品信息
        visiable: false,
      },
      temp: {
        pkProductOrder: undefined,
        contractNo: '',
        pkPsndoc: null,
        pkCustomer: null,
        customerName: '',
        customerTel: '',
        corpaddress: '',
        pkTakeover: '',
        materialSource: '',
        taxinclud: null,
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
      if (this.title === '录入') {
        this.restTemp()
      }
      if (this.title === '修改' && this.updateRow) {
        this.temp = this.updateRow
      }
      if (this.title === '查看' && this.updateRow) {
        this.temp = this.updateRow
      }
    }
  },
  created() {
    let queryParam = { pkCustomer: this.useridOC }
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
    sureDialog() { // 确定保存回调Dialog
      const actTemp = this.temp
      if (this.action) {
        initReplaceUpdateData(actTemp, this.replace)
        this.action(actTemp).then((response) => {
          if (response.primary) {
            actTemp.pkProductOrder = response.primary
          }
          if (response.success) {
            initReplaceAddData(actTemp, this.replace)
            this.$emit('queryListData', null)
            this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
            this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
        })
      }
      this.$emit('close', actTemp)
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
      this.handlePkProduct = pkProduct
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
    addNewMateriel() { // 新增物料信息
      let addNewMateriel = {
          pkMateriel: undefined,
          pkProduct: undefined,
          pkPurchaseQuote: undefined,
          materialName: '',
          model: '',
          potting: '',
          norms: '',
          usage: '',
          placeNumber: '',
          weldingNumber: '',
          usageTotal: '',
          batchingNumber: '',
          pickingNumber: '',
          backingNumber: '',
          brand: '',
          memo: '',
          itemType: '',
          previewUrl: '',
          previewUrlShow: '',
          previewUrlShowList: [],
          creator: null,
          creationtime: parseTime(new Date()),
          dr: 0,
          ts: parseTime(new Date())
      }
      this.materielList.push(addNewMateriel)
    },
    deleteSubMaterielRow(index, row) { // 删除物料数据
      this.materielList.splice(index, 1)
    },
    saveMaterielData() { // 保存物料信息数据
      let pkProduct = this.handlePkProduct
      if (pkProduct) {
        this.$confirm('是否确认保存物料数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let saveParamData = {
            pkProduct: pkProduct,
            billMaterielPoList: this.materielList
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
    // 多选产品进行下单
    initOrderProductListInfo(productList) {
      if (productList && productList.length > 0) {
        for (let index = 0;index < productList.length;index++) {
          let selProductOne = productList[index]
          if (selProductOne && selProductOne.pkProduct) {
            let addNewProduct = {
              pkProductOrderB: undefined,
              pkProductOrder: this.temp.pkProductOrder,
              pkProduct: selProductOne.pkProduct + '',
              productNum: null,
              memo: '',
              creator: null,
              creationtime: parseTime(new Date()),
              dr: 0,
              ts: parseTime(new Date())
            }
            this.temp.billProductOrderBPoList.push(addNewProduct)
          }
        }
      }
      this.orderProductInfo.visiable = false
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkProductOrder: undefined,
        contractNo: '',
        pkPsndoc: this.pkPsndocOC,
        pkCustomer: this.useridOC,
        customerName: this.nameOC,
        customerTel: this.customerTelOC,
        corpaddress: this.corpaddressOC,
        pkTakeover: '',
        materialSource: '',
        taxinclud: null,
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
