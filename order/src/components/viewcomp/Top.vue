<template>
    <div>
        <!--基础搜索框-->
        <div v-if="search_columns && search_columns.length > 0" style="float: left">
            <el-input placeholder="请输入搜索内容" v-model="search_val" class="input-with-select" style="width: 400px;" clearable @clear="clear">
                <el-select v-model="select_val" slot="prepend" placeholder="请选择" value="" style="width: 150px;">
                    <el-option :label="column.label" :value="column.prop" :key="index" v-for="(column , index) in search_columns"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>

        <!--快捷搜索框-->
        <div v-if="fastFilter" style="float: left; margin-left: 10px;">
          <el-select v-model="fastFilterVal[ffilter.filterColumn]" :key="findex" v-for="(ffilter , findex) in fastFilter" slot="prepend" placeholder="请选择" value="" style="width: 150px;">
              <el-option :label="fObj.label" :value="fObj.value" :key="index" v-for="(fObj , index) in ffilter.content"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </div>

        <el-button-group style="margin-left: 1rem;" :key="index" v-for="(btn, index) in topBtnsOC">
            <el-button type="primary" @click="clickBtn(btn.name, btn.code, btn.action)">{{btn.name}}</el-button>
        </el-button-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Top",
  props: ["fastFilter", "search_columns"],
  computed: {
    ...mapGetters([
      'topBtnsOC'
    ])
  },
  data () {
    return {
      search_val: '',
      select_val: '',
      fastFilterVal: {}
    }
  },
  methods: {
    search () {
      let paramProps = [{'selprop': this.select_val, 'selval': this.search_val}]
      // 初始快捷查询条件
      let fastFilter_val = this.fastFilterVal
      if (fastFilter_val) {
        for (let key in fastFilter_val) {
          if (key) {
            let paramPropOne = {'selprop': key, 'selval': fastFilter_val[key]}
            paramProps.push(paramPropOne)
          }
        }
      }
      // 触发查询逻辑
      this.$emit('getSearchData', paramProps)
    },
    clickBtn(name, code, action) {
      let param = {'btnName': name, 'btnCode': code, 'btnAction': action}
      this.$emit('onButtonClick', param)
    },
    clear(){
      this.search()
    }
  }
}
</script>

<style scoped>
div{
  padding: 3px;
}
</style>