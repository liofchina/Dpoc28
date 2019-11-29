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
      <el-form-item label="申请时间：">
        <span class="demonstration">{{dataForm.applyTime}}</span>
      </el-form-item>
      <el-form-item label="申请详情：">
        <span class="demonstration">{{dataForm.attrs}}</span>
      </el-form-item>
      <el-form-item label="发证机构：">
        <span class="demonstration">{{dataForm.issuerName}}</span>
      </el-form-item>
      <el-form-item label="当前状态：">
        <span class="demonstration">{{getCertStatus(dataForm.status)}}</span>
      </el-form-item>
      <el-form-item label="发证时间：" v-if="dataForm.status===3">
        <span class="demonstration">{{dataForm.issueTime}}</span>
      </el-form-item>
      <el-form-item label="备注：" v-if="dataForm.status===4">
        <span class="demonstration">拒绝原因：{{dataForm.reason}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getCertStatus} from "@/apis/utils/Enums.js";

  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          index: null
        }

      };
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm.index = index;
        this.getDateX();
      },
      getDateX() {
        this.dataForm = this.$apis.$holder.getApplyCertView(this.dataForm.index);
      },
      getCertStatus(status) {
        return getCertStatus(status);
      }
    }
  };
</script>

<style>
</style>
