import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    tokenOC: getToken(),
    nameOC: '', 
    useridOC: null,
    pkCorpOC: null,
    unitnameOC: '',
    corpaddressOC: '',
    pkPsndocOC: null,
    customerTelOC: '',
    avatarOC: '',
    rolesOC: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.tokenOC = token
    },
    SET_NAME: (state, name) => {
      state.nameOC = name
    },
    SET_USERID: (state, userid) => {
      state.useridOC = userid
    },
    SET_PKCORP: (state, pkCorp) => {
      state.pkCorpOC = pkCorp
    },
    SET_UNITNAME: (state, unitname) => {
      state.unitnameOC = unitname
    },
    SET_CORPADDRESS: (state, corpaddress) => {
      state.corpaddressOC = corpaddress
    },
    SET_PKPSNDOC: (state, pkPsndoc) => {
      state.pkPsndocOC = pkPsndoc
    },
    SET_CUSTOMERTEL: (state, customerTel) => {
      state.customerTelOC = customerTel
    },
    SET_AVATAR: (state, avatar) => {
      state.avatarOC = avatar
    },
    SET_ROLES: (state, roles) => {
      state.rolesOC = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.singleType).then(response => {
          const data = response.object
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.userName)
          commit('SET_USERID', data.userid)
          commit('SET_PKCORP', data.pkCorp)
          commit('SET_UNITNAME', data.corpName)
          commit('SET_CORPADDRESS', data.corpaddress)
          commit('SET_PKPSNDOC', data.pkPsndoc)
          commit('SET_CUSTOMERTEL', data.customerTel)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.tokenOC).then(response => {
          const data = response.object
          if (data) {
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            }
            commit('SET_NAME', data.userName)
            commit('SET_USERID', data.userid)
            commit('SET_PKCORP', data.pkCorp)
            commit('SET_UNITNAME', data.corpName)
            commit('SET_CORPADDRESS', data.corpaddress)
            commit('SET_PKPSNDOC', data.pkPsndoc)
            commit('SET_CUSTOMERTEL', data.customerTel)
            commit('SET_AVATAR', data.avatar)
          } else {
            throw new Error('无效的登录信息');
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.tokenOC).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
