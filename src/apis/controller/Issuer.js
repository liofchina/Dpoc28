import {IssuerService} from "../service/IssuerService";
import {CertService} from "../service/CertService";

export let _issuer = {
  existsIssuer() {
    return IssuerService.existsIssuer();
  },
  // 证书申请列表
  getCertApplyList(status, searchKey, pageNum, pageSize) {
    return CertService.getIssuerCertApplyList(status, searchKey, pageNum, pageSize);
  },
  // 证书申请详情
  getCertApplyView(index) {
    return CertService.getIssuerCertApplyView(index);
  },
  // 拒绝证书申请
  refuseCertApply(id, reason) {
    CertService.rejectCertApply(id, reason);
  },
  // 签发证书
  issueCert(id, data, sign) {
    CertService.agreeCertApply(id, data, sign);
  },
  // 证书列表
  getCertList(status, searchKey, pageNum, pageSize) {
    return CertService.getIssuerCertList(status, searchKey, pageNum, pageSize);
  },
  // 证书详情
  getCertView(index) {
    return CertService.getIssuerCertView(index);
  },
  // 撤销证书
  revokeCert(id) {
    CertService.revokeCert(id);
  },
  existsCert(certId) {
    return CertService.existsCert(certId);
  },
};
