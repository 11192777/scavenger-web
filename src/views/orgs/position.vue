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
      <el-table-column :label="'名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'创建人'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdByName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'岗位描述'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

    <!--  新增编辑界面  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="this.positionEntity" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'岗位名称'" prop="timestamp">
          <el-input v-model="positionEntity.name"/>
        </el-form-item>
        <el-form-item :label="'岗位描述'" prop="timestamp">
          <el-input type="textarea" :rows="10" placeholder="请输入岗位描述" v-model="positionEntity.describe"/>
        </el-form-item>
        <el-form-item :label="'公司管理'">
          <el-radio v-model="positionEntity.company" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.company" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'部门管理'">
          <el-radio v-model="positionEntity.department" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.department" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'岗位管理'">
          <el-radio v-model="positionEntity.position" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.position" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'员工管理'">
          <el-radio v-model="positionEntity.staff" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.staff" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'超市管理'">
          <el-radio v-model="positionEntity.market" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.market" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'商品管理'">
          <el-radio v-model="positionEntity.repository" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.repository" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'货架管理'">
          <el-radio v-model="positionEntity.show" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.show" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'配送人员'">
          <el-radio v-model="positionEntity.courier" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.courier" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'订单管理'">
          <el-radio v-model="positionEntity.order" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.order" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'用户收藏'">
          <el-radio v-model="positionEntity.collect" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.collect" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'用户推荐'">
          <el-radio v-model="positionEntity.userRem" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.userRem" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'商品推荐'">
          <el-radio v-model="positionEntity.goodsRem" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.goodsRem" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item :label="'操作审计'">
          <el-radio v-model="positionEntity.audit" label="1">启用</el-radio>
          <el-radio v-model="positionEntity.audit" label="0">禁用</el-radio>
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
import PositionApi from '@/api/position'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' }
]

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
      positionList: null,
      total: 0,
      listLoading: true,
      positionEntity: {
        id: null,
        name: null,
        describe: null,
        company: "1",
        department: "1",
        position: "1",
        staff: "1",
        market: "1",
        repository: "1",
        show: "1",
        courier: "1",
        order: "1",
        collect: "1",
        userRem: "1",
        goodsRem: "1",
        audit: "1"
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
    this.getDepartmentList(this.listQuery)
    this.getPositionList(this.listQuery)
    this.getList()
  },
  methods: {
    getPositionList() {
      PositionApi.getPositionList(this.listQuery, this.positionEntity.departmentId).then(res => {
        this.positionList = res.data
      })
    },
    getDepartmentList() {
      DepartmentApi.getDepartmentList(this.listQuery).then(res => {
        this.departmentList = res.data
      })
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        PositionApi.getPositionList(this.listQuery).then(response => {
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
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
      this.positionEntity = {
        id: null,
        departmentId: null,
        name: null,
        describe: null,
        company: "1",
        department: "1",
        position: "1",
        staff: "1",
        market: "1",
        repository: "1",
        show: "1",
        courier: "1",
        order: "1",
        collect: "1",
        userRem: "1",
        goodsRem: "1",
        audit: "1"
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
          PositionApi.createPosition(this.positionEntity).then(() => {
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
      this.positionEntity = Object.assign({}, row)
      this.positionEntity.describe = row.remark
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          PositionApi.updateData(this.positionEntity).then(() => {
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
