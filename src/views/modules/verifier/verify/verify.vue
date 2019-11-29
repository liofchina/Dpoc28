<template>
  <el-dialog title="证书校验" :close-on-click-modal="false" :visible.sync="visible" width="800px"
             :append-to-body="true"
             :modal-append-to-body="false"
             top="0">
    <el-form label-position="left" label-width="120px" :model="dataForm" ref="dataForm" inline
             class="view-table-expand">
      <el-form-item label="证书文件：">
        <el-button size="small" type="primary" @click="loadData()">加载</el-button>
        <div class="demonstration">{{CertCredentials}}</div>
      </el-form-item>
      <el-form-item label="证书ID：">
        <div class="demonstration">{{dataForm.certId}}</div>
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

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">返回</el-button>
      <el-button type="primary" @click="checkHandle" v-if="dataForm.status==3">立即校验</el-button>
    </div>
    <result-comp ref="resultComp" v-if="resultVisible"></result-comp>
  </el-dialog>
</template>

<script>
  import {getVerifyStatus} from "@/apis/utils/Enums.js";
  import {signCert} from '@/apis/utils/Util.js';
  import resultComp from './result';

  export default {
    data() {
      return {
        visible: false,
        resultVisible: false,
        dataForm: {},
        CertCredentials: null,
        dataHash: null,
      };
    },
    components: {
      resultComp
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm = {};
        this.CertCredentials = null;
        this.dataHash = null;
        this.dataForm.index = index;
        this.getDataInfo();
      },
      getDataInfo() {
        this.dataForm = this.$apis.$verifier.getVerifyApplyView(this.dataForm.index);
        this.dataHash = this.$apis.$verifier.downloadCertFile(this.dataForm.index);
      },
      cancelHandle() {
        this.visible = false;
        this.dataForm = {};
        this.CertCredentials = null;
        this.dataHash = null;
      },
      checkHandle() {
        let cc = this.CertCredentials;
        console.log(cc);
        if(!cc){
          this.$message({
            type: 'warning ',
            message: '请先加载证书文件'
          });
          return;
        }
        let sign = signCert(cc);
        this.resultVisible = true;
        this.$nextTick(() => {
          this.$refs.resultComp.init(this.dataForm.certId, sign);
        });
      },
      loadData() {
        if (!this.dataHash) {
          this.$message({
            type: 'warning ',
            message: '未获取到证书凭据地址'
          });
          return;
        }
        this.$ipfs.get(this.dataHash).then((result) => {
          let con = Buffer(result[0].content);
          this.CertCredentials = JSON.parse(con);
        });
      },
    }
  };
</script>

<style>
</style>
