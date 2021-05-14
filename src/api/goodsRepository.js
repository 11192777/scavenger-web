import request from '@/utils/request'


export default {

  getGoodsRepositoryList(listQuery) {
    return request({
      url: '/api/v1/goods/repositorys',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createGoodsRepository(goodsRepository){
    return request({
      url: '/api/v1/goods/repository',
      method: 'post',
      data: goodsRepository
    })
  }
}
