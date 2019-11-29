<template>
  <el-dialog
    title="注册DID"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="560px"
    top="0"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      class="dialog-form"
    >
      <el-form-item label="DID名称" prop="name">
        <el-input v-model.trim="dataForm.name" placeholder="DID名称" clearable maxlength="64"></el-input>
      </el-form-item>

      <el-form-item label="唯一标识码" prop="code">
        <el-input v-model.trim="dataForm.code" placeholder="唯一标识码" clearable maxlength="100"></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dataFormCancle()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getUUID} from '@/utils/index.js';

  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          name: null,
          code: null,
        },
        dataRule: {
          name: [
            {required: true, message: "DID名称不能为空", trigger: "blur"}
          ],
          code: [
            {required: true, message: "唯一标识码不能为空", trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      init() {
        this.visible = true;
      },
      dataFormSubmit() {
        let _this = this;
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            _this.$apis.$holder.registerDID(this.dataForm.name, this.dataForm.code);

          }
        });
        this.loading = true;
      },
      dataFormCancle() {
        this.$refs["dataForm"].resetFields();
        this.visible = false;
      }
    }
  };
</script>

<style>
</style>
