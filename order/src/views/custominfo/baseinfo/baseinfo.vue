<template>
  <div class="app-container">
        <el-tabs tab-position="top" style="height: 200px;">
          <!--基本信息-->
          <el-tab-pane label="基本信息">
            <el-button-group>
              <el-button type="primary" @click="viewState.basicInfoState = false">编辑</el-button>
              <el-button type="primary" @click="updateCustomerInfo()">保存</el-button>
            </el-button-group>
            <hr/>
            <el-form :inline="true" ref="dataForm" :model="bdCustomerPo" label-position="left" label-width="150px">
              <el-form-item label="用户编号" prop="code">
                <el-input v-model="bdCustomerPo.code" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="name">
                <el-input v-model="bdCustomerPo.name" :disabled="viewState.basicInfoState"></el-input>
              </el-form-item>
              <el-form-item label="个人/公司名称" prop="corpname">
                <el-input v-model="bdCustomerPo.corpname" :disabled="viewState.basicInfoState"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" prop="corpaddress">
                <el-input v-model="bdCustomerPo.corpaddress" :disabled="viewState.basicInfoState"></el-input>
              </el-form-item>
              <el-form-item label="登录账号" prop="tel">
                <el-input v-model="bdCustomerPo.tel" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话" prop="tel">
                <el-input v-model="bdCustomerPo.tel" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!--收货信息-->
          <el-tab-pane label="收货信息">
            <el-button class="filter-item" type="primary" @click="takeOverData.visible = true">录入</el-button>
            <hr/>
            <el-table :data="bdTakeoverPoList" style="width: 100%">
              <el-table-column prop="address" label="地址" width="180"></el-table-column>
              <el-table-column prop="takeoverPsn" label="收货人" width="180"></el-table-column>
              <el-table-column prop="takeoverTel" label="联系电话" width="180"></el-table-column>
              <el-table-column prop="defaultis" label="是否默认" width="180"></el-table-column>
              <el-table-column label="操作栏">
                <template slot-scope="scope">
                  <el-button @click="editTaskOver(scope.row)">修改</el-button>
                  <el-button @click="saveTakeOver('del', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!--开票信息-->
          <el-tab-pane label="开票信息">
            <el-button-group>
              <el-button type="primary" @click="viewState.invoiceState = false">编辑</el-button>
              <el-button type="primary" @click="saveInvoice()">保存</el-button>
            </el-button-group>
            <hr/>
            <el-tag>开票信息</el-tag>
            <hr/>
            <el-form :inline="true" ref="dataForm" :model="bdInvoicePo" label-position="left" label-width="150px">
              <el-form-item label="开票公司名称" prop="corpname">
                <el-input v-model="bdInvoicePo.corpname" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="税号" prop="dutynum">
                <el-input v-model="bdInvoicePo.dutynum" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="invoiceAddress">
                <el-input v-model="bdInvoicePo.invoiceAddress" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="invoiceTel">
                <el-input v-model="bdInvoicePo.invoiceTel" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="invoiceBank">
                <el-input v-model="bdInvoicePo.invoiceBank" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="invoiceAccount">
                <el-input v-model="bdInvoicePo.invoiceAccount" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
            </el-form>
            
            <br/>
            <el-tag>发票收件地址信息</el-tag>
            <hr/>
            <el-form :inline="true" ref="dataForm" :model="bdInvoicePo" label-position="left" label-width="150px">
              <el-form-item label="发票收件人" prop="addressee">
                <el-input v-model="bdInvoicePo.addressee" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="发票收件人电话" prop="addresseeTel">
                <el-input v-model="bdInvoicePo.addresseeTel" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
              <el-form-item label="发票收件人地址" prop="addresseeAdrs">
                <el-input v-model="bdInvoicePo.addresseeAdrs" :disabled="viewState.invoiceState"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <!--收货信息Dialog-->
        <div v-if="takeOverData.visible">
          <el-dialog title="详细信息" :visible.sync="takeOverData.visible" width="1000px">
            <el-form :inline="true" ref="dataForm" :model="takeOverData.temp" label-position="left" label-width="200px">
              <el-form-item label="主键" prop="pkTakeover" v-if="false">
                <el-input v-model="takeOverData.temp.pkTakeover"></el-input>
              </el-form-item>
              <el-form-item label="客户主键" prop="pkCustomer" v-if="false">
                <el-input v-model="takeOverData.temp.pkCustomer"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="takeOverData.temp.address"></el-input>
              </el-form-item>

              <el-form-item label="收货人" prop="takeoverPsn">
                <el-select v-model="takeOverData.temp.takeoverPsn" placeholder="请选择" @change="listname">
                  <el-option
                    v-for="item in customerDocOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="联系电话" prop="takeoverTel">
                <el-input v-model="takeOverData.temp.takeoverTel" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="是否默认" prop="defaultis">
                <el-select v-model="takeOverData.temp.defaultis" placeholder="请选择">
                  <el-option
                    v-for="item in yesOrNoOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="takeOverData.visible = false">关闭</el-button>
              <el-button type="primary" @click="saveTakeOver()">保存</el-button>
            </div>
          </el-dialog>
        </div>
  </div>
</template>

<script>
import { parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'
import { selectAllCustomdocAsRef } from '@/api/customer/customer'
import { selectCustomInfo, updateBdCustomer, saveTakeOver, saveInvoice, saveCustomdoc } from '@/api/customer/customer'

export default {
  name: "custominfo",
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      viewState: {
        // 基本信息编辑状态
        basicInfoState: true,
        // 开票信息编辑状态
        invoiceState: true
      },
      // 收货信息
      takeOverData: {
        visible: false,
        temp: {
          pkTakeover: null,
          pkCustomer: null,
          address: '',
          takeoverPsn: null,
          takeoverTel: '',
          defaultis: '否',
          creator: null,
          creationtime: parseTime(new Date()),
          dr: 0,
          ts: parseTime(new Date()),
        }
      },
      sexOption: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ],
      yesOrNoOption: [
        { value: '0', label: '否' },
        { value: '1', label: '是' }
      ],
      // 客户信息参照
      customerDocOption: [],
      // 页面数据集
      pkCustomer: null, // 当前用户主键
      bdCustomerPo: {},
      bdTakeoverPoList: [],
      bdInvoicePo: {}
    }
  },
  created() {
    // 客户主键信息
    let pkCustomer = this.$store.getters.useridOC
    // 初始客户人员信息参照
    let customerDocRefParam = { pkCustomer: pkCustomer }
    selectAllCustomdocAsRef(customerDocRefParam).then((response) => {
      this.customerDocOption = response.object
      parseRefKeyInt(this.customerDocOption)
    })
    // 初始客户基本信息数据(当前用户)
    this.initPageData(pkCustomer)
    // 暂存当前登录用户的主键信息
    this.pkCustomer = pkCustomer
  },
  methods: {
    listname(data){
      this.customerDocOption.map(item=>{
        if(item.value===data){
          this.$set(this.takeOverData.temp,'takeoverTel' ,item.defStr)
        }
      })
    },
    resize() { // 拖动界面
      console.log('resize')
    },
    initPageData(pkCustomerParam) {
      if (pkCustomerParam) {
        let queryParam = {pkCustomer: pkCustomerParam}
        selectCustomInfo(queryParam).then((response) => {
          this.restViewData()
          if (response.object) {
            this.bdCustomerPo = response.object.bdCustomerPo
            this.bdTakeoverPoList = response.object.bdTakeoverPoList
            this.bdInvoicePo = response.object.bdInvoicePo
          }
        })
      }
    },
    // 修改用户基本信息
    updateCustomerInfo() {
      updateBdCustomer(this.bdCustomerPo).then((response) => {
        this.viewState.basicInfoState = true
        this.$message.success('保存成功')
        this.initPageData(this.pkCustomer)
      })
    },
    // 编辑收货信息
    editTaskOver(row) {
      this.takeOverData.temp = row
      this.takeOverData.visible = true
    },
    // 保存收货信息
    saveTakeOver(del, row) {
      if('del' === del) {
        row.dr = 1
        saveTakeOver(row).then((response) => {
          this.initPageData(this.pkCustomer)
          this.takeOverData.visible = false
        })
      } else {
        if (this.pkCustomer) {
          this.takeOverData.temp.pkCustomer = this.pkCustomer
          saveTakeOver(this.takeOverData.temp).then((response) => {
            this.initPageData(this.pkCustomer)
            this.takeOverData.visible = false
            this.$message.success('保存成功')
          })
        } else {
          this.$message.warning('请选择需要维护的客户')
        }
        
      }
    },
    // 保存修改发票信息
    saveInvoice() {
      this.viewState.invoiceState = true
      this.bdInvoicePo.pkCustomer = this.pkCustomer
      saveInvoice(this.bdInvoicePo).then((response) => {
        this.initPageData(this.pkCustomer)
        this.$message.success('保存成功')
      })
    },
    // 刷新界面数据
    restViewData() {
      this.bdCustomerPo = {}
      this.bdTakeoverPoList = []
      this.bdInvoicePo = {}
    }
  }
}
</script>

<style>
  .center-div{
    padding: 20px 20px 20px 20px;
  }

  .left-container {
    background-color: #efecec;
    width: 100%;
  }
</style>
