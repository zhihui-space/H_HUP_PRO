<template>
<!-- 合同信息 -->
  <el-dialog title="生产信息" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="80%">

    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="1">
        <el-form ref="form" :model="ProductionInfoMapPo" label-width="150px" :inline="true">
          <el-form-item label="合同签订日期">
            <el-input v-model="ProductionInfoMapPo.orderCreationtime" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="预计交货日期">
            <el-input v-model="ProductionInfoMapPo.scheduledtime" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="客户编码">
            <el-input v-model="ProductionInfoMapPo.customerCode" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="合同号">
            <el-input v-model="ProductionInfoMapPo.contractNo" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="合同类型">
            <el-select v-model="ProductionInfoMapPo.orderType" clearable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="产品编号">
            <el-input v-model="ProductionInfoMapPo.productCode" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="产品名称">
            <el-input v-model="ProductionInfoMapPo.productName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="产品型号">
            <el-input v-model="ProductionInfoMapPo.model" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="销售负责人">
            <el-input v-model="ProductionInfoMapPo.psnName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="物料来源">
            <el-select v-model="ProductionInfoMapPo.materialSource" clearable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="钢网来源">
            <el-select v-model="ProductionInfoMapPo.steelMeshSource" clearable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="PCB来源">
            <el-select v-model="ProductionInfoMapPo.pcbSource" clearable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in pcbSourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="焊接工艺">
            <el-select v-model="ProductionInfoMapPo.sealTechnics" clearable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in sealTechnicsOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="预计到货日期">
            <el-input v-model="ProductionInfoMapPo.estimatedOverTime" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="采购负责人">
            <el-input v-model="ProductionInfoMapPo.purchaseName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="来料质检负责人">
            <el-input v-model="ProductionInfoMapPo.qualityName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="来料质检时间">
            <el-input v-model="ProductionInfoMapPo.qualityTime" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="来料质检状态">
            <el-input v-model="ProductionInfoMapPo.qualityState" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-select v-model="ProductionInfoMapPo.productionState" clearable placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in productionStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="生产计划" name="2">
        <el-table :data="ProductionInfoMapPo.omgOrderPlanBPoList" style="width: 100%">
          <el-table-column prop="procedureName" label="工序" width="180"></el-table-column>
          <el-table-column prop="productionWorkshop" label="生产车间" width="180"></el-table-column>
          <el-table-column prop="estimatedStartTime" label="预计开工时间" width="180"></el-table-column>
          <el-table-column prop="estimatedEndTime" label="预计完工时间" width="180"></el-table-column>
          <el-table-column prop="estimatedNumber" label="预计完成数量" width="180"></el-table-column>
          <el-table-column prop="actualStartTime" label="实际开工时间" width="180"></el-table-column>
          <el-table-column prop="actualEndTime" label="实际完工时间" width="180"></el-table-column>
          <el-table-column prop="actualNumber" label="实际完成数量"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物料入库" name="3">
        <el-table :data="ProductionInfoMapPo.omgMaterielPutinWareBPoList" style="width: 100%">
          <el-table-column prop="procedureName" label="工序名称 " width="180"></el-table-column>
          <el-table-column prop="memo" label="备注" width="180"></el-table-column>
          <el-table-column prop="chargeTime" label="经办时间" width="180"></el-table-column>
          <el-table-column prop="PutinWareName" label="经办人"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="SMT" name="4">
        <el-table :data="ProductionInfoMapPo.omgProductionSmtBPoList" style="width: 100%">
          <el-table-column prop="procedureName" label="工序" width="180"></el-table-column>
          <el-table-column prop="workStartTime" label="开工时间" width="180"></el-table-column>
          <el-table-column prop="workEndTime" label="完工时间" width="180"></el-table-column>
          <el-table-column prop="workEndNum" label="完成数量"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="DIP" name="5">
        <el-table :data="ProductionInfoMapPo.omgProductionDipBPoList" style="width: 100%">
          <el-table-column prop="procedureName" label="工序" width="180"></el-table-column>
          <el-table-column prop="workStartTime" label="开工时间" width="180"></el-table-column>
          <el-table-column prop="workEndTime" label="完工时间" width="180"></el-table-column>
          <el-table-column prop="workEndNum" label="完成数量"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="成品出库" name="6">
        <el-table :data="ProductionInfoMapPo.omgPrduFinishPutoutBPoList" style="width: 100%">
          <el-table-column prop="chargePsnShow" label="经办人" width="180"></el-table-column>
          <el-table-column prop="chargeTime" label="经办时间"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="通知开票" name="7">
        <el-table :data="ProductionInfoMapPo.omgNoticeInvoicePoList" style="width: 100%">
          <el-table-column prop="billNumber" label="交货数量"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { selectProductionInfoByPkProductB } from '@/api/constracinfo/constracinfo'

export default {
  name: 'ProductionInfoContentViewShow',
  props: ["visiable", 'pkProductOrderB'],
  data() {
    return {
      activeName: '1',
      contentVisiable: false,
      ProductionInfoMapPo: {
        orderCreationtime: '', // 合同签订日期
        scheduledtime: '', // 预计交货日期
        customerCode: '', // 客户编码
        contractNo: '', // 合同号
        orderType: '', // 合同类型
        productCode: '', // 产品编号
        productName: '' , // 产品名称
        model: '', // 产品型号
        psnName: '', // 销售负责人
        materialSource: '', // 物料来源
        steelMeshSource: '', // 钢网来源
        pcbSource: '', // PCB来源
        sealTechnics: '', // 焊接工艺
        estimatedOverTime: '', // 预计到货日期
        purchaseName: '', // 采购负责人
        qualityName: '', // 来料质检负责人
        qualityTime: '', // 来料质检时间
        qualityState: '', // 来料质检状态
        OrderState: '', // 订单状态
        productionState: '', // 合同生产状态
        omgOrderPlanBPoList: [] , // 生产计划list
        omgMaterielPutinWareBPoList: [], // 物料入库
        omgProductionSmtBPoList: [], // smt
        omgProductionDipBPoList: [], // dip
        omgPrduFinishPutoutBPoList: [], // 成品出库list
        omgNoticeInvoicePoList: [], // 通知开票list
      }, // 生产流程详情PO

      orderTypeOptions: [
          { value: '0', label: '普通合同' },
          { value: '1', label: '生产订单' },
          { value: '2', label: 'OEM' },
          { value: '3', label: 'DEM' },
          { value: '4', label: '贸易模式' }
        ],
      materialSourceOption: [ // 物料来源
          { value: '1', label: '甲方提供' },
          { value: '2', label: '乙方提供' },
          { value: '3', label: '部分甲方提供' }
        ],
      steelMeshSourceOption: [ // 钢网来源
          { value: '0', label: '无' },
          { value: '1', label: '甲方提供' },
          { value: '2', label: '乙方提供' }
        ],
      pcbSourceOptions: [
      { value: '1', label: '无' },
          { value: '2', label: '有' },
      ],
      sealTechnicsOption: [ // 焊接工艺
        { value: '0', label: '无铅' },
        { value: '1', label: '有铅' },
        { value: '2', label: 'RoSH' }
      ],
      productionStateOptions: [
        { value: '0', label: '自由态' },
        { value: '1', label: '生产中' },
        { value: '2', label: '暂停(未启用)' },
        { value: '3', label: '生产完成' },
        { value: '4', label: '一键暂停' }
      ]
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable == true) {
        this.initProductionInfoMapPo()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    initProductionInfoMapPo() {
      debugger
      this.restProductionInfoMapPo()
      let queryParam = {
        pkProductOrderB: this.pkProductOrderB
      }
      selectProductionInfoByPkProductB(queryParam).then((response) => {
        if (response && response.success && response.object[0]) {
          this.ProductionInfoMapPo = response.object[0]
          console.log(this.ProductionInfoMapPo)
        }
      })
    },
    // 刷新生产流程数据
    restProductionInfoMapPo() {
      this.ProductionInfoMapPo = {
        orderCreationtime: '', // 合同签订日期
        scheduledtime: '', // 预计交货日期
        customerCode: '', // 客户编码
        contractNo: '', // 合同号
        orderType: '', // 合同类型
        productCode: '', // 产品编号
        productName: '' , // 产品名称
        model: '', // 产品型号
        psnName: '', // 销售负责人
        materialSource: '', // 物料来源
        steelMeshSource: '', // 钢网来源
        pcbSource: '', // PCB来源
        sealTechnics: '', // 焊接工艺
        estimatedOverTime: '', // 预计到货日期
        purchaseName: '', // 采购负责人
        qualityName: '', // 来料质检负责人
        qualityTime: '', // 来料质检时间
        qualityState: '', // 来料质检状态
        OrderState: '', // 订单状态
        productionState: '', // 合同生产状态
        omgOrderPlanBPoList: [] , // 生产计划list
        omgMaterielPutinWareBPoList: [], // 物料入库
        omgProductionSmtBPoList: [], // smt
        omgProductionDipBPoList: [], // dip
        omgPrduFinishPutoutBPoList: [], // 成品出库list
        omgNoticeInvoicePoList: [], // 通知开票list
      }
    }
  }
}
</script>

<style>

</style>