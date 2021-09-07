import request from '@/utils/request'

export default {

  getTenantList(listQuery) {
    return request({
      url: '/api/tenant',
      method: 'get'
    })
  },

  updateTenant(tenantEntity) {
    return request({
      url: '/api/tenant',
      method: 'post',
      data: tenantEntity
    })
  }
}
