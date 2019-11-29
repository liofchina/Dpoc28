import {DIDService} from '../service/DIDService';
import {CertService} from "../service/CertService";
import {VerifyService} from "../service/VerifyService";

export let _verifier = {
  // DID检索列表
  searchDIDList(searchKey, pageNum, pageSize) {
    return DIDService.searchDIDList(searchKey, pageNum, pageSize);
  },
  // DID详情
  getDIDView(index) {
    let result = DIDService.getDID(index);
    result.list = CertService.getHolderCertDetailed(result.id);
    return result;
  },
  // 获取证书数据
  getVerifyCertInfo(index) {
    return CertService.getVerifyCertInfo(index);
  },
  // 验证证书
  verifyCert(certId, attrs) {
    VerifyService.verifyCert(certId, attrs);
  },
  // 验证证书列表
  getVerifyApplyList(status, searchKey, pageNum, pageSize) {
    return VerifyService.getVerifyApplyList(status, searchKey, pageNum, pageSize);
  },
  // 验证证书详情
  getVerifyApplyView(index) {
    return VerifyService.getVerifyApplyView(index)
  },
  // 下载证书
  downloadCertFile(index) {
    return VerifyService.downloadCertFile(index);
  },
  // 立即校验
  verifyCertResult(certId) {
    return VerifyService.verifyCertFile(certId);
  },
};
