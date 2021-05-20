<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="'标题'" v-model="listQuery.title" style="width: 200px;" class="filter-item"/>
      <el-select v-model="listQuery.type" :placeholder="'类型'" clearable class="filter-item" style="width: 230px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :label="'账号'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'名称'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'所在岗位'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'所属部门'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.departmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'创建人'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdByName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'创建时间'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'更新时间'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.modifyDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row)">离职
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

<!--  新增编辑界面  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="this.staffEntity" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'所属公司'">
          <el-select v-model="staffEntity.companyId" style="width: 280px" class="filter-item" @change="companyListChange()">
            <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="'所属部门'">
          <el-select v-model="staffEntity.departmentId" style="width: 280px" class="filter-item" @change="departmentListChange()">
            <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="'员工岗位'">
          <el-select id="positionSelect" v-model="staffEntity.positionId" :default-first-option="true" style="width: 280px" class="filter-item">
            <el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" :label="'员工账号'" prop="timestamp">
          <el-input v-model="staffEntity.account"/>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='update'" :label="'员工账号'" prop="timestamp">
          <el-input disabled="disabled" v-model="staffEntity.account"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import DepartmentApi from '@/api/department'
import CompanyApi from '@/api/company'
import PositionApi from '@/api/position'
import StaffApi from '@/api/staff'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' }
  // { key: 'US', display_name: 'USA' },
  // { key: 'JP', display_name: 'Japan' },
  // { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      departmentList: null,
      companyList: null,
      positionList: null,
      total: 0,
      listLoading: true,
      staffEntity:{
        id: null,
        account: null,
        departmentId: null,
        positionId: null,
        companyId: null
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined
      },
      radio: true,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getCompanyList()
    this.getDepartmentList()
    this.getPositionList(this.listQuery)
    this.getList()
  },
  methods: {
    getCompanyList(){
      CompanyApi.getCompanyList().then(res => {
        this.companyList = res.data
      })
    },
    getPositionList(){
      PositionApi.getPositionList().then( res => {
        this.positionList = res.data
      })
    },
    getDepartmentList(){
      DepartmentApi.getDepartmentList(null, this.staffEntity.companyId).then(res =>{
        this.departmentList = res.data
      })
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        StaffApi.getStaffList(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          })
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row) {
      StaffApi.deleteStaff(row.id).then( res =>{
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    departmentListChange(){
      this.staffEntity.positionId = null
      this.getPositionList(this.listQuery, this.staffEntity.departmentId)
    },
    companyListChange(){
      this.getDepartmentList()
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.staffEntity = {
        id: null,
        account: null,
        departmentId: null,
        positionId: null
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          StaffApi.createStaff(this.staffEntity).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.staffEntity.id = row.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          StaffApi.updateData(this.staffEntity).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
