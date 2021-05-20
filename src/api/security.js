import request from '@/utils/request'

export default {

  getSecurity() {
    return request({
      url: '/api/v1/security',
      method: 'get'
    })
  }

}
