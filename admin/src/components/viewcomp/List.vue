<template>
  <el-table 
    :data="listData" 
    border 
    fit 
    @selection-change="selsChange" 
    @row-click="rowClick" 
    :row-style="{height:'2px'}"
    :cell-style="{padding:'3px 0'}"
    :header-cell-style="(row,column,rowIndex,columnIndex) => {return 'background:#F5F7FA;'}"

  >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" width="80" label="序号"></el-table-column>
    <el-table-column 
      v-for="(column , index) in fixedLeftColumns" 
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :width="column.width">
    </el-table-column>
    <!--常规字段-->
    <el-table-column 
      v-for="(column , index) in columns" 
      v-if="column.primary === true ? false : true"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :width="column.width">
    </el-table-column>
    <!--操作栏-->
    <el-table-column label="操作栏" fixed="right" :width="actWidth">
      <template slot-scope="scope">
        <el-button v-for="(btn, index) in actBtns"
          v-if="checkBtnIsShow(btn, scope.row).show"
          :icon="btn.iconPic == null ? '' : btn.iconPic"
          :size="btn.btnSize == null ? '' : btn.btnSize"
          :key="index"
          @click="buttonFunction(btn.name, btn.code, btn.action, scope.row)">
          {{btn.name}}
        </el-button>
        <i v-for="(btn, index) in actBtns" 
         v-if="checkITagBtnIsShow(btn, scope.row).show"
         :class="btn.iconPic == null ? '' : btn.iconPic"
         :key="index"
         @click="buttonFunction(btn.name, btn.code, btn.action, scope.row)">
        </i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "List",
    props: ["replace"],
    computed: {
      ...mapGetters([
        'listData', 'fixedLeftColumns', 'columns', 'actBtns', 'actWidth'
      ])
    },
    data() {
      return {
        sels: []// 选中的列表
      }
    },
    created() {
      this.sels = []// 选中的列表
    },
    methods: {
      // 校验当前按钮是否显示
      checkBtnIsShow(btn, row) {
        let defaultShow = true // 默认显示
        if (btn && row) {
          let btnWhen = btn.when
          if (btnWhen) {
            defaultShow = false // 如果有when属性默认按钮为不显示
            for (let key in btnWhen) {
              let caseValueArr = btnWhen[key] // 条件值数组
              let rowDataVal = this.initRealValueByReplace(row[key])
              if (caseValueArr) {
                for (let caseIndex in caseValueArr) {
                  if (caseValueArr[caseIndex] == rowDataVal) {
                    defaultShow = true
                  }
                }
              }
            }
          }
          // 如果 typeLess为itag 不显示
          if (btn.typeLess === 'itag') {
            defaultShow = false
          }
        }
        return {show: defaultShow}
      },
      // 校验当前I标签按钮是否显示
      checkITagBtnIsShow(btn, row) {
        let defaultShow = true // 默认显示
        if (btn && row) {
          let btnWhen = btn.when
          if (btnWhen) {
            defaultShow = false // 如果有when属性默认按钮为不显示
            for (let key in btnWhen) {
              let caseValueArr = btnWhen[key] // 条件值数组
              let rowDataVal = this.initRealValueByReplace(row[key])
              if (caseValueArr) {
                for (let caseIndex in caseValueArr) {
                  if (caseValueArr[caseIndex] == rowDataVal) {
                    defaultShow = true
                  }
                }
              }
            }
          }
        }
        return {show: defaultShow}
      },
      // 将显示的值还原为真实的值
      initRealValueByReplace(showValue) {
        let replace = this.replace
        if (showValue && replace) {
          for (let index in replace) {
            let porp = replace[index].name
            let repVal = replace[index].replace
            for (let key in repVal) {
              let rpValue = repVal[key]
              if (showValue === rpValue) {
                showValue = key
                return showValue
              }
            }
          }
        }
        return showValue;
      },
      buttonFunction(name, code, action, row) {
        let param = {'btnName': name, 'btnCode': code, 'btnAction': action, 'bindData': row}
        this.$emit('onButtonClick', param)
      },
      rowClick(row, event, column) { // 列表中的行被点击后
        let param = {'btnName': 'rowClick', 'btnCode': 'rowClick', 'bindData': row}
        this.$emit('onButtonClick', param)
      },
      selsChange(sels) {// 更新选中列表的值
        this.sels = sels
        this.$emit('refreshSelList', sels)
      }
    }
}
</script>

<style scoped>
  div{
    font-size: 8px;
  }
  i{
    font-size: 15px;
    padding-left: 10px;
    cursor:pointer
  }
</style>