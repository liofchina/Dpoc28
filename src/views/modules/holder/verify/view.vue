<template>
  <el-dialog title="证书验证申请" :close-on-click-modal="false" :visible.sync="visible" width="800px" top="0">
    <el-form label-position="left" label-width="120px" :model="dataForm" ref="dataForm" inline
             class="view-table-expand">
      <el-form-item label="DID地址：">
        <div class="demonstration">{{dataForm.didAddress}}</div>
      </el-form-item>
      <el-form-item label="DID名称：">
        <div class="demonstration">{{dataForm.didName}}</div>
      </el-form-item>
      <el-form-item label="唯一标识码：">
        <div class="demonstration">{{dataForm.didCode}}</div>
      </el-form-item>
      <el-form-item label="管理人：">
        <div class="demonstration">{{dataForm.didOwner}}</div>
      </el-form-item>
      <el-form-item label="申请人：">
        <div class="demonstration">{{dataForm.requester}}</div>
      </el-form-item>
      <el-form-item label="申请时间：">
        <div class="demonstration">{{dataForm.requestTime}}</div>
      </el-form-item>
      <el-form-item label="申请详情：">
        <span class="demonstration">{{dataForm.requestAttrs}}</span>
      </el-form-item>
      <el-form-item label="当前状态：">
        <span class="demonstration">{{formatStatus(dataForm.status)}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">返回</el-button>
      <el-button type="success" @click="getDataInfo()">刷新</el-button>
      <el-button type="danger" v-if="dataForm.status==1" @click="refuseHandle">拒绝验证</el-button>
      <el-button type="success" v-if="dataForm.status==1" @click="verifyHandle">证书验证</el-button>
    </div>
    <cert-verify v-if="certVerifyVisible" ref="certVerify"></cert-verify>
  </el-dialog>
</template>

<script>
  import certVerify from './verify';
  import {getVerifyStatus} from "@/apis/utils/Enums.js";

  export default {
    data() {
      return {
        visible: false,
        certVerifyVisible: false,
        dataForm: {}
      };
    },
    components: {
      certVerify
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm = {};
        this.dataForm.index = index;
        this.getDataInfo();
      },
      getDataInfo() {
        this.dataForm = this.$apis.$holder.getVerifyApplyView(this.dataForm.index);
      },
      cancelHandle() {
        this.visible = false;
        this.dataForm = {};
      },
      formatStatus(status) {
        return getVerifyStatus(status);
      },
      refuseHandle() {
        let index = this.dataForm.index;
        this.$confirm('此操作将拒绝该验证申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$apis.$holder.refuseVerifyApply(index);
          // window.localStorage.removeItem("Verify_getCertVerify_" + index);
        }).catch(() => {
        });
      },
      verifyHandle() {
        this.certVerifyVisible = true;
        this.$nextTick(() => {
          this.$refs.certVerify.init(this.dataForm.index);
        });
      }
    }
  };
</script>

<style>
</style>
