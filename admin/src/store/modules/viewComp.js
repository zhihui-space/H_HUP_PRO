const viewComp = {
  state: {
    fixedLeftColumns: [], // 左边列表固定列
    columns: [], // 列表字段
    listData: [], // 列表数据
    topBtns: [], // 页面顶部按钮集合
    actBtns: [], // 操作栏按钮
    actWidth: null // 操作栏宽度
  },

  mutations: {
    SET_FIXEDLEFT_COLUMNS: (state, fixedLeftColumns) => { // 左边列表固定列
      if (typeof fixedLeftColumns === 'object') {
        state.fixedLeftColumns = fixedLeftColumns
      } else {
        console.log(`Set fixedLeftColumns Type error:${fixedLeftColumns}`)
      }
    },
    SET_COLUMNS: (state, columns) => {
      if (typeof columns === 'object') {
        state.columns = columns
      } else {
        console.log(`Set columns Type error:${columns}`)
      }
    },
    SET_LISTDATA: (state, listData) => { // vuex中存放列表数据
      if (typeof listData === 'object') {
        state.listData = listData
      } else {
        console.log(`Set listData Type error:${listData}`)
      }
    },
    SET_TOPBUTTON: (state, topBtns) => { // 保存顶部按钮数据
      if (typeof topBtns === 'object') {
        state.topBtns = topBtns
      } else {
        console.log(`Set topBtns Type error:${topBtns}`)
      }
    },
    SET_ACTBUTTON: (state, actBtns) => { // 保存操栏按钮数据
      if (typeof actBtns === 'object') {
        state.actBtns = actBtns
      } else {
        console.log(`Set actBtns Type error:${actBtns}`)
      }
    },
    SET_ACTWIDTH: (state, actWidth) => { // 保存操栏长度
      state.actWidth = actWidth
    },
    HANDLE_LISTVIEW_DATA: (state, temp) => { // 新增、修改后处理界面数据
      // 主键字段
      const getPrimaryFun = () => {
        if (state.columns) {
          for (let index in state.columns) {
            let colOne = state.columns[index]
            if (colOne && colOne.primary === true) {
              return colOne.prop
            }
          }
        }
        return ''
      }
      let primaryProp = getPrimaryFun()

      let isUpdate = false
      if (primaryProp && temp[primaryProp]) { // 修改
        for (const v of state.listData) {
          if (v[primaryProp] === temp[primaryProp]) {
            const index = state.listData.indexOf(v)
            state.listData.splice(index, 1, temp)
            isUpdate = true
            break
          }
        }
      }
      if (isUpdate === false && primaryProp) {
        state.listData.unshift(temp)
      }
      // end 
    }
  }
  
}

export default viewComp