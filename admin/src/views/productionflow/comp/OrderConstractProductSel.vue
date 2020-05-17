<template>
  <div>
    <el-input class="input" placeholder="输入合同" v-model="menuFilterText" style="width:99%;"></el-input>
    <el-tree :data="contractOptionis" :props="defaultProps" @node-click="orderChange" :filter-node-method="filterNode" ref="treeComp">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="width:100%;">
        <span class="el-tree-node__label">{{ node.label }}</span>
        <span style="display:none">{{ data.pkProductOrder }}</span>
        <span>
          <!--<el-button type="text" size="mini">详 情</el-button>-->
        </span>
      </span>
    </el-tree>

    <!--合同订单详情数据-->
    
  </div>
</template>

<script>
import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage"

export default {
  name: 'OrderConstractProductSel',
  data() {
    return {
      menuFilterText: '', // 过滤条件
      contractOptionis: [], // 订单合同数据集合
      defaultProps: {
        children: 'children',
        label: 'contractNo'
      },
    }
  },
  created() {
    this.initConstractAndOrderProductList()
  },
  watch: {
    menuFilterText(val) {
      this.$refs.treeComp.filter(val)
    }
  },
  methods: {
    // 根据调教你过滤树结构
    filterNode(value, data) {
      if (!value) return true
      return data.contractNo.indexOf(value) !== -1
    },
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
    orderChange(data) {
      this.$emit('refreshTableList', data)
    }
  }
}
</script>

<style>
 el-tree-node__label{
   font-size: 8px;
 }
 .input .el-input__inner{
   margin-top: 15px;
   height: 35px;
   margin-left: 5px;
   text-align: center;
 }
</style>
