import request from '@/utils/request'


export default {

  getCollectList(listQuery) {
    return request({
      url: '/api/v1/collects',
      method: 'get',
      params: {
        page: listQuery == null ? null : listQuery.page,
        limit: listQuery == null ? null : listQuery.limit
      }
    })
  }
}
