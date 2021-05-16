import request from '@/utils/request'


export default {

  getGoodsClassList(listQuery) {
    return request({
      url: '/api/v1/goods/class/list',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createGoodsClass(foodGoodsClass){
    return request({
      url: '/api/v1/goods/class',
      method: 'post',
      data: foodGoodsClass
    })
  }
}
