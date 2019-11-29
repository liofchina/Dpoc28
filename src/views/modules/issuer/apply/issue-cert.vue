<template>
  <el-dialog
    title="签发证书"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :append-to-body="true"
    :modal-append-to-body="false"
    width="560px"
    top="0"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      class="dialog-form"
    >
      <el-form-item label="DID名称：">
        <span>{{dataForm.didName}}</span>
      </el-form-item>
      <el-form-item label="唯一标识码：">
        <span>{{dataForm.didCode}}</span>
      </el-form-item>

      <div class="form-con-item" v-for="(item, index) in propList" :key="index">
        <el-form-item :label="item.name" prop="props">
          <el-input v-model.trim="item.value" :placeholder="'请填写' + item.name + '属性值'" clearable
                    maxlength="64"></el-input>
        </el-form-item>
      </div>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle()">取消</el-button>
      <el-button type="success" @click="uploadIPFS()">IPFS</el-button>
      <el-button type="primary" @click="submitHandle()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {signCert} from '@/apis/utils/Util.js';

  export default {
    data() {
      return {
        visible: false,
        dataForm: {},
        dataRule: {},
        propList: [],
        hash: '',
        sign: '',
      };
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm.index = index;
        this.getDateX();
      },
      getDateX() {
        this.dataForm = this.$apis.$issuer.getCertApplyView(this.dataForm.index);
        let ps = this.dataForm.attrs;
        let array = ps.split(",");
        for (let i in array) {
          let tmp = {
            name: array[i],
            value: null,
          };
          this.propList.push(tmp);
        }
        this.$apis.$issuer.existsCert(this.dataForm.id);
      },
      uploadIPFS() {
        for (let i in this.propList) {
          let tmp = this.propList[i];
          if (!tmp || !tmp.value) {
            this.$message({
              type: 'warning ',
              message: tmp.name + '数据值不能为空'
            });
            return
          }
        }

        let obj = {
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
          ],
          "id": this.dataForm.id,
          "type": "LAC Cert",
          "holder": this.dataForm.holder,
          "issuer": this.dataForm.issuer,
          "issuanceDate": new Date().getTime(),
          "credentialSubject": {
            "id": this.dataForm.didAddress,
            "name": this.dataForm.didName,
            "address": this.dataForm.didId,
          },
          "proof": this.propList
        };
        this.sign = signCert(obj);
        let stm = new Buffer(JSON.stringify(obj), "utf8");
        this.$ipfs.add(stm).then((result) => {
          console.log(result);
          this.hash = result[0].hash;
          this.$message({
            message: "证书数据已上传到IPFS",
            type: "success",
            duration: 1500,
          });
        }).catch((err) => {
          console.error(err)
        })
      },
      submitHandle() {
        for (let i in this.propList) {
          let tmp = this.propList[i];
          if (!tmp || !tmp.value) {
            this.$message({
              type: 'warning ',
              message: tmp.name + '数据值不能为空'
            });
            return
          }
        }
        let _data = this.hash;
        if (!_data) {
          this.$message({
            message: "请先上传证书数据到IPFS",
            type: "warning",
            duration: 1500,
          });
          return;
        }
        let _sign = this.sign;
        this.$apis.$issuer.issueCert(this.dataForm.id, _data, _sign);
        // window.localStorage.removeItem("Cert_getCert_" + this.dataForm.index);
      },
      cancelHandle() {
        this.dataForm = {};
        this.propList = [];
        this.visible = false;
      }
    }
  };
</script>

<style>
</style>
