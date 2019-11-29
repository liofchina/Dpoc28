<template>
  <div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" class="el-form-top">
      <el-form-item class="el-form-left">
      </el-form-item>
      <el-form-item class="el-form-right">
        <el-button @click="searchDataList()" type="success" class="el-icon-refresh"> 刷新</el-button>
        <el-input v-model.trim="dataForm.searchKey" prefix-icon="el-icon-search" placeholder="按DID名称搜索" clearable
                  class="el-form-srh"></el-input>
        <i @click="searchDataList()" class="el-srh-i" style="right:5px;"></i>
        <el-button @click="searchDataList()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="singleTable" :data="dataList" border @current-change="handleCurrentChange"
              v-loading.body="dataListLoading" element-loading-text="数据列表加载中，请稍后.....">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="address" label="DID地址" min-width="100"></el-table-column>
      <el-table-column prop="name" label="DID名称" min-width="100"></el-table-column>
      <el-table-column prop="code" label="唯一标识码" min-width="120"></el-table-column>
      <el-table-column prop="owner" label="持有人" min-width="100"></el-table-column>
      <el-table-column header-align="center" fixed="right" align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="certListHandle(scope.row.index)" type="text" size="small" class="blue">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                   :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalCount"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <cert-list v-if="certListVisible" ref="certList"></cert-list>
  </div>
</template>

<script>
  import certList from "./cert-list.vue";

  export default {

    data() {
      return {
        // 建档列表
        dataList: [],
        // 建档分页
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        // 建档列表加载
        dataListLoading: false,
        // 选择行对应的数据
        currentRow: null,
        dataForm: {
          searchKey: '',
        },
        certListVisible: false
      };
    },
    components: {
      certList
    },
    created() {
      this.searchDataList();
    },
    methods: {
      // 获取数据列表
      getDataList() {
        let result = this.$apis.$verifier.searchDIDList(this.dataForm.searchKey, this.pageIndex, this.pageSize);
        if (result) {
          this.dataList = result.list;
          this.totalCount = result.total;
        } else {
          this.dataList = [];
          this.totalCount = 0;
        }
      },
      searchDataList() {
        this.pageIndex = 1;
        this.getDataList();
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList();
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList();
      },
      // 选择行
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      // 证书清单
      certListHandle(index) {
        this.certListVisible = true;
        this.$nextTick(() => {
          this.$refs.certList.init(index);
        });
      },
    }
  };
</script>

<style>

</style>
