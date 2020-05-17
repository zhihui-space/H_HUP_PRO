<template>
  <el-dialog title="注册" 
    :visible.sync="registerVisiable" 
    @close="closeDialog"
    width="40%">
    <el-form :inline="true" ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="150px">
      <el-form-item label="销售负责人" prop="pkPsndoc">
        <el-select v-model="temp.pkPsndoc" placeholder="请选择">
          <el-option
            v-for="item in psndocOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名(手机号)" prop="registerUsername">
        <el-input v-model="temp.registerUsername"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="registerPassword">
        <el-input v-model="temp.registerPassword"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="temp.captcha"></el-input>
      </el-form-item>
      <el-button type="primary" :disabled="captchaBtn.disable" :class="{ codeGeting: captchaBtn.isGeting }" @click="getVerifyCode">{{captchaBtn.getCode}}</el-button>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="registerUser">注 册</el-button>
      <el-button @click="closeDialog">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { sendShortMsgByPhone, listBdPsndocAsRef, doRegister } from '@/api/login'
import { parseRefKeyInt } from '@/utils/viewCompUtil'

export default {
  name: 'RegisterDialog',
  props: ['visiable'],
  data() {
    // 校验手机号
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      registerVisiable: false, // dialog 显示框
      rules: {
        registerUsername: [
          {validator: checkPhone, trigger: 'blur'},
        ],
        registerPassword: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ],
      },
      temp: {
        pkPsndoc: null, // 销售负责人
        registerUsername: '', // 注册手机号
        registerPassword: '', // 注册密码
        captcha: '', // 验证码
      },
      captchaBtn: {
        getCode: '获取验证码',
        isGeting: false,
        count: 60,
        disable: false,
        shortMsgCaptcha: '', // 验证码
      },
      // 人员信息参照
      psndocOption: [],
    }
  },
  watch: {
    visiable() {
      this.registerVisiable = this.visiable
    }
  },
  created() {
    // 初始人员信息参照
    let psndocRefParam = {pkPsntypeName: '销售人员'}
    listBdPsndocAsRef(psndocRefParam).then((response) => {
      this.psndocOption = response.object
      parseRefKeyInt(this.psndocOption)
    })
  },
  methods: {
    closeDialog() {
      this.$emit('close', null)
    },
    getVerifyCode(){
      let registerUsername = this.temp.registerUsername;
      sendShortMsgByPhone(registerUsername).then((response) => {
        if (response.success) {
          this.captchaBtn.shortMsgCaptcha = response.object.captcha
          this.captchaBtn.isGeting = true;
          this.captchaBtn.disable = true;
          this.captchaBtn.getCode = this.captchaBtn.count-- + 's后重发';
          var countDown = setInterval(()=>{
            if (this.captchaBtn.count < 1) {
              this.captchaBtn.isGeting = false;
              this.captchaBtn.disable = false;
              this.captchaBtn.getCode = '获取验证码';
              this.captchaBtn.count = 60;
              clearInterval(countDown);
            } else {
              this.captchaBtn.isGeting = true;
              this.captchaBtn.disable = true;
              this.captchaBtn.getCode = this.captchaBtn.count-- + 's后重发';
            }
          }, 1000);
        } else {
          this.captchaBtn.isGeting = false;
          this.captchaBtn.disable = false;
          this.captchaBtn.getCode = '获取验证码';
          this.captchaBtn.count = 60;
        }
      })
    },
    registerUser() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          debugger
          if (this.captchaBtn.shortMsgCaptcha === this.temp.captcha) {
            doRegister(this.temp.pkPsndoc, this.temp.registerUsername, 
              this.temp.registerPassword, this.temp.captcha).then((response) => {
              if (response.success) {
                this.$message({ message: '注册成功，请登录！', type: 'success' })
                this.$emit('close', null)
              } else {
                this.$message({ message: '注册失败！', type: 'error' })
              }
            })
          } else {
            this.$message({ message: '验证码错误！', type: 'error' })
          }
        }
      })
    }
  }
}
</script>

<style>
  .codeGeting{
    background: #cdcdcd;
    border-color: #cdcdcd;
  }
</style>