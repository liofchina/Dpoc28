<template>
  <div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" class="el-form-top">
      <el-form-item class="el-form-left">
        <el-button type="primary" @click="registerHandle()">注册DID</el-button>
        <el-button @click="applyCertHandle()">证书申请</el-button>
        <!--<el-button @click="applySpeedHandle()">证书申请进度</el-button>-->
        <!--<el-button @click="verifyListHandle()">验证请求</el-button>-->
      </el-form-item>
      <el-form-item class="el-form-right">
        <el-button @click="searchDataList()" type="success" class="el-icon-refresh"> 刷新</el-button>
        <el-input v-model.trim="dataForm.searchKey" prefix-icon="el-icon-search" placeholder="按DID名称搜索" clearable
                  class="el-form-srh"></el-input>
        <i @click="searchDataList()" class="el-srh-i" style="right:5px;"></i>
        <el-button @click="searchDataList()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="dataList" border tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              v-loading.body="dataListLoading" element-loading-text="数据列表加载中，请稍后.....">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="address" label="DID地址" min-width="200"></el-table-column>
      <el-table-column prop="name" label="DID名称" min-width="100"></el-table-column>
      <el-table-column prop="code" label="唯一标识码" min-width="100"></el-table-column>
      <el-table-column header-align="center" fixed="right" align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="certListHandle(scope.row.index)" type="text" size="small" class="blue">证书清单</el-button>
          <el-button @click="revokeDidHandle(scope.row.index, scope.row.id)" type="text" size="small" class="red">
            作废DID
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                   :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalCount"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <register-did v-if="registerDidVisible" ref="registerDid" @refreshDataList="getDataList"></register-did>
    <cert-list v-if="certListVisible" ref="certList"></cert-list>
    <cert-apply v-if="certApplyVisible" ref="certApply"></cert-apply>
  </div>
</template>

<script>
  import registerDid from "./register-did.vue";
  import certList from "./cert-list.vue";
  import certApply from "./cert-apply.vue";

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
        multipleSelection: [],
        ids: [],
        dataForm: {
          searchKey: '',
        },
        registerDidVisible: false,
        certListVisible: false,
        certApplyVisible: false,
      };
    },
    components: {
      registerDid,
      certList,
      certApply
    },
    created() {
      this.searchDataList();
      this.$apis.$holder.chooseIssuer();
    },
    methods: {
      // 获取数据列表
      getDataList() {
        let result = this.$apis.$holder.getDIDList(this.dataForm.searchKey, this.pageIndex, this.pageSize);
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.ids = [];
        if (!!val) {
          for (let i = 0; i < val.length; i++) {
            this.ids.push(val[i].id);
          }
        }
      },
      // 注册DID
      registerHandle() {
        this.registerDidVisible = true;
        this.$nextTick(() => {
          this.$refs.registerDid.init();
        });
      },
      // 证书申请
      applyCertHandle() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: "请选择DID",
            type: "warning",
            duration: 1500,
          });
          return
        }
        this.certApplyVisible = true;
        this.$nextTick(() => {
          this.$refs.certApply.init(this.ids);
        });
      },
      // 证书清单
      certListHandle(did) {
        this.certListVisible = true;
        this.$nextTick(() => {
          this.$refs.certList.init(did);
        });
      },
      // 作废DID
      revokeDidHandle(index, did) {
        this.$confirm('此操作将作废该DID, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$apis.$holder.revokeDID(did);
          window.localStorage.removeItem("DID_getDID_" + index);
        }).catch(() => {
        });
      }
    }
  };
</script>

<style>

</style>
