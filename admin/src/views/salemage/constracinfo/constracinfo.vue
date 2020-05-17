<template>
  <div class="app-container">
    <!-- 合同汇总页面 -->
    <!--合同列表数据-->
    <div class="icon" >
      <i class="el-icon-s-custom"><span>查看客户信息</span></i>
      <i class="el-icon-s-order"><span>查看合同信息</span></i>
      <i class="el-icon-s-promotion"><span>查看生产信息</span></i>
    </div>
    <el-table
      :data="constractTableList"
      border
      style="width: 100%"
      :row-style="{height:'2px'}"
      :cell-style="{padding:'2px 0'}"
      :header-cell-style="(row,column,rowIndex,columnIndex) => {return 'background:#F5F7FA;'}"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column type="index" width="70" label="序号"></el-table-column>
      <el-table-column prop="contractNo" label="合同编号" width="110"></el-table-column>
      <el-table-column prop="customerCode" label="客户编号" width="110"></el-table-column>
      <el-table-column prop="customerName" label="客户简称" width="100"></el-table-column>
      <el-table-column prop="orderSignTime" label="签订日期" width="180"></el-table-column>
      <el-table-column prop="scheduledtime" label="预计交货日期" width="180"></el-table-column>
      <el-table-column prop="taxinclud" label="是否含税" width="100"></el-table-column>
      <el-table-column prop="orderSummeryPriceTotal" label="合同总价" width="100"></el-table-column>
      <el-table-column prop="billState" label="单据状态" width="100"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
      <el-table-column prop="productionState" label="生产流程状态" width="150"></el-table-column>
      <el-table-column prop="pkPsndocShow" label="销售负责人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <i class="el-icon-s-custom"
            @click="onButtonClick('LOOKCUSTOMER', scope.row)"
            type="text"
            size="small"
          ></i>
          <i class="el-icon-s-order"
            @click="onButtonClick('LOOKCONTRACT', scope.row)"
            type="text"
            size="small"
          ></i>
          <i class="el-icon-s-promotion"
            @click="onButtonClick('LOOKPRODUCT', scope.row)"
            type="text"
            size="small"
          ></i>
        </template>
      </el-table-column>
    </el-table>

    <pagination 
      v-show="total>0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="initTableViewListData" />

    <!-- 查看客户信息弹窗 -->
    <el-dialog :visible.sync="dialogVisibleCustomer" width="900px" class="dialog-header" @close=" dialogVisibleCustomer = false">
      <div>
        <el-tag class="tag-all">客户信息详情</el-tag>
        <hr />
      </div>
      <el-form :inline="true" label-width="120px" :model="customerForm">
        <el-form-item label="客户编码：">
          <el-input v-model="customerForm.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input v-model="customerForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户联系电话：">
          <el-input v-model="customerForm.tel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购联系人：">
          <el-input v-model="customerForm.customname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购联系电话：">
          <el-input v-model="customerForm.corpname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="个人/公司名称：">
          <el-input v-model="customerForm.telnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司地址：">
          <el-input v-model="customerForm.corpaddress" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看合同信息弹窗 -->
    <el-dialog :visible.sync="dialogVisibleContract" width="900px" class="dialog-header">
      <div>
        <el-tag class="tag-all">合同信息详情</el-tag>
        <hr />
      </div>
      <el-form :inline="true" label-width="120px" :model="constractForm">
        <el-form-item label="合同编号：">
          <el-input v-model="constractForm.contractNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户编号：">
          <el-input v-model="constractForm.customerCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="销售负责人：">
          <el-input v-model="constractForm.pkPsndocShow" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="下单日期：">
          <el-input v-model="constractForm.creationtime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="预计交货日期：">
          <el-input v-model="constractForm.scheduledtime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单类型：">
          <el-select v-model="constractForm.orderType" clearable placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in orderTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购负责人：">
          <el-input v-model="constractForm.purchaseContactsName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购电话：">
          <el-input v-model="constractForm.purchaseContactsTel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="技术负责人：">
          <el-input v-model="constractForm.skillContactsName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="技术电话：">
          <el-input v-model="constractForm.skillContactsTel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否含税：">
          <el-input v-model="constractForm.taxinclud" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否加急：">
          <el-select clearable v-model="constractForm.urgent" placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in urgentOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运输方式：">
          <el-select clearable v-model="constractForm.transportType" placeholder="请选择" :disabled="true">
            <el-option
              v-for="item in transportTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货联系人：">
          <el-input v-model="constractForm.customname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收货电话：">
          <el-input v-model="constractForm.takeoverTel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收货地址：">
          <el-input v-model="constractForm.address" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看产品信息弹窗 -->
    <el-dialog :visible.sync="dialogVisibleProduct" width="900px" class="dialog-header">
      <div>
        <el-tag class="tag-all">产品信息详情</el-tag>
        <hr />
      </div>
      <el-table :data="productOrderBList" style="width: 100%">
        <el-table-column prop="orderProductName" label="产品名称" width="180"></el-table-column>
        <el-table-column prop="orderProductCode" label="产品编码" width="180"></el-table-column>
        <el-table-column prop="productNum" label="产品数量" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="() => { productinoInfo.visiable = true; productinoInfo.pkProductOrderB = scope.row.pkProductOrderB }">生产信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--生产详情Dialog-->
    <ProductionInfoContentViewShow
      :visiable="productinoInfo.visiable"
      :pkProductOrderB="productinoInfo.pkProductOrderB"
      @close="() => { productinoInfo.visiable = false }">
    </ProductionInfoContentViewShow>
  </div>
</template>

<script>
import { selectAllOrderSummaryAsPage, selectCustomerInfoByPrimary } from '@/api/constracinfo/constracinfo'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import ProductionInfoContentViewShow from '@/views/salemage/constracinfo/productionInfo'

export default {
  name: "AllConstractSummaryTableListVersiont",
  components: { Pagination, ProductionInfoContentViewShow },
  computed: {
    ...mapGetters([
      'name', 'userid'
    ])
  },
  data() {
    return {
      input: "",
      dialogVisibleCustomer: false,
      dialogVisibleContract: false,
      dialogVisibleProduct: false,
      constractTableList: [ // 合同列表数据

      ], 
      productOrderBList: [ // 合同子表数据

      ],
      productinoInfo: {
        visiable: false,
        pkProductOrderB: false
      },

      customerForm: {
        code: '', // 客户编码
        name: '', // 客户名称
        tel: '', // 客户联系电话
        customname: '', // 采购联系人
        telnum: '', // 采购联系电话
        corpname: '', // 公司名称
        corpaddress: '' // 公司地址
      }, // 客户信息Form

      constractForm: {
        contractNo: '', // 合同编号
        customerCode: '', // 客户编号
        pkPsndocShow: '', // 销售负责人
        creationtime: '', // 下单日期
        scheduledtime: '', // 预计交货日期
        orderType: '', // 订单类型
        purchaseContactsName: '', // 采购联系人
        purchaseContactsTel: '', // 采购联系电话
        skillContactsName: '', // 技术联系人
        skillContactsTel: '', // 技术联系电话
        taxinclud: null, //是否含税
        urgent: '', // 是否加急
        transportType: '', // 运输方式
        customname: '', // 收货人
        takeoverTel: '', // 收货人联系方式
        address: '' // 收货地址
      },

      total: 0, // 数据量
      listQuery: {
        page: 1,
        limit: 20,
      },

      orderTypeOptions: [
        { value: '0', label: '普通合同' },
        { value: '1', label: '生产订单' },
        { value: '2', label: 'OEM' },
        { value: '3', label: 'DEM' },
        { value: '4', label: '贸易模式' }
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
    };
  },
  created() {
    this.initTableViewListData()
  },
  methods: {
    // 初始化界面列表数据
    initTableViewListData() {
      let queryParam = this.listQuery
      selectAllOrderSummaryAsPage(queryParam).then((response) => {
        console.log(response.object)
        if (response && response.success && response.object) {
          this.constractTableList = response.object
          this.total = response.total
        }
      })
    },
    // 监听界面所有按钮时间
    onButtonClick(btnCode, rowData) {
      // 查看客户详细信息
      if (btnCode === "LOOKCUSTOMER") {
        this.dialogVisibleCustomer = true;
        this.restCustomerForm()
        // 查询客户信息
        let queryParam = {
          pkCustomer: rowData.pkCustomer
        }
        selectCustomerInfoByPrimary(queryParam).then((response) => {
          if (response && response.success && response.object) {
            this.customerForm = response.object
          }
        })
      }
      //查看订单合同详情
      if (btnCode === "LOOKCONTRACT") {
        this.dialogVisibleContract = true;
        this.constractForm = rowData
      }
      // 查看产品详情信息
      if (btnCode === "LOOKPRODUCT") {
        this.dialogVisibleProduct = true;
        if (rowData.billProductOrderBPos) {
          this.productOrderBList = rowData.billProductOrderBPos
        } else {
          this.productOrderBList = []
        }
      }
    },
    restCustomerForm() {
      this.customerForm = {
        code: '', // 客户编码
        name: '', // 客户名称
        tel: '', // 客户联系电话
        customname: '', // 采购联系人
        telnum: '', // 采购联系电话
        corpname: '', // 公司名称
        corpaddress: '' // 公司地址
      } // 客户信息Form
    }
  }
};
</script>

<style scoped>
div {
  font-size: 8px;
}
.tag-all {
  margin-bottom: 10px;
}
</style>

<style>
.dialog-header .el-dialog__header {
  padding: 0 0 0 10px;
}
.dialog-header .el-dialog__body {
  padding: 15px 5px;
}
.dialog-header .el-input__inner {
  height: 35px;
  line-height: 35px;
  padding: 0 5px;
}
.dialog-header .el-collapse-item__content{
  background: #F5F7FA;
}
.icon{
  float: right;
  margin-right: 50px;
  color: #409EFF;
  margin-bottom: 10px;
}
i{
  font-size: 16px;
  padding-left: 5px;
}
i:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>

