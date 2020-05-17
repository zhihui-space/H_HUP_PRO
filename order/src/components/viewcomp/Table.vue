<template>
  <div>
    <Top :search_columns="search_columns" 
      :fastFilter="fastFilter"
      @getSearchData="getSearchData" 
      @onButtonClick="onButtonClick">
    </Top>

    <List style="min-height: 550px" :replace="replace" @onButtonClick="onButtonClick"></List>

    <pagination 
      v-show="total>0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="getList" />
  </div>
</template>

<script>
import List from "@/components/viewcomp/List"
import Top from "@/components/viewcomp/Top"
import Pagination from '@/components/Pagination'

export default {
  name: "Table",
  props: ["fastFilter", "select", "columns", "top_btn", "act_btn", "replace"],
  components: { Top, List, Pagination },
  data(){
    return {
      search_columns: [], // 查询字段
      title: '',
      searchData: [], // 查询结果数据
      listData: [], // 列表数据
      total: 0, // 数据量
      listQuery: {
        page: 1,
        limit: 20,
      }
    }
  },
  watch: {
    // 监听查询参数变化
    select(val) {
      if (val.queryParam) {
        for (let key in val.queryParam) {
          this.listQuery[key] = val.queryParam[key]
        }
        this.getList()
      }
    }
  },
  created() {
    // 初始过滤条件
    if (this.select.queryParam) {
      for (let key in this.select.queryParam) {
        this.listQuery[key] = this.select.queryParam[key]
      }
    }
    // 初始化表头信息
    let columns = this.columns
    let fixedLeftColumns = []
    let listColumns = []
    for(let index in columns) {
      let columnOne = columns[index]
      if (columnOne.search) { // 搜索字段
        this.search_columns.push(columnOne)
      }
      // 固定左边列字段
      if (columnOne.show !== false && columnOne.fixedLeft === true) {
        fixedLeftColumns.push(columnOne)
      }
      // 常规字段
      if (columnOne.show !== false && columnOne.fixedLeft !== true) {
        listColumns.push(columnOne)
      }
    }
    this.$store.commit('SET_FIXEDLEFT_COLUMNS', fixedLeftColumns)
    this.$store.commit('SET_COLUMNS', listColumns)

    // 初始化查询
    this.getList()

    // 初始化顶部组件按钮组
    const topButtons = this.top_btn
    if (topButtons && typeof topButtons === 'object' && topButtons.length> 0) {
      this.$store.commit('SET_TOPBUTTON', topButtons)
    }

    //初始化操作栏按钮
    const actionButtons =  this.act_btn
    if (actionButtons && typeof actionButtons === 'object' && actionButtons.length> 0) {
      this.$store.commit('SET_ACTBUTTON', actionButtons)
      // 判断是否设置了宽度
      if (actionButtons[0].width) {
        this.$store.commit('SET_ACTWIDTH', actionButtons[0].width)
      } else {
        this.$store.commit('SET_ACTWIDTH', null)
      }
    }
  },
  methods: {
    getList() {
      // 查询列表数据
      if (this.select && this.select.select) {
        let selectFunc = this.select.select
        selectFunc(this.listQuery).then((response) => {
          let listData = response.object
          this.total = response.total
          this.initReplaceData(listData)
        })
      }
    },
    initReplaceData(result){
      // 数据格式化
      if (result) {
        // 替换字段格式化
        const replace = this.replace
        if (result) {
          if (replace) {
            for (let index in replace) {
              let r = replace[index]
              let prop = r.name
              let doReplace = r.replace
              for (let j in result) {
                let valueForResult = result[j][prop]
                for (let key in doReplace) {
                  let value = doReplace[key]
                  if (valueForResult == key) {
                    result[j][prop] = value
                  }
                }
              }
            }
          }
        }
      }
      this.$store.commit('SET_LISTDATA', result)
    },
    getSearchData(params) { // 通过查询条件查询数据并返回
      if (params) {
        for (let index in params) {
          if (params[index]) {
            let selprop = params[index].selprop // 查询字段
            let selval = params[index].selval // 查询字段内容
            
            if (selprop) {
              this.listQuery[selprop] = selval
            } 
          }
        }
      }
      this.getList()
    },
    onButtonClick(param) { // 点击按钮触发的事件
      if (param) {
        let btnCode = param.btnCode
        switch (btnCode) {
          case 'DELETE': 
            let bindRow = param.bindData // 当前行数据
            let deleteAction = param.btnAction // 删除Action
            let rowPrimary = this.findPrimaryColumn()
            if (deleteAction) {
              let deleteParam = {pkArr: bindRow[rowPrimary]}
              deleteAction(deleteParam).then((response) => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getList()
              })
            }
            break
          default:
            break
        }
        this.$emit('onButtonClick', param)
      }
    },
    findPrimaryColumn() { // 获取列中的主键
      let columns = this.columns
      if (columns) {
        for (let index in columns) {
          let colOne = columns[index]
          if (colOne && colOne.primary === true) {
            return colOne.prop
          }
        }
      }
      return 'HAVE_NOT_PRIMARY'
    }
  }
}
</script>

<style scoped>

</style>