<template>
  <el-dialog title="申请进度详情" :close-on-click-modal="false" :visible.sync="visible" width="800px" top="0">
    <el-form label-position="left" label-width="120px" :model="dataForm" ref="dataForm" inline
             class="view-table-expand">
      <el-form-item label="DID地址：">
        <span class="demonstration">{{dataForm.didAddress}}</span>
      </el-form-item>
      <el-form-item label="DID名称：">
        <span class="demonstration">{{dataForm.didName}}</span>
      </el-form-item>
      <el-form-item label="唯一标识码：">
        <span class="demonstration">{{dataForm.didCode}}</span>
      </el-form-item>
      <el-form-item label="管理人：">
        <span class="demonstration">{{dataForm.didOwner}}</span>
      </el-form-item>
      <el-form-item label="申请详情：">
        <span class="demonstration">{{dataForm.attrs}}</span>
      </el-form-item>
      <el-form-item label="申请时间：">
        <span class="demonstration">{{dataForm.applyTime}}</span>
      </el-form-item>
      <el-form-item label="申请附件：">
        <span class="demonstration">{{dataForm.applyData}}</span>
      </el-form-item>
      <el-form-item label="当前状态：">
        <span class="demonstration">{{getCertStatus(dataForm.status)}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="success" @click="getDateX">刷新</el-button>
      <el-button type="danger" v-if="dataForm.status == 3" @click="issueCert()">撤销证书</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getCertStatus} from "@/apis/utils/Enums.js";
  import {IPFSURL} from '@/apis/utils/Util.js';
  export default {
    data() {
      return {
        visible: false,
        dataForm: {}
      };
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm.index = index;
        this.getDateX();
      },
      getDateX() {
        this.dataForm = this.$apis.$issuer.getCertView(this.dataForm.index);
        this.dataForm.applyData = IPFSURL(this.dataForm.applyData);
        this.$apis.$issuer.existsCert(this.dataForm.id);
      },
      getCertStatus(status) {
        return getCertStatus(status);
      },
      issueCert(){
        this.$confirm('此操作将作废该证书, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$apis.$issuer.revokeCert(this.dataForm.id);
          window.localStorage.removeItem("Cert_getCert_" + this.dataForm.index);
        }).catch(() => {
        });

      }
    }
  };
</script>

<style>
</style>
