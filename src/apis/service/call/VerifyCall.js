import {_Contract} from '../../contracts/Contract';
import {web3} from "../../web3";
import {_Storage} from "../../utils/Storage";
import {CertCall} from "./CertCall";
import {formatTs, hexToString} from "../../utils/Util";

let utils = web3.utils;

let keys = {
  totalSize: getKry("totalSize"),
  existsCertVerify: getKry("existsCertVerify"),
  ownerCertVerifySize: getKry("ownerCertVerifySize"),
  holderCertVerifySize: getKry("holderCertVerifySize"),
  ownerCertVerifyIndexs: getKry("ownerCertVerifyIndexs"),
  holderCertVerifyIndexs: getKry("holderCertVerifyIndexs"),
  getOwner: getKry("getOwner"),
  getHolder: getKry("getHolder"),
  getCertVerify: getKry("getCertVerify"),
  getCertVerifyResponseData: getKry("getCertVerifyResponseData"),
  getCertSign: "Cert_getCertSign_",
  request: null,
  response: null,
};

function getKry(m) {
  return "Verify_" + m + "_";
}

function setStorage(key, value) {
  _Storage.set(key, value);
}

function getStorage(key) {
  return _Storage.get(key);
}

function getAccount() {
  return window.ethereum.selectedAddress;
}

function call_totalSize() {
  _Contract.verifyContract.methods.totalSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.totalSize, result);
    })
}

function call_existsCertVerify(index) {
  if (index == undefined) return;
  _Contract.verifyContract.methods.existsCertVerify(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.existsCertVerify + index, result);
    })
}

function call_ownerCertVerifySize() {
  _Contract.verifyContract.methods.ownerCertVerifySize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.ownerCertVerifySize + getAccount(), result);
    })
}

function call_holderCertVerifySize() {
  _Contract.verifyContract.methods.holderCertVerifySize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.holderCertVerifySize + getAccount(), result);
    })
}

function call_ownerCertVerifyIndexs() {
  _Contract.verifyContract.methods.ownerCertVerifyIndexs()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.ownerCertVerifyIndexs + getAccount(), result);
    })
}

function call_holderCertVerifyIndexs() {
  _Contract.verifyContract.methods.holderCertVerifyIndexs()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.holderCertVerifyIndexs + getAccount(), result);
    })
}

function call_getOwner(index) {
  if (index == undefined) return;
  _Contract.verifyContract.methods.getOwner(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getOwner + index, result);
    })
}

function call_getHolder(index) {
  if (index == undefined) return;
  _Contract.verifyContract.methods.getHolder(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getHolder + index, result);
    })
}

function call_getCertVerify(index) {
  if (index == undefined) return;
  _Contract.verifyContract.methods.getCertVerify(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCertVerify + index, result);
    })
}

function call_getCertVerifyResponseData(index) {
  if (index == undefined) return;
  _Contract.verifyContract.methods.getCertVerifyResponseData(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCertVerifyResponseData + index, result);
    })
}

function call_getCertSign(certId) {
  if (!certId) return;
  _Contract.verifyContract.methods.getCertSign(certId)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCertSign + certId, result);
    })
}

function send_request(certId, attrs) {
  if (!certId) return;
  let existsCertFlag = CertCall.existsCert(certId);
  if (!existsCertFlag) {
    return;
  }
  let _attrs = utils.stringToHex(attrs);
  _Contract.verifyContract.methods.request(certId, _attrs)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

function send_response(index, data, status) {
  if (index == undefined) return;
  let existsFlag = existsCertVerify(index);
  if (!existsFlag) {
    return;
  }
  let isHolderFlag = isHolder(index);
  if (!isHolderFlag) {
    return;
  }
  if (status !== 3 && status !== 4) {
    return;
  }
  if (status == 3) {
    if (!data) {
      return;
    }
  }
  let _data = utils.stringToHex(data);
  _Contract.verifyContract.methods.response(index, _data, status)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function existsCertVerify(index) {
  if (index == undefined) return null;
  let result = getStorage(keys.existsCertVerify + index);
  if (!result) {
    call_existsCertVerify(index);
  }
  return result;
}

function isHolder(index) {
  if (index == undefined) return false;
  let holder = getStorage(keys.getHolder + index);
  if (holder) {
    if (getAccount().toLowerCase() == holder.toLowerCase()) {
      return true;
    }
  }
  call_getHolder(index);
  return false;
}

function isOwner(index) {
  if (index == undefined) return false;
  let owner = getStorage(keys.getOwner + index);
  if (owner) {
    if (getAccount().toLowerCase() == owner.toLowerCase()) {
      return true;
    }
  }
  call_getOwner(index);
  return false;
}

function ownerCertVerifyIndexs() {
  let indexes = getStorage(keys.ownerCertVerifyIndexs + getAccount());
  call_ownerCertVerifyIndexs();
  return indexes;
}

function holderCertVerifyIndexs() {
  let indexes = getStorage(keys.holderCertVerifyIndexs + getAccount());
  call_holderCertVerifyIndexs();
  return indexes;
}

function getOwner(index) {
  if (index == undefined) return null;
  let owner = getStorage(keys.getOwner + index);
  if (!owner) {
    call_getOwner(index);
  }
  return owner;
}

function getHolder(index) {
  if (index == undefined) return null;
  let holder = getStorage(keys.getHolder + index);
  if (!holder) {
    call_getHolder(index);
  }
  return holder;
}

function getVerify(index) {
  if (index == undefined) {
    return null;
  }
  let verify = getStorage(keys.getCertVerify + index);
  let tmp = null;
  if (verify) {
    tmp = {
      index: verify[0],
      certId: verify[1],
      attrs: hexToString(verify[2]),
      requestTime: formatTs(verify[3] * 1000),
      requester: getOwner(index),
      status: verify[4],
    }
  }
  call_getCertVerify(index);
  return tmp;
}

function getHolderVerifyList(status, searchKey, pageNum, pageSize) {
  // todo page
  let indexes = holderCertVerifyIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let verify = getVerify(indexes[i]);
    if (verify) {
      let searchFlag = true;
      if (searchKey) {
        if (verify.name && verify.name.indexOf(searchKey) == -1) {
          searchFlag = false;
        }
      }
      let statusFlag = true;
      if (status && status !== verify.status) {
        statusFlag = false;
      }
      if (searchFlag && statusFlag) {
        let cert = CertCall.getDIDInfoByCertId(verify.certId);
        let tmp = {
          didAddress: cert ? cert.didAddress : '',
          didName: cert ? cert.didName : '',
          didCode: cert ? cert.didCode : '',
          index: verify.index,
          requestAttrs: verify.attrs,
          requester: verify.requester,
          requestTime: verify.requestTime,
          status: verify.status,
        };
        size++;
        array.push(tmp);
      }
    }
  }
  return {
    total: size,
    list: array
  };
}

function getHolderVerifyView(index) {
  if (index == undefined) return null;
  let verify = getVerify(index);
  let tmp = null;
  if (verify) {
    let cert = CertCall.getDIDInfoByCertId(verify.certId);
    tmp = {
      didAddress: cert ? cert.didAddress : '',
      didName: cert ? cert.didName : '',
      didCode: cert ? cert.didCode : '',
      didOwner: cert ? cert.didOwner : '',
      certId: verify.certId,
      index: verify.index,
      requestAttrs: verify.attrs,
      requester: verify.requester,
      requestTime: verify.requestTime,
      status: verify.status,
    };
  }
  return tmp;
}

function refuseVerifyApply(index) {
  if (index == undefined) return;
  send_response(index, "", 4);
}

function sendCertReceipt(index, data) {
  if (index == undefined) return;
  if (!data) return;
  send_response(index, data, 3);
}

function verifyCert(certId, attrs) {
  if (!certId || !attrs) return;
  send_request(certId, attrs);
}

function getVerifyApplyList(status, searchKey, pageNum, pageSize) {
  // todo page
  let indexes = ownerCertVerifyIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let verify = getVerify(indexes[i]);
    if (verify) {
      let searchFlag = true;
      if (searchKey) {
        if (verify.name && verify.name.indexOf(searchKey) == -1) {
          searchFlag = false;
        }
      }
      let statusFlag = true;
      if (status && status !== verify.status) {
        statusFlag = false;
      }
      if (searchFlag && statusFlag) {
        let cert = CertCall.getDIDInfoByCertId(verify.certId);
        let tmp = {
          didAddress: cert ? cert.didAddress : '',
          didName: cert ? cert.didName : '',
          didCode: cert ? cert.didCode : '',
          index: verify.index,
          requestAttrs: verify.attrs,
          requestTime: verify.requestTime,
          status: verify.status,
        };
        size++;
        array.push(tmp);
      }
    }
  }
  return {
    total: size,
    list: array
  };
}

function getVerifyApplyView(index) {
  if (index == undefined) return null;
  let verify = getVerify(index);
  let tmp = null;
  if (verify) {
    let cert = CertCall.getDIDInfoByCertId(verify.certId);
    tmp = {
      didAddress: cert ? cert.didAddress : '',
      didName: cert ? cert.didName : '',
      didCode: cert ? cert.didCode : '',
      didOwner: cert ? cert.didOwner : '',
      certId: verify.certId,
      certOwner: cert ? cert.owner : '',
      issueTime: cert ? cert.issueTime : '',
      issuerName: cert ? cert.issuerName : '',
      index: verify.index,
      requestAttrs: verify.attrs,
      requester: verify.requester,
      requestTime: verify.requestTime,
      status: verify.status,
    };
  }
  return tmp;
}

function downloadCertFile(index) {
  if (index == undefined) return null;
  let ownerFlag = isOwner(index);
  if (!ownerFlag) return null;
  let data = getStorage(keys.getCertVerifyResponseData + index);
  let tmp = "";
  if (data) {
    tmp = hexToString(data[1]);
  }
  call_getCertVerifyResponseData(index);
  return tmp;
}

function verifyCertFile(certId) {
  if (!certId) return null;
  let data = getStorage(keys.getCertSign + certId);
  let tmp = "";
  if (!data) {
    call_getCertSign(certId);
  } else {
    tmp = data[1];
  }
  return tmp;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let VerifyCall = {
  //
  getHolderVerifyList: function (status, searchKey, pageNum, pageSize) {
    return getHolderVerifyList(status, searchKey, pageNum, pageSize);
  },
  //
  getHolderVerifyView: function (index) {
    return getHolderVerifyView(index);
  },
  // 拒绝验证申请
  refuseVerifyApply: function (index) {
    return refuseVerifyApply(index);
  },
  // 发送证书凭据
  sendCertReceipt: function (index, data) {
    return sendCertReceipt(index, data);
  },
  // 检验证书申请
  verifyCert: function (certId, attrs) {
    return verifyCert(certId, attrs);
  },
  // 验证证书列表
  getVerifyApplyList: function (status, searchKey, pageNum, pageSize) {
    return getVerifyApplyList(status, searchKey, pageNum, pageSize);
  },
  // 验证证书详情
  getVerifyApplyView: function (index) {
    return getVerifyApplyView(index);
  },
  // 下载证书
  downloadCertFile: function (index) {
    return downloadCertFile(index);
  },
  // 立即校验
  verifyCertFile: function (certId) {
    return verifyCertFile(certId);
  }
};

function startUp() {
  call_totalSize();
  call_ownerCertVerifyIndexs();
  call_holderCertVerifyIndexs();
}

startUp();
