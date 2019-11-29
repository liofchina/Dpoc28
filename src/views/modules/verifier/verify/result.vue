<template>
  <el-dialog title="证书校验" :close-on-click-modal="false" :visible.sync="visible" width="800px"
             :append-to-body="true"
             :modal-append-to-body="false"
             top="0">
    <div>
      <div>
        <div class="demonstration">当前证书文件生成的校验码为：{{dataForm.signL}}</div>
      </div>
      <div>
        <div class="demonstration">发证机构留存的证书校验码为：{{dataForm.signE}}</div>
      </div>
      <div>
        <div class="demonstration">{{dataForm.signL == dataForm.signE ? '证书凭据真实有效' : '证书凭据无效伪造'}}</div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle">返回</el-button>
      <el-button type="success" @click="getDataInfo">刷新</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    data() {
      return {
        visible: false,
        dataForm: {},
      };
    },
    methods: {
      init(index, sign) {
        this.visible = true;
        this.dataForm = {
          index: index,
          signL: sign,
          signE: null,
        };
        this.getDataInfo();
      },
      getDataInfo() {
        this.dataForm.signE = this.$apis.$verifier.verifyCertResult(this.dataForm.index);
      },
      cancelHandle() {
        this.visible = false;
        this.dataForm = {};
      },
    }
  };
</script>

<style>
</style>
