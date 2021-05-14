import request from '@/utils/request'


export default {

  getCompanyList(listQuery) {
    return request({
      url: '/api/v1/companys',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
      }
    })
  },

  createCompany(company){
    return request({
      url: '/api/v1/company',
      method: 'post',
      data: company
    })
  }
}
