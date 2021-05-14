import request from '@/utils/request'
import de from 'element-ui/src/locale/lang/de'


export default {

  getPositionList(listQuery, departmentId) {
    return request({
      url: '/api/v1/department/positions',
      method: 'get',
      params: {
        page: listQuery.page,
        size: listQuery.size,
        departmentId: departmentId
      }
    })
  },

  createPosition(position){
    return request({
      url: '/api/v1/position',
      method: 'post',
      data: position
    })
  }
}
