import request from '@/utils/request'

// 用户登陆
export function login(userName, userPassword, singleType) {
  return request({
    url: '/systemController/customerLogin',
    method: 'post',
    data: {
      tel: userName,
      password: userPassword,
      singleType: singleType
    }
  })
}

// 用户登出
export function logout(token) {
  return request({
    url: '/systemController/logout',
    method: 'get',
    params: { token }
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/systemController/getCustomerInfo',
    method: 'get',
    params: { token }
  })
}

// 用户注册验证码发送
export function sendShortMsgByPhone(registerUsername) {
  return request({
    url: '/shortMsgController/sendShortMsgByPhone',
    method: 'post',
    data: {
      registerUsername: registerUsername
    }
  })
}

// 查询所有人员信息档案作为参照
export function listBdPsndocAsRef(data) {
  return request({
      url: '/registerController/selectAllBdPsndocAsRef',
      method: 'post',
      data
  })
}

// 注册用户
export function doRegister(pkPsndoc, registerUsername, registerPassword, captcha) {
  return request({
    url: '/registerController/register',
    method: 'post',
    data: {
      pkPsndoc: pkPsndoc,
      registerUsername: registerUsername,
      registerPassword: registerPassword,
      captcha: captcha
    }
  })
}
