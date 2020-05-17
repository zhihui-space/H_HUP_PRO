<template>
  <div class="app-container">
    <el-tabs tab-position="top" style="height: 200px;">
      <!--密码登录-->
      <el-tab-pane label="密码登录信息">
        <el-button-group>
          <el-button type="primary" @click="viewState.passwordInfoState = false">编辑</el-button>
          <el-button type="primary" @click="updatePassword()">保存</el-button>
        </el-button-group>
        <hr/>
        <el-form :inline="true" ref="dataForm" label-position="left" label-width="150px">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="userSignInfo.password" :disabled="viewState.passwordInfoState"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="userSignInfo.newPassword" :disabled="viewState.passwordInfoState"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="确认新密码" prop="password">
            <el-input type="password" v-model="userSignInfo.confirmNewPassword" :disabled="viewState.passwordInfoState"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { updateCustomerPassword } from '@/api/customer/customer'

export default {
  data() {
    return {
      viewState: {
        // 密码登录信息
        passwordInfoState: true
      },
      // 用户密码登录信息
      userSignInfo: {
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  },
  methods: {
    updatePassword() {
      if (this.userSignInfo.newPassword === this.userSignInfo.confirmNewPassword) {
        let updateParam = {
          pkCustomer: this.$store.getters.userid,
          oldPassword: this.userSignInfo.password,
          newPassword: this.userSignInfo.newPassword
        }

        updateCustomerPassword(updateParam).then((response) => {
          this.viewState.passwordInfoState = true
          if (response.success) {
            this.$message.success('修改成功')
          } else {
            this.$message.success(response.message)
          }
        })
      } else {
        this.$message.warning('两次输入的新密码不一致!')
      }
    }
  }
}
</script>

<style>

</style>
