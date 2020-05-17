<template>
  <el-dialog title="微信登录" 
    :visible.sync="wechatVisiable" 
    @close="closeDialog"
    width="30%">
  </el-dialog>
</template>

<script>
export default {
  name: 'Wechatlogin',
  props: ['visiable'],
  data() {
    return {
      wechatVisiable: false, // dialog 显示框
    }
  },
  watch: {
    visiable() {
      this.wechatVisiable = this.visiable
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close', null)
    },
    sureDialog() {
      this.$emit('close', null)
    }
  }
}
</script>

<style>

</style>