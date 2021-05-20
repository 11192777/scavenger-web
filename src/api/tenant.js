import request from '@/utils/request'


export default {

  getTenantList(listQuery) {
    return request({
      url: '/api/v1/tenants',
      method: 'get',
      params: {
        page: listQuery == null ? null : listQuery.page,
        limit: listQuery == null ? null : listQuery.limit
      }
    })
  },

  createTenant(tenant){
    return request({
      url: '/api/v1/tenant',
      method: 'post',
      data: tenant
    })
  },
  updateTenant(id, status){
    return request({
      url: '/api/v1/tenant/status',
      method: 'put',
      params: {
        id:id,
        status: status
      }
    })
  },
  updateData(formData){
    return request({
      url: '/api/v1/tenant',
      method: 'put',
      data: formData
    })
  }
}
