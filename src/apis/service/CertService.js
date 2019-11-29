import {CertCall} from "./call/CertCall";

export let CertService = {
  existsCert(id) {
    return CertCall.existsCert(id);
  },
  applyCert(attrs, did, data, issuer) {
    CertCall.applyCert(attrs, did, data, issuer);
  },
  rejectCertApply(id, reason) {
    CertCall.rejectCertApply(id, reason)
  },
  agreeCertApply(id, data, sign) {
    CertCall.agreeCertApply(id, data, sign);
  },
  revokeCert(id) {
    CertCall.revokeCert(id);
  },
  getHolderApplyCertList(status, searchKey, pageNum, pageSize) {
    return CertCall.getHolderApplyCertList(status, searchKey, pageNum, pageSize);
  },
  getHolderApplyCertView(id) {
    return CertCall.getHolderApplyCertView(id);
  },
  getHolderCertDetailed(id) {
    return CertCall.getHolderCertDetailed(id);
  },
  getIssuerCertApplyList(status, searchKey, pageNum, pageSize) {
    return CertCall.getIssuerCertApplyList(status, searchKey, pageNum, pageSize);
  },
  getIssuerCertApplyView(index) {
    return CertCall.getIssuerCertApplyView(index);
  },
  getIssuerCertList(status, searchKey, pageNum, pageSize) {
    return CertCall.getIssuerCertList(status, searchKey, pageNum, pageSize);
  },
  getIssuerCertView(index) {
    return CertCall.getIssuerCertView(index);
  },
  getVerifyCertInfo(index) {
    return CertCall.getVerifyCertInfo(index);
  },
  getCertIssuerData(id) {
    return CertCall.getCertIssuerData(id);
  },
};
