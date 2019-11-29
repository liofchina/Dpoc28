import {DIDService} from '../service/DIDService';
import {IssuerService} from "../service/IssuerService";
import {CertService} from "../service/CertService";
import {VerifyService} from "../service/VerifyService";

export let _holder = {
  // 注册DID
  registerDID(name, code) {
    DIDService.registerDID(name, code)
  },
  // 作废DID
  revokeDID(id) {
    DIDService.revokeDID(id)
  },
  // DID列表
  getDIDList(searchKey, pageNum, pageSize) {
    return DIDService.getDIDList(searchKey, pageNum, pageSize)
  },
  // 证书清单
  getDIDInfo(index) {
    return DIDService.getDID(index);
  },
  getDIDCertList(did) {
    return CertService.getHolderCertDetailed(did);
  },
  getCertIssuerData(id) {
    return CertService.getCertIssuerData(id);
  },
  chooseIssuer() {
    return IssuerService.chooseIssuer();
  },
  // 下载证书文件
  downloadCert(certId) {
    return CertService.getCertIssuerData(certId);
  },
  // 申请证书
  applyCert(attrs, did, data, issuer) {
    CertService.applyCert(attrs, did, data, issuer);
  },
  // 申请进度列表
  getApplyCertList(status, searchKey, pageNum, pageSize) {
    return CertService.getHolderApplyCertList(status, searchKey, pageNum, pageSize);
  },
  // 申请进度详情
  getApplyCertView(certId) {
    return CertService.getHolderApplyCertView(certId);
  },
  // 验证申请列表
  getVerifyApplyList(status, searchKey, pageNum, pageSize) {
    return VerifyService.getHolderVerifyList(status, searchKey, pageNum, pageSize);
  },
  // 验证申请详情
  getVerifyApplyView(index) {
    return VerifyService.getHolderVerifyView(index);
  },
  // 拒绝验证申请
  refuseVerifyApply(index) {
    VerifyService.refuseVerifyApply(index);
  },
  // 发送证书凭据
  sendCertReceipt(index, data) {
    VerifyService.sendCertReceipt(index, data);
  },
};
