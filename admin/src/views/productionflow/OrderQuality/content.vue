<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column prop="pkOmgPutinWare" label="物料入库主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="pkProductOrderB" label="订单字表主键" v-if="false" width="180">
      </el-table-column>
      <el-table-column prop="billState" label="单据状态" width="180">
      </el-table-column>
      <el-table-column prop="fileName" label="附件名称" width="180">
      </el-table-column>
      <el-table-column prop="chargePsn" label="经办人" width="180">
      </el-table-column>
      <el-table-column prop="chargeTime" label="经办时间" width="180">
      </el-table-column>
      <el-table-column prop="creationtime" label="上传时间">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectAllOmgBecomeSubDataAsPage } from '@/api/orderCompMage/OrderQuality'

export default {
  name: 'ProductionFlowOrderQualityContent',
  props: ["visiable", 'title', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 文件详情地址
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      if (this.visiable === true) {
        this.initFileDetailsListData()
      }
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgPutinWare) {
        let initQueryParam = {
          pkOmgProduDip: this.updateRow.pkOmgProduDip
        }
        selectAllOmgBecomeSubDataAsPage(initQueryParam).then((response) => {
          if (response && response.success) {
            this.fileDetailsList = response.object
          } else {
            this.fileDetailsList = []
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

