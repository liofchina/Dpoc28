<template>
  <el-dialog
    title="请求可验证证书"
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
      <el-form-item label="证书ID：">
        <span>{{dataForm.id}}</span>
      </el-form-item>
      <el-form-item label="发证机构：">
        <span>{{dataForm.issuerName}}</span>
      </el-form-item>
      <el-form-item label="发证时间：">
        <span>{{dataForm.issueTime}}</span>
      </el-form-item>
      <div class="check-box">
        <p>勾选需要请求的证书属性：</p>
        <div class="check-con">
          <div class="check-con-item" v-for="(item, index) in propList" :key="index">
            <el-checkbox v-model="item.value" :label="item.name"></el-checkbox>
          </div>
        </div>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelHandle()">取消</el-button>
      <el-button type="primary" @click="submitHandle()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    data() {
      return {
        visible: false,
        dataForm: {},
        dataRule: {},
        propList: [],
      };
    },
    methods: {
      init(index) {
        this.visible = true;
        this.dataForm = {};
        this.propList = [];
        this.dataForm.index = index;
        this.getDateX();
      },
      getDateX() {
        this.dataForm = this.$apis.$verifier.getVerifyCertInfo(this.dataForm.index);
        let ps = this.dataForm.attrs;
        let array = ps.split(",");
        for (let i in array) {
          let tmp = {
            name: array[i],
            value: false,
          };
          this.propList.push(tmp);
        }
        this.$apis.$issuer.existsCert(this.dataForm.id);
      },
      submitHandle() {
        let attrs = "";
        for (let i in this.propList) {
          let prop = this.propList[i];
          if (prop.value) {
            let tmp = prop.name;
            if (attrs !== "") {
              tmp = "," + tmp;
            }
            attrs = attrs + tmp;
          }
        }
        if (!attrs) {
          this.$message({
            message: "请勾选需要请求的证书属性",
            type: "warning",
            duration: 1500,
          });
          return;
        }
        this.$apis.$verifier.verifyCert(this.dataForm.id,attrs);
      },
      cancelHandle() {
        this.dataForm = {};
        this.propList = [];
        this.visible = false;
      }
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

