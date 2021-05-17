import request from '@/utils/request'


export default {

  getAuditList(listQuery) {
    return request({
      url: '/api/v1/audits',
      method: 'get',
      params: {
        page: listQuery.page,
        limit: listQuery.limit
      }
    })
  }
}
