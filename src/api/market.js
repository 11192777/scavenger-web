import request from '@/utils/request'


export default {

  getMarketList(listQuery) {
    return request({
      url: '/api/v1/markets',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createMarket(market){
    return request({
      url: '/api/v1/market',
      method: 'post',
      data: market
    })
  }
}
