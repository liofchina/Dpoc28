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
      <el-button type="success" @click="getDateX()">刷新</el-button>
      <el-button type="danger" v-if="dataForm.status == 1" @click="refuseCertApply()">拒绝请求</el-button>
      <el-button type="primary" v-if="dataForm.status == 1" @click="issueCert()">签发证书</el-button>
    </div>
    <issue-cert v-if="issueCertVisible" ref="issueCert" @refreshDataList="visible = false"></issue-cert>
  </el-dialog>
</template>

<script>
  import issueCert from '../apply/issue-cert';
  import {getCertStatus} from "@/apis/utils/Enums.js";
  import {IPFSURL} from '@/apis/utils/Util.js';

  export default {
    data() {
      return {
        visible: false,
        issueCertVisible: false,
        dataForm: {}
      };
    },
    components: {
      issueCert
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm.index = index;
        this.getDateX();
      },
      getDateX() {
        this.dataForm = this.$apis.$issuer.getCertApplyView(this.dataForm.index);
        this.dataForm.applyData = IPFSURL(this.dataForm.applyData);
        this.$apis.$issuer.existsCert(this.dataForm.id);
      },
      getCertStatus(status) {
        return getCertStatus(status);
      },
      refuseCertApply() {
        let _this = this;
        this.$prompt('请输入拒绝原因：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (value) {
            _this.$apis.$issuer.refuseCertApply(this.dataForm.id, value);
            // window.localStorage.removeItem("Cert_getCert_" + this.dataForm.index);
          } else {
            _this.$message({
              type: 'warning ',
              message: '请输入拒绝原因'
            });
          }
        }).catch(() => {

        });
      },
      issueCert() {
        this.issueCertVisible = true;
        this.$nextTick(() => {
          this.$refs.issueCert.init(this.dataForm.index);
        });
      }
    }
  };
</script>

<style>
</style>
