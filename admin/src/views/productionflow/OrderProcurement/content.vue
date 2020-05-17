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
      <el-form-item label="预计齐料时间" prop="estimatedOverTime">
        <el-date-picker
          v-model="temp.estimatedOverTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="型号" prop="model">
        <el-input v-model="temp.model"></el-input>
      </el-form-item>
      <el-form-item label="成本单价(未税)" prop="costUnitPriceNt">
        <el-input v-model="temp.costUnitPriceNt"></el-input>
      </el-form-item>
      <el-form-item label="成品金额(未税)" prop="finishAmountNt">
        <el-input v-model="temp.finishAmountNt"></el-input>
      </el-form-item>
      <el-form-item label="价税合计" prop="priceTaxTotal">
        <el-input v-model="temp.priceTaxTotal"></el-input>
      </el-form-item>
      <el-form-item label="单据状态" prop="billState">
        <el-select v-model="temp.billState" clearable placeholder="请选择" :disabled="true">
          <el-option
            v-for="item in billStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="creationtime">
        <el-input v-model="temp.creationtime" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

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

export default {
  name: 'ProductionFlowOrderProcurementContent',
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

      billStateOptions: [
        { value: '0', label: '自由态' },
        { value: '1', label: '进行中' },
        { value: '2', label: '已完成' }
      ],

      temp: {
        pkOmgMaterielPurchase: undefined, // 物料采购主键
        pkProductOrderB: null, // 订单子表主键
        model: '', // 型号
        costUnitPriceNt: null, // 成本单价(未税)
        finishAmountNt: null, // 成品金额(未税)
        priceTaxTotal: null, // 价税合计
        billState: null, // 单据状态
        estimatedOverTime: '', // 预计齐料时间
        chargePsn: '', // 经办人
        creator: '', // 创建人 
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      }
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
    }
  },
  methods: {
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
      const actTemp = this.temp
      if (this.action) {
        initReplaceUpdateData(actTemp, this.replace)
        actTemp.estimatedOverTime = parseTime(actTemp.estimatedOverTime)
        this.action(actTemp).then((response) => {
          if (response.primary) {
            actTemp.pkOmgMaterielPurchase = response.primary
          }
          if (response.success) {
            initReplaceAddData(actTemp, this.replace)
            this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
            this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
        })
      }
      this.$emit('close', actTemp)
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkOmgMaterielPurchase: undefined, // 物料采购主键
        pkProductOrderB: null, // 订单子表主键
        model: '', // 型号
        costUnitPriceNt: null, // 成本单价(未税)
        finishAmountNt: null, // 成品金额(未税)
        priceTaxTotal: null, // 价税合计
        billState: null, // 单据状态
        estimatedOverTime: '', // 预计齐料时间
        chargePsn: '', // 经办人
        creator: '', // 创建人 
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()) // 时间戳
      }
    }
  }
}
</script>

<style scoped>

</style>
