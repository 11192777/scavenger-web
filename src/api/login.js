import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/v1/user/login/account',
    method: 'get',
    params:{
      account: username,
      password: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/token',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
