import request from '@/utils/request'


export default {

  getGoodsShowList(listQuery) {
    return request({
      url: '/api/v1/goods/shows',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createGoodsShow(goodsShow){
    return request({
      url: '/api/v1/goods/show',
      method: 'post',
      data: goodsShow
    })
  }
}