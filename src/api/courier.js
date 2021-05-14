import request from '@/utils/request'


export default {

  getCourierList(listQuery) {
    return request({
      url: '/api/v1/couriers',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createCourier(courier){
    return request({
      url: '/api/v1/courier',
      method: 'post',
      data: courier
    })
  }
}
