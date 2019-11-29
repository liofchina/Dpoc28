<template>
  <el-dialog
    title="申请证书"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="560px"
    top="0"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      class="dialog-form cert-apply"
    >
      <div class="form-con-item" v-for="(item, index) in propList" :key="index">
        <el-form-item label="属性名称:" prop="props">
          <el-input v-model.trim="item.propName" placeholder="请填写属性名称" clearable maxlength="64"></el-input>
        </el-form-item>
        <div class="del" v-if="propList.length > 1" @click="removeProp(index)">删除</div>
      </div>
      <el-button class="add" @click="propAdd()" type="primary" plain>新增属性</el-button>
      <div class="form-con-item">
        <el-form-item label="发证机构:" prop="issuer">
          <el-select v-model="dataForm.issuer" placeholder="请选择">
            <el-option
              v-for="item in issuerOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-button @click="getIssuerList()" type="success" class="el-icon-refresh" style="width:40px;height:40px;"> 刷新</el-button> -->
        <div class="del del1" @click="getIssuerList()">刷新</div>
      </div>


      <el-form-item label="证书材料:" prop="data">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadLink"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          accept=".jpg, .jpeg, .png"
          :multiple="false"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到IPFS</el-button>
          <div slot="tip" class="el-upload__tip">请上传认证材料压缩包，支持格式rar\zip\7z<br>大小不超过50m</div>
        </el-upload>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dataFormCancel()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {uploadUrl} from "@/apis/ipfs/index.js";
  export default {
    data() {
      return {
        visible: false,
        propList: [{propName: ''}],
        dataForm: {
          issuer: '',
          hash: ''
        },
        uploadLink : uploadUrl,
        dids: [],
        fileList: [],
        issuerOptions: [],
        dataRule: {
          issuer: [
            {required: true, message: "请选择发证机构", trigger: "blur"}
          ],
          // data: [
          //   {required: true, message: "请上传证书材料", trigger: "blur"}
          // ]
        }
      };
    },
    methods: {
      init(ids) {
        if (!ids || ids.length < 1) {
          return
        }
        this.clearData();
        this.dids = ids;
        this.visible = true;
        this.getIssuerList();
      },
      // 获取机构
      getIssuerList() {
        let list = this.$apis.$holder.chooseIssuer();
        console.log(list);
        this.issuerOptions = list;
      },
      //新增属性
      propAdd() {
        if (this.propList.length > 4) {
          this.$message({
            message: "属性信息已达上限",
            type: "warning",
            duration: 1500,
          });
          return
        }
        let obj = {
          propName: ""
        };
        this.propList.push(obj)
      },
      removeProp(index) {
        this.propList.splice(index, 1)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove() {

      },
      handleExceed() {
        this.$message({
          message: "最多只能长传一个文件",
          type: "warning",
          duration: 1500,
        });
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        this.dataForm.hash = response.Hash;
        this.$message({
          message: "证书材料已上传到IPFS",
          type: "success",
          duration: 1500,
        });
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      clearData() {
        this.propList = [{propName: ''}];
        this.dataForm = {
          issuer: ''
        };
        this.dids = [];
        this.fileList = [];
        this.issuerOptions = [];
      }
      ,
      dataFormSubmit() {
        let attrs = "";
        for (let i in this.propList) {
          let prop = this.propList[i].propName;
          if (!prop) {
            this.$message({
              message: "请填写属性信息",
              type: "warning",
              duration: 1500,
            });
            return;
          }
          if (attrs !== "") {
            prop = "," + prop;
          }
          attrs = attrs + prop;
        }
        console.log(attrs);
        let _issuer = this.dataForm.issuer;
        let _data = this.dataForm.hash;
        if(!_data){
          this.$message({
            message: "请上传证书材料",
            type: "warning",
            duration: 1500,
          });
          return;
        }
        let _this = this;
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            console.log("11111111111");
            for (let i in _this.dids) {
              _this.$apis.$holder.applyCert(attrs, this.dids[i], _data, _issuer);
            }
          }
        });
      }
      ,
      dataFormCancel() {
        this.$refs["dataForm"].resetFields();
        this.visible = false;
      }
      ,
    }
  }
  ;
</script>

<style lang="scss" scoped>
  .form-con-item {
    display: flex;
  }

  .form-con-item .del {
    height: 40px;
    cursor: pointer;
    line-height: 40px;
    color: #FF7C7C;
    margin-left: 16px;
  }

  .form-con-item .del.del1 {
    color: #67C23A;
  }

  .add {
    margin-left: 140px;
    margin-bottom: 20px;
    width: 300px;
  }
</style>
