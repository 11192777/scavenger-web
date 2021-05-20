import request from '@/utils/request'


export default {

  getCompanyList(listQuery) {
    return request({
      url: '/api/v1/companys',
      method: 'get',
      params: {
        page: listQuery == null ? null : listQuery.page,
        limit: listQuery == null ? null : listQuery.limit
      }
    })
  },

  createCompany(company){
    return request({
      url: '/api/v1/company',
      method: 'post',
      data: company
    })
  },

  updateData(formData){
    return request({
      url: '/api/v1/company',
      method: 'put',
      data: formData
    })
  }
}
