import request from '@/utils/request'


export default {

  getDepartmentList(listQuery) {
    return request({
      url: '/api/v1/departments',
      method: 'get',
      params: {
        page: listQuery.page,
        limit: listQuery.limit
      }
    })
  },

  createDepartment(department){
    return request({
      url: '/api/v1/department',
      method: 'post',
      data: department
    })
  }
}
