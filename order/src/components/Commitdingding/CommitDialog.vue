<template>
  <el-dialog title="通知钉钉" 
    :visible.sync="dialogVisiable" 
    @close="closeDialog"
    width="40%">

    <div class="block">
      <span class="demonstration">请选择需要通知消息的人员：</span>
      <br/><br/>
      <el-cascader
        v-model="dingPsnArr"
        placeholder="试试搜索"
        :options="options"
        :props="cascaderprops"
        :show-all-levels="false"
        clearable
        filterable></el-cascader>

        <br/><br/><hr/>
        <span class="demonstration">通知消息内容：</span>
        <br/><br/>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="dingMessage">
        </el-input>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog">确 定</el-button>
    </span>

  </el-dialog>
</template>

<script>
import { listDeptCascadePsndoc } from '@/api/orgs/bddept'

export default {
  name: 'CommitDialog',
  props: ["visiable", "paramData"],
  data() {
    return {
      cascaderprops: { multiple: true },
      dialogVisiable: false,
      options: [],
      dingPsnArr: [],
      dingMessage: ''
    }
  },
  watch: {
    visiable() {
      this.dialogVisiable = this.visiable
    }
  },
  created() {
    let queryParam = { pkCorp: 2 }
    listDeptCascadePsndoc(queryParam).then((response) => {
      if (response.success) {
        this.options = response.object
      }
    })
  },
  methods: {
    // 保存关闭
    sureDialog() {
      console.log(this.dingPsnArr[0])
      let sendMsgParam = {
        paramData: this.paramData,
        dingPsnArr: this.dingPsnArr[0], 
        dingMessage: this.dingMessage
      }
      this.$emit('commitMethod', sendMsgParam)
      this.$emit('close', null)
    },
    // 取消关闭
    closeDialog() {
      this.$emit('close', null)
    }
  }
}
</script>

<style>

</style>
