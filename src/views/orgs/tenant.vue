<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select placeholder="类型" clearable class="filter-item" style="width: 230px; margin-left: 1%;">
        <!--        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>-->
        <el-option label="u897987987" value="sss"/>
        <el-option label="sss" value="sss"/>
        <el-option label="sss" value="sss"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1%;">搜索</el-button>
    </div>
    <el-row class="demo-autocomplete" style="margin-top: 10px;">
      <el-col :span="12" style="width: 47%; margin-left: 1%;">
        <div class="sub-title">inpuA</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 15}"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </el-col>
      <el-col :span="12" style="width: 47%; margin-left: 2%;">
        <div class="sub-title">inpuB</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 15}"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <br>
    <br>
  </div>
</template>

<script>
import TenantApi from '@/api/tenant'
import waves from '@/directive/waves'
import {parseTime} from '@/utils/temp'
import Pagination from '@/components/Pagination'

const calendarTypeOptions = [
  {key: 'CN', display_name: 'China'}
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: {Pagination},
  directives: {waves},
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
      total: 0,
      listLoading: true,
      tenantEntity: {
        tenantName: '',
        appId: '',
        tenantId: '',
        appSecret: '',
        requestDomainName: ''
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
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        tenantId: [{required: true, message: '租户id必填', trigger: 'blur'}],
        tenantName: [{required: true, message: '租户名称必填', trigger: 'blur'}],
        requestDomainName: [{required: true, message: '私有化地址必填', trigger: 'blur'}],
        appId: [{required: true, message: 'appid必填', trigger: 'blur'}]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      setTimeout(() => {
        TenantApi.getTenantList(this.listQuery).then(response => {
          this.list = response.result
          this.total = 1000

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
    sortChange(data) {
      const {prop, order} = data
      if (prop === 'id') {
        this.sortByID(order)
      }
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
      this.tenantEntity = {
        name: null,
        account: null,
        expireTime: new Date(),
        orgServer: '1',
        shoppingServer: '1',
        courierServer: '1',
        recommendServer: '1',
        auditServer: '1'
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
          TenantApi.createTenant(this.tenantEntity).then(() => {
            this.getList(this.listQuery)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.tenantEntity = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          TenantApi.updateTenant(this.tenantEntity).then(() => {
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
