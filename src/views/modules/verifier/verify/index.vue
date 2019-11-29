<template>
  <div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" class="el-form-top">
      <el-form-item class="el-form-left">
        <div>
          <template>
            <div>
              <el-radio-group v-model="dataForm.verifyStatus" @change="verifyStatusChange()">
                <el-radio-button v-for="option in verifyStatusOptions" :label="option.value" :key="option.value"
                                 :value="option.value">{{option.label}}
                </el-radio-button>
              </el-radio-group>
            </div>
          </template>
        </div>
      </el-form-item>
      <el-form-item class="el-form-right">
        <el-button @click="searchDataList()" type="success" class="el-icon-refresh"> 刷新</el-button>
        <!--<el-input v-model.trim="dataForm.searchKey" prefix-icon="el-icon-search" placeholder="按DID名称搜索" clearable-->
        <!--class="el-form-srh"></el-input>-->
        <!--<i @click="searchDataList()" class="el-srh-i" style="right:5px;"></i>-->
        <!--<el-button @click="searchDataList()">搜索</el-button>-->
      </el-form-item>
    </el-form>
    <el-table ref="singleTable" :data="dataList" border @current-change="handleCurrentChange"
              v-loading.body="dataListLoading" element-loading-text="数据列表加载中，请稍后.....">
      <el-table-column prop="didAddress" label="DID地址" min-width="100"></el-table-column>
      <el-table-column prop="didName" label="DID名称" min-width="100"></el-table-column>
      <el-table-column prop="didCode" label="唯一标识码" min-width="120"></el-table-column>
      <el-table-column prop="requestAttrs" label="请求证书属性" min-width="100"></el-table-column>
      <el-table-column prop="requestTime" label="请求时间" min-width="100"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatterStatus" min-width="100"></el-table-column>
      <el-table-column header-align="center" fixed="right" align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="viewHandle(scope.row.index)" type="text" size="small" class="blue">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                   :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalCount"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <verify-view v-if="verifyViewVisible" ref="verifyView"></verify-view>
  </div>
</template>

<script>
  import verifyView from "./view.vue";
  import {getVerifyStatus} from "@/apis/utils/Enums.js";

  export default {
    data() {
      return {
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        dataListLoading: false,
        currentRow: null,
        dataForm: {
          searchKey: '',
          verifyStatus: '',
        },
        verifyStatusOptions: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '待处理'
          },
          {
            value: '3',
            label: '已同意'
          },
          {
            value: '4',
            label: '已拒绝'
          },
        ],
        verifyViewVisible: false
      };
    },
    components: {
      verifyView
    },
    created() {
      this.searchDataList();
    },
    methods: {
      // 获取数据列表
      getDataList() {
        let result = this.$apis.$verifier.getVerifyApplyList(this.dataForm.verifyStatus, this.dataForm.searchKey, this.pageIndex, this.pageSize);
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
      verifyStatusChange() {
        this.getDataList();
      },
      // 查看详情
      viewHandle(index) {
        this.verifyViewVisible = true;
        this.$nextTick(() => {
          this.$refs.verifyView.init(index);
        });
      },
      formatterStatus(row) {
        return getVerifyStatus(row.status);
      }
    }
  };
</script>

<style>

</style>
