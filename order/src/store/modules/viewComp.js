const viewComp = {
  state: {
    fixedLeftColumnsOC: [], // 左边列表固定列
    columnsOC: [], // 列表字段
    listDataOC: [], // 列表数据
    topBtnsOC: [], // 页面顶部按钮集合
    actBtnsOC: [], // 操作栏按钮
    actWidthOC: null // 操作栏宽度
  },

  mutations: {
    SET_FIXEDLEFT_COLUMNS: (state, fixedLeftColumns) => { // 左边列表固定列
      if (typeof fixedLeftColumns === 'object') {
        state.fixedLeftColumnsOC = fixedLeftColumns
      } else {
        console.log(`Set fixedLeftColumns Type error:${fixedLeftColumns}`)
      }
    },
    SET_COLUMNS: (state, columns) => {
      if (typeof columns === 'object') {
        state.columnsOC = columns
      } else {
        console.log(`Set columns Type error:${columns}`)
      }
    },
    SET_LISTDATA: (state, listData) => { // vuex中存放列表数据
      if (typeof listData === 'object') {
        state.listDataOC = listData
      } else {
        console.log(`Set listData Type error:${listData}`)
      }
    },
    SET_TOPBUTTON: (state, topBtns) => { // 保存顶部按钮数据
      if (typeof topBtns === 'object') {
        state.topBtnsOC = topBtns
      } else {
        console.log(`Set topBtns Type error:${topBtns}`)
      }
    },
    SET_ACTBUTTON: (state, actBtns) => { // 保存操栏按钮数据
      if (typeof actBtns === 'object') {
        state.actBtnsOC = actBtns
      } else {
        console.log(`Set actBtns Type error:${actBtns}`)
      }
    },
    SET_ACTWIDTH: (state, actWidth) => { // 保存操栏长度
      state.actWidthOC = actWidth
    },
    HANDLE_LISTVIEW_DATA: (state, temp) => { // 新增、修改后处理界面数据
      // 主键字段
      const getPrimaryFun = () => {
        if (state.columnsOC) {
          for (let index in state.columnsOC) {
            let colOne = state.columnsOC[index]
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
        for (const v of state.listDataOC) {
          if (v[primaryProp] === temp[primaryProp]) {
            const index = state.listDataOC.indexOf(v)
            state.listDataOC.splice(index, 1, temp)
            isUpdate = true
            break
          }
        }
      }
      if (isUpdate === false && primaryProp) {
        state.listDataOC.unshift(temp)
      }
      // end 
    }
  }
  
}

export default viewComp