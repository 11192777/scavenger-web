import request from '@/utils/request'


export default {

  getStaffList(listQuery) {
    return request({
      url: '/api/v1/staffs',
      method: 'get',
      params: {
        page: listQuery.page,
        limit: listQuery.limit
      }
    })
  },

  createStaff(staff){
    return request({
      url: '/api/v1/staff',
      method: 'post',
      data: staff
    })
  }
}
