<template>
  <el-dialog title="进度条" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
      <!--<el-steps :space="200" :active="1" finish-status="success">
        <el-step title="工艺审核"></el-step>
        <el-step title="生产计划"></el-step>
        <el-step title="库房备料"></el-step>
        <el-step title="物料采购"></el-step>
        <el-step title="来料质检"></el-step>
        <el-step title="物料入库"></el-step>
        <el-step title="SMT生产"></el-step>
        <el-step title="DIP生产"></el-step>
        <el-step title="成品质检"></el-step>
        <el-step title="成品入库"></el-step>
        <el-step title="成品出库"></el-step>
        <el-step title="通知开票"></el-step>
      </el-steps>-->

      <!--通过时间线的方式展示当前流程的节点信息-->
      <el-timeline>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            工艺审核
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('technicsBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            生产计划
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('orderPlanBillSate')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            库房备料
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('materielWareHuoseBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            物料采购
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('materielPurchaseBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            来料质检
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('materielQualityBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            物料入库
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('materielPutinWareBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            SMT生产
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('productionSmtBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            DIP生产
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('productionDipBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            成品质检
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('becomeBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            成品入库
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('prduFinishPutinBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
        <el-timeline-item icon="el-icon-more" color="#0bbd87" size="large">
            成品出库
            <br/><br/>
            <el-steps :space="100" :active="caseProductionBillState('prduFinishPutoutBillState')" finish-status="success">
                <el-step title="自由态"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成 "></el-step>
            </el-steps>
        </el-timeline-item>
      </el-timeline>
      <el-row>
      </el-row>
  </el-dialog>
</template>

<script>
import { selectProductionProccessFlowSteps } from '@/api/orderCompMage/orderCompMage'

export default {
    name: 'ProductionFlowStepsView',
    props: ['visiable', 'pkProductOrderB'],
    data() {
        return {
            contentVisiable: false,
            productionProccessFlowStates: null, // 生产流程中的涉及单据状态
        }
    },
    watch: {
        visiable() {
            this.contentVisiable = this.visiable
            if (this.visiable === true) {
                this.queryProductionProccessFlowStates()
            }
        }
    },
    methods: {
        closeDialog() {
            this.$emit("close", null)
        },
        // 查询生产流程中的单据状态
        queryProductionProccessFlowStates() {
            if (this.pkProductOrderB) {
                let queryParam = {
                    pkProductOrderB: this.pkProductOrderB
                }
                selectProductionProccessFlowSteps(queryParam).then((response) => {
                    if (response && response.success && response.object) {
                        this.productionProccessFlowStates = response.object
                    } else {
                        this.$message({ message: `查询失败:${response.message}`, type: 'error' })
                    }
                })
            }
        },
        // 计算生产流程当前进行到具体节点
        caseProductionBillState(billStateType) {
            if (this.productionProccessFlowStates && billStateType) {
                switch (billStateType) {
                    case 'technicsBillState': { // 工艺审核
                        if (this.productionProccessFlowStates.technicsBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.technicsBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.technicsBillState == '2') {
                            return 3
                        }
                    }
                    case 'orderPlanBillSate': { // 生产计划
                        if (this.productionProccessFlowStates.orderPlanBillSate == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.orderPlanBillSate == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.orderPlanBillSate == '2') {
                            return 3
                        }
                    }
                    case 'materielWareHuoseBillState': { // 库房备料
                        if (this.productionProccessFlowStates.materielWareHuoseBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.materielWareHuoseBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.materielWareHuoseBillState == '2') {
                            return 3
                        }
                    }
                    case 'materielPurchaseBillState': { // 物料采购
                        if (this.productionProccessFlowStates.materielPurchaseBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.materielPurchaseBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.materielPurchaseBillState == '2') {
                            return 3
                        }
                    }
                    case 'materielQualityBillState': { // 来料质检
                        if (this.productionProccessFlowStates.materielQualityBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.materielQualityBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.materielQualityBillState == '2') {
                            return 3
                        }
                    }
                    case 'materielPutinWareBillState': { // 物料入库
                        if (this.productionProccessFlowStates.materielPutinWareBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.materielPutinWareBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.materielPutinWareBillState == '2') {
                            return 3
                        }
                    }
                    case 'productionSmtBillState': { // SMT生产
                        if (this.productionProccessFlowStates.productionSmtBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.productionSmtBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.productionSmtBillState == '2') {
                            return 3
                        }
                    }
                    case 'productionDipBillState': { // DIP生产
                        if (this.productionProccessFlowStates.productionDipBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.productionDipBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.productionDipBillState == '2') {
                            return 3
                        }
                    }
                    case 'becomeBillState': { // 成品质检
                        if (this.productionProccessFlowStates.becomeBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.becomeBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.becomeBillState == '2') {
                            return 3
                        }
                    }
                    case 'prduFinishPutinBillState': { // 成品入库
                        if (this.productionProccessFlowStates.prduFinishPutinBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.prduFinishPutinBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.prduFinishPutinBillState == '2') {
                            return 3
                        }
                    }
                    case 'prduFinishPutoutBillState': { // 成品出库
                        if (this.productionProccessFlowStates.prduFinishPutoutBillState == '0') {
                            return 1
                        } else if (this.productionProccessFlowStates.prduFinishPutoutBillState == '1') {
                            return 2
                        } else if (this.productionProccessFlowStates.prduFinishPutoutBillState == '2') {
                            return 3
                        }
                    }
                    default : { 
                        return 0 
                    }
                }
            } else {
                return 0
            }
        }
    }
}
</script>

<style>

</style>