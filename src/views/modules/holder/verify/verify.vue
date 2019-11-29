<template>
  <el-dialog
    title="生成证书验证文件"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :append-to-body="true"
    :modal-append-to-body="false"
    width="560px"
    top="0"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      class="dialog-form"
    >
      <el-form-item label="证书属性：">
        <el-button size="small" type="primary" @click="certFiler()">加载</el-button>
        <div v-for="(item, index) in certPL" :key="index">
          <div>{{item.name}} ： {{item.value}}</div>
        </div>
      </el-form-item>
      <div class="check-box">
        <p>勾选展示的证书属性：</p>
        <div class="check-con">
          <div class="check-con-item" v-for="(item, index) in propList" :key="index">
            <el-checkbox v-model="item.value" :label="item.name"></el-checkbox>
          </div>
        </div>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle()">取消</el-button>
      <el-button type="success" @click=" refreshHandle()">刷新</el-button>
      <el-button type="success" @click=" uploadHandle()">上传IPFS</el-button>
      <el-button type="primary" @click="submitHandle()">发送证书凭据</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {objectHash} from '@/apis/utils/Util.js';

  export default {
    data() {
      return {
        visible: false,
        dataForm: {},
        propList: [],
        certPL: [],
        dataJson: null,
        hash: null,
      };
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm = {};
        this.propList = [];
        this.certPL = [];
        this.dataJson = null;
        this.hash = null;
        this.dataForm.index = index;
        this.getDateX();
      },
      getDateX() {
        this.propList = [];
        this.dataForm = this.$apis.$holder.getVerifyApplyView(this.dataForm.index);
        let ps = this.dataForm.requestAttrs;
        let array = ps.split(",");
        for (let i in array) {
          let tmp = {
            name: array[i],
            value: false,
          };
          this.propList.push(tmp);
        }
      },
      refreshHandle() {
        this.getDateX();
      },
      uploadHandle() {
        let json = this.dataJson;
        if (!json) {
          this.$message({
            type: 'warning ',
            message: '请先加载证书属性'
          });
          return;
        }

        let pf = false;
        let npnl = [];
        for (let i in this.propList) {
          let tmp = this.propList[i];
          if (tmp && tmp.value) {
            pf = true;
            npnl.push(tmp.name);
          }
        }
        if (!pf) {
          this.$message({
            type: 'warning ',
            message: '请至少勾选一项展示的证书属性'
          });
          return;
        }

        let opl = this.certPL;
        let npl = [];
        for (let i in opl) {
          let op = opl[i];
          if (npnl.indexOf(op.name) != -1) {
            npl.push(op);
          } else {
            npl.push(objectHash(op));
          }
        }
        json.proof  = npl;
        console.log(json);

        let stm = new Buffer(JSON.stringify(json), "utf8");
        this.$ipfs.add(stm).then((result) => {
          console.log(result);
          this.hash = result[0].hash;
          this.$message({
            message: "证书凭据已上传到IPFS",
            type: "success",
            duration: 1500,
          });
        }).catch((err) => {
          console.error(err)
        })

      },
      certFiler(id) {
        if (!id) {
          id = this.dataForm.certId;
        }
        let hash = this.$apis.$holder.getCertIssuerData(id);
        if (hash) {
          this.$ipfs.get(hash).then((data) => {
            let json = JSON.parse(Buffer(data[0].content).toString());
            this.certPL = json.proof;
            this.dataJson = json;
          });
        }
      },
      submitHandle() {
        let _data = this.hash;
        if (!_data) {
          this.$message({
            message: "请先上传证书凭据到IPFS",
            type: "warning",
            duration: 1500,
          });
          return;
        }
        this.$apis.$holder.sendCertReceipt(this.dataForm.index, _data);
      },
      cancelHandle() {
        this.dataForm = {};
        this.propList = [];
        this.certPL = [];
        this.dataJson = null;
        this.hash = null;
        this.visible = false;
      },
    }
  };
</script>

<style lang="scss" scoped>
  .check-box {
    padding-left: 30px;
  }

  .check-con {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .check-con-item {
    width: 50%;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 10px;
  }
</style>

