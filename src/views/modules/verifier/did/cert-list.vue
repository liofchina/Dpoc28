<template>
  <el-dialog title="DID详情" :close-on-click-modal="false" :visible.sync="visible" :append-to-body="true"
             :modal-append-to-body="false" width="800px" top="0" @close="closeDialog">
    <el-scrollbar :native="false" class="el-scrollbar-form">
      <el-form :inline="true" :model="dataForm" ref="dataForm">
        <div class="el-form-process">
          <el-form-item label="DID地址：">
            <div class="demonstration">{{dataForm.address}}</div>
          </el-form-item>
          <el-form-item label="DID名称：">
            <div class="demonstration">{{dataForm.name}}</div>
          </el-form-item>
          <el-form-item label="唯一标识码：">
            <div class="demonstration">{{dataForm.code}}</div>
          </el-form-item>
          <el-form-item label="管理人：">
            <div class="demonstration">{{dataForm.owner}}</div>
          </el-form-item>
        </div>
        <div style="padding:0 10px;">
          <el-table ref="singleTable" :data="certList" border style="margin-left:0;">
            <el-table-column prop="id" label="证书ID" min-width="160"></el-table-column>
            <el-table-column prop="attrs" label="证书属性" min-width="80"></el-table-column>
            <el-table-column prop="issuerName" label="发证机构" min-width="160"></el-table-column>
            <el-table-column prop="issueTime" label="发证时间" min-width="150"></el-table-column>
            <el-table-column header-align="center" fixed="right" align="center" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="verifyCert(scope.row.index)" type="text" size="small" class="blue">请求证书文件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                       :current-page="pageIndex" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" :total="totalCount"
                       layout="total">
        </el-pagination>

      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">返回</el-button>
      <el-button type="success" @click="refreshHandle()">刷新</el-button>
    </div>
    <cert-verify v-if="certVerifyVisible" ref="certVerify" @refreshDataList=""></cert-verify>
  </el-dialog>
</template>

<script>
  import certVerify from './cert-verify';

  export default {
    data() {
      return {
        pageIndex: 1,
        pageSize: 5,
        totalCount: 0,
        dataListLoading: false,
        rowNum: 0,
        visible: false,
        certVerifyVisible: false,
        dataForm: {},
        certList: []
      };
    },
    components: {
      certVerify
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm ={};
        this.certList = [];
        this.dataForm.index = index;
        this.getDidInfo();
        this.getDataList();
      },
      // 获取DID信息
      getDidInfo() {
        this.dataForm = this.$apis.$verifier.getDIDView(this.dataForm.index);
        let list = this.dataForm.list;
        if (list) {
          this.totalCount = list.total;
          this.certList = list.list;
        }
      },
      refreshHandle(){
        this.getDidInfo();
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
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
      },
      // 请求证书文件
      verifyCert(index) {
        this.certVerifyVisible = true;
        this.$nextTick(() => {
          this.$refs.certVerify.init(index);
        });
      },
      // 返回
      closeDialog() {
        this.visible = false;
        this.dataForm = {};
        this.totalCount = 0;
        this.certList = [];
      }
    }
  };
</script>

<style>
</style>
