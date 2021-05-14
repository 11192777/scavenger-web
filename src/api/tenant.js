import request from '@/utils/request'


export default {

  getTenantList(listQuery) {
    return request({
      url: '/api/v1/tenants',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createTenant(tenant){
    return request({
      url: '/api/v1/tenant',
      method: 'post',
      data: tenant
    })
  }
}
