<template>
  <el-dialog title="证书清单" :close-on-click-modal="false" :visible.sync="visible" :append-to-body="true"
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
            <el-table-column prop="id" label="证书ID" min-width="100"></el-table-column>
            <el-table-column prop="attrs" label="证书属性" min-width="160"></el-table-column>
            <el-table-column prop="issuerName" label="发证机构" min-width="160"></el-table-column>
            <el-table-column prop="issueTime" label="发证时间" min-width="160"></el-table-column>
            <el-table-column header-align="center" fixed="right" align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="downloadCert(scope.row.id)" type="text" size="small" class="blue">下载证书文件</el-button>
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
      <el-button type="success" @click="getDIDCertListX()">刷新</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {IPFSURL} from '@/apis/utils/Util.js';

  export default {
    data() {
      return {
        pageIndex: 1,
        pageSize: 5,
        totalCount: 0,
        dataListLoading: false,
        rowNum: 0,
        visible: false,
        dataForm: {},
        certList: []
      };
    },
    methods: {
      init(did) {
        this.visible = true;
        this.getDidInfo(did);
        this.getDataList();
      },
      // 获取DID信息
      getDidInfo(did) {
        this.dataForm = this.$apis.$holder.getDIDInfo(did);
        this.getDIDCertListX();
      },
      getDIDCertListX() {
        if (this.dataForm.id) {
          let list = this.$apis.$holder.getDIDCertList(this.dataForm.id);
          if (list) {
            this.totalCount = list.total;
            this.certList = list.list;
          }
        }
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
      // 下载证书文件
      downloadCert(certId) {
        let hash = this.$apis.$holder.getCertIssuerData(certId);
        hash = IPFSURL(hash);
        this.$alert('<a class="link" href=\"' + hash + '\" target="_blank">' + hash + '</a>', '证书文件', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      },
      // 返回
      closeDialog() {
        this.visible = false;
        this.dataForm = {};
        this.certList = [];
      }
    }
  };
</script>

<style>
  .link {
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
