<template>
  <div>
    <!--基础列表界面-->
    <Table :columns="columns" 
      :fastFilter="fastFilter"
      :select="select" 
      :top_btn="top_btn" 
      :act_btn="act_btn" 
      :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--新增修改界面-->
    <Customdoccontent 
      :replace="replace"
      :visiable="content.visiable" 
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent">
    </Customdoccontent>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import Customdoccontent from '@/views/custominfo/psndocinfo/content'
import { selectAllBdCustomdocAsPage, saveCustomdoc, deleteBdCustomdocByPks } from '@/api/customer/customer'

export default {
  name: "PsndocInfo",
  components: { Table, Customdoccontent },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      columns: [
        {prop: 'pkCustomdoc', label: '主键', width: '10', primary: true},
        {prop: 'pkCustomer', label: '客户主键', width: '150', show: false},
        {prop: 'customname', label: '人员姓名', width: '160', search: true},
        {prop: 'telnum', label: '联系电话', width: '160'},
        {prop: 'sex', label: '性别', width: '160'},
        {prop: 'customtype', label: '人员类别', width: '160', show: false},
        {prop: 'customtypeShow', label: '人员类别', width: '160'},
        {prop: 'defaultis', label: '是否默认', width: '160'},
        {prop: 'creator', label: '创建人', width: '160', show: false},
        {prop: 'creationtime', label: '创建时间', width: '160', show: false},
        {prop: 'dr', label: '删除标志', width: '140', show: false},
        {prop: 'ts', label: '时间戳', width: '200', show: false}
      ],
      // 快捷过滤条件
      fastFilter: [
        { 
          content: [ 
            { value: '1', label: '采购联系人' }, 
            { value: '2', label: '技术联系人' }, 
            { value: '3', label: '其他人员' },
            { value: '', label: '全部人员' }
          ],
          filterColumn: 'customtype'
        }
      ],
      select: {
        'select': selectAllBdCustomdocAsPage,
        'queryParam': { pkCustomer: this.$store.getters.userid }
      },
      top_btn: [
        {name: '录入',code: 'ADD',action: saveCustomdoc }
      ],
      act_btn: [
        { name: '修改', code: 'UPDATE', action: saveCustomdoc },
        { name: '删除', code: 'DELETE', action: deleteBdCustomdocByPks },
        { name: '设为默认', code: 'SETDEFPSN', action: saveCustomdoc }
      ],
      replace: [
        {name: 'customtypeShow',replace: { '1': "采购联系人", '2': "技术联系人", '3': "其他人员"}},
      ]
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      // 录入
      if (param.btnCode === 'ADD') {
        this.openContent('录入', param.btnAction)
      }
      // 修改
      if (param.btnCode === 'UPDATE') {
        this.openContent('修改', param.btnAction)
        this.content.updateRow = param.bindData
      }
      // 设置为默认联系人
      if (param.btnCode === 'SETDEFPSN') {
        let rowData = param.bindData
        let defParam = {
          pkCustomdoc: rowData.pkCustomdoc, 
          pkCustomer: rowData.pkCustomer,
          customtype: rowData.customtype,
          defaultis: '是', 
          setdeflag: '是'
        }
        saveCustomdoc(defParam).then((response) => {
          this.queryListData()
        })
      }
    },
    queryListData() {
      let newSelect = {select: this.select.select, queryParam: { pkCustomer: this.$store.getters.userid } }
      this.select = newSelect
    },
    openContent(title, action) { // 打开内容界面Dialog
      this.content.visiable = true
      this.content.title = title
      this.content.action = action
    },
    closeContent(tempData) { // 关闭内容界面Dialog
      this.content.visiable = false
    }
  }
}
</script>

<style>

</style>

