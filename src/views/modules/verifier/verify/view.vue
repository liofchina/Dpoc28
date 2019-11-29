<template>
  <el-dialog title="证书校验请求详情" :close-on-click-modal="false" :visible.sync="visible" width="800px" top="0">
    <el-form label-position="left" label-width="120px" :model="dataForm" ref="dataForm" inline
             class="view-table-expand">
      <el-form-item label="DID地址：">
        <div class="demonstration">{{dataForm.didAddress}}</div>
      </el-form-item>
      <el-form-item label="DID管理人：">
        <div class="demonstration">{{dataForm.didOwner}}</div>
      </el-form-item>
      <el-form-item label="证书ID：">
        <div class="demonstration">{{dataForm.certId}}</div>
      </el-form-item>
      <el-form-item label="证书持有人：">
        <div class="demonstration">{{dataForm.certOwner}}</div>
      </el-form-item>
      <el-form-item label="发证机构：">
        <div class="demonstration">{{dataForm.issuerName}}</div>
      </el-form-item>
      <el-form-item label="发证时间：">
        <div class="demonstration">{{dataForm.issueTime}}</div>
      </el-form-item>
      <el-form-item label="申请属性：">
        <span class="demonstration">{{dataForm.requestAttrs}}</span>
      </el-form-item>
      <el-form-item label="申请时间：">
        <div class="demonstration">{{dataForm.requestTime}}</div>
      </el-form-item>
      <el-form-item label="当前状态：">
        <span class="demonstration">{{formatStatus(dataForm.status)}}</span>
      </el-form-item>
      <el-form-item label="证书凭据：" v-if="dataForm.status == 3">
        <span class="demonstration">{{dataUrl}}</span>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">返回</el-button>
      <el-button type="success" @click="getDataInfo">刷新</el-button>
      <el-button type="primary" @click="checkHandle" v-if="dataForm.status==3">查看证书并校验</el-button>
    </div>
    <verify-comp ref="verifyComp" v-if="verifyVisible"></verify-comp>
  </el-dialog>
</template>

<script>
  import {getVerifyStatus} from "@/apis/utils/Enums.js";
  import {IPFSURL} from '@/apis/utils/Util.js';
  import verifyComp from './verify';

  export default {
    data() {
      return {
        visible: false,
        verifyVisible: false,
        dataForm: {},
        dataHash: null,
      };
    },
    components: {
      verifyComp
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm = {};
        this.dataForm.index = index;
        this.dataUrl = null;
        this.getDataInfo();
      },
      getDataInfo() {
        this.dataForm = this.$apis.$verifier.getVerifyApplyView(this.dataForm.index);
        this.dataUrl = IPFSURL(this.$apis.$verifier.downloadCertFile(this.dataForm.index));
      },
      cancelHandle() {
        this.visible = false;
        this.dataForm = {};
        this.dataUrl = null;
      },
      formatStatus(status) {
        return getVerifyStatus(status);
      },
      checkHandle() {
        this.verifyVisible = true;
        this.$nextTick(() => {
          this.$refs.verifyComp.init(this.dataForm.index);
        });
      }

    }
  };
</script>

<style>
</style>
