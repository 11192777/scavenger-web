import request from '@/utils/request'


export default {

  getDepartmentList(listQuery) {
    return request({
      url: '/api/v1/departments',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size
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
