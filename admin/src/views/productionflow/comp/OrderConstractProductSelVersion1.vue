<template>
  <div>
    <!--选择合同-->
    <el-select v-model="selContractVal" multiple placeholder="请选择" @change="productMate">
      <el-option
        v-for="item in contractOptionis"
        :key="item.pkProductOrder"
        :label="item.contractNo"
        :value="item.pkProductOrder"
      ></el-option>
    </el-select>

    <!--选择产品-->
    <el-select v-model="selOrderProductVal" multiple placeholder="请选择" @change="getViewDataList">
      <el-option
        v-for="item in orderProductOptions"
        :key="item.pkProductOrderB"
        :label="`${item.name}-${item.code}`"
        :value="item.pkProductOrderB"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage"

export default {
  name: 'OrderConstractProductSel',
  data() {
    return {
      selContractVal: [], // 选中的合同信息
      contractOptionis: [
        
      ],
      selOrderProductVal: [], // 选中的合同字表产品信息
      orderProductOptions: [

      ],
      defaultProps: {
        children: 'children',
        label: 'contractNo'
      }
    }
  },
  created() {
    this.initConstractAndOrderProductList()
  },
  methods: {
    // 初始化合同及产品选择
    initConstractAndOrderProductList() {
      let initOptionsParam = {
        dr: 0
      }
      selectOrderInfoAsRef(initOptionsParam).then((response) => {
        if (response && response.success && response.object) {
          this.contractOptionis = response.object
        } else {
          this.contractOptionis = []
        }
      })
    },
    // 点击合同详情调用根据合同查询数据接口
    orderChange() {
      this.$emit('refreshTableList', null)
    },
    // 根据选择合同匹配合同子表中的产品信息
    productMate() {
      // 置空选择产对象属性
      this.selOrderProductVal = []
      this.orderProductOptions = []

      let selContractVal = this.selContractVal // 当前选中的合同
      let contractOptionis = this.contractOptionis // 当前合同参照 
      
      if (selContractVal && contractOptionis) {
        selContractVal.forEach((element) => {
          if (element) { // 选中的一个合同
            const mateConstractIndex = contractOptionis.findIndex(contractOption => contractOption.pkProductOrder === element)
            
            // 匹配成功的合同信息
            let constractOptOne = contractOptionis[mateConstractIndex]
            if (constractOptOne && constractOptOne.orderCompMageProductPoList) {
              let orderCompMageProductPoList = constractOptOne.orderCompMageProductPoList
              orderCompMageProductPoList.forEach((orderBProductOne) => {
                if (orderBProductOne) {
                  this.orderProductOptions.push(orderBProductOne)
                }
              })
            }
          }
        })
      }
    },
    // 刷新界面数据信息
    getViewDataList() {
      this.$emit('refreshTableList', null)
    }
  }
}
</script>

<style scoped>

</style>
