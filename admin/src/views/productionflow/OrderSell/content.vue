<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="120px">
      <el-form-item label="关联订单产品" prop="pkProductOrderB">
        <el-select v-model="temp.pkProductOrderB" placeholder="请选择" >
          <el-option
            v-for="item in orderBProductSelOptions"
            :key="item.pkProductOrderB"
            :label="`${item.pkProductOrderB}-${item.name}-${item.code}`"
            :value="item.pkProductOrderB">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主题" prop="saleTheme">
        <el-input v-model="temp.saleTheme"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="saleContent">
        <el-input v-model="temp.saleContent"></el-input>
      </el-form-item>
      <el-form-item label="紧急状态" prop="state">
        <el-select v-model="temp.state" placeholder="请选择">
          <el-option
            v-for="item in saleStartStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人" prop="creatorShow">
        <el-input v-model="temp.creatorShow" :disabled="true"></el-input>
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
  name: 'OrderSaleStartDoEditContent',
  props: ["replace", "title", "visiable", 'action', 'updateRow', 'pkProductOrder'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      saleStartStateOptions: [ // 销售发起紧急状态
        { value: '0', label: '知会' },
        { value: '1', label: '预警' },
        { value: '2', label: '紧急' },
        { value: '3', label: '事故' }
      ],
      orderBProductSelOptions: [ // 选择关联订单字表数据

      ],
      temp: {
        pkOrderSaleStart: undefined,
        pkProductOrderB: '',
        saleTheme: '',
        saleContent: '',
        state: '',
        creator: '',
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
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
        this.action(actTemp).then((response) => {
          if (response.primary) {
            actTemp.pkOrderSaleStart = response.primary
          }
          if (response.success) {
            initReplaceAddData(actTemp, this.replace)
            this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
            this.$message({ message: '操作成功', type: 'success' })

            // 预置一遍订单合同主键
            actTemp.pkProductOrder = this.pkProductOrder
            this.$emit('close', actTemp)
          } else {
            this.$message({ message: `操作失败:${response.message}`, type: 'error' })
          }
        })
      }
      this.$emit('close', actTemp)
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkOrderSaleStart: undefined,
        pkProductOrderB: '',
        saleTheme: '',
        saleContent: '',
        state: '',
        creator: '',
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      }
    }
  }
}
</script>

<style scoped>

</style>
