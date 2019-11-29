import {VerifyCall} from "./call/VerifyCall";

export let VerifyService = {
  //
  getHolderVerifyList(status, searchKey, pageNum, pageSize) {
    return VerifyCall.getHolderVerifyList(status, searchKey, pageNum, pageSize);
  },
  //
  getHolderVerifyView(index) {
    return VerifyCall.getHolderVerifyView(index);
  },
  // 拒绝验证申请
  refuseVerifyApply(index) {
    return VerifyCall.refuseVerifyApply(index);
  },
  // 发送证书凭据
  sendCertReceipt(index, data) {
    return VerifyCall.sendCertReceipt(index, data);
  },
  // 检验证书申请
  verifyCert(certId, attrs) {
    return VerifyCall.verifyCert(certId, attrs);
  },
  // 验证证书列表
  getVerifyApplyList(status, searchKey, pageNum, pageSize) {
    return VerifyCall.getVerifyApplyList(status, searchKey, pageNum, pageSize);
  },
  // 验证证书详情
  getVerifyApplyView(index) {
    return VerifyCall.getVerifyApplyView(index);
  },
  // 下载证书
  downloadCertFile(index) {
    return VerifyCall.downloadCertFile(index);
  },
  // 立即校验
  verifyCertFile(certId) {
    return VerifyCall.verifyCertFile(certId);
  },
};
