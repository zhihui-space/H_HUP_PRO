<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="60%">
    <el-form :inline="true" ref="dataForm" :model="temp" label-position="left" label-width="150px">
      <el-form-item label="人员名称" prop="customname">
        <el-input v-model="temp.customname"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="telnum">
        <el-input v-model="temp.telnum"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="temp.sex" placeholder="请选择">
          <el-option
            v-for="item in sexOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="人员类别" prop="customtype">
        <el-select v-model="temp.customtype" placeholder="请选择">
          <el-option
            v-for="item in customdocPsnTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否默认联系人" prop="defaultis">
        <el-select v-model="temp.defaultis" placeholder="请选择">
          <el-option
            v-for="item in defaultisOption"
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

export default {
  name: 'Customdoccontent',
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  computed: {
    ...mapGetters([
      'listDataOC', 'columnsOC', 'nameOC'
    ])
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      // 性别Option
      sexOption: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ],
      // 是或否
      defaultisOption: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],
      // 客户人员信息类别option
      customdocPsnTypeOption: [
        { value: '1', label: '采购联系人' },
        { value: '2', label: '技术联系人' },
        { value: '3', label: '其他人员' }
      ],
      temp: {
        pkCustomdoc: undefined,
        pkCustomer: null,
        customname: '',
        telnum: '',
        sex: '',
        customtype: '',
        defaultis: '',
        creator: null,
        creatorShow: '',
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
    }
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    sureDialog() { // 确定保存回调Dialog
      const actTemp = this.temp
      if (this.action) {
        initReplaceUpdateData(actTemp, this.replace)
        this.action(actTemp).then((response) => {
          if (response.primary) {
            actTemp.pkCustomdoc = response.primary
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
        pkCustomdoc: undefined,
        pkCustomer: this.$store.getters.useridOC,
        customname: '',
        telnum: '',
        sex: '',
        customtype: '',
        defaultis: '否',
        creator: this.$store.getters.useridOC,
        creatorShow: this.$store.getters.nameOC,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      }
    }
  }
}
</script>

<style>

</style>
