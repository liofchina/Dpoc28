import {_Contract} from '../../contracts/Contract';
import {web3} from "../../web3";
import {_Storage} from "../../utils/Storage";
import {formatTs, getUUID, hexToString} from "../../utils/Util";
import {IssuerCall} from "./IssuerCall";
import {DIDCall} from "./DIDCall";

let utils = web3.utils;

let keys = {
  totalSize: getKry("totalSize"),
  getIssuerCertSize: getKry("getIssuerCertSize"),
  getHolderCertSize: getKry("getHolderCertSize"),
  getIndex: getKry("getIndex"),
  getIssuer: getKry("getIssuer"),
  getHolder: getKry("getHolder"),
  getIssuerIndexs: getKry("getIssuerIndexs"),
  getHolderIndexs: getKry("getHolderIndexs"),
  getDidIndexs: getKry("getDidIndexs"),
  existsCert: getKry("existsCert"),
  getCert: getKry("getCert"),
  getCertApplyData: getKry("getCertApplyData"),
  getCertIssueData: getKry("getCertIssueData"),
  getCertSign: getKry("getCertSign"),
  applyCert: null,
  handleCert: null,
  revokeCert: null,
};

function getKry(m) {
  return "Cert_" + m + "_";
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
  _Contract.certContract.methods.totalSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.totalSize, result);
    })
}

function call_getIssuerCertSize() {
  _Contract.certContract.methods.getIssuerCertSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIssuerCertSize + getAccount(), result);
    })
}

function call_getHolderCertSize() {
  _Contract.certContract.methods.getHolderCertSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getHolderCertSize + getAccount(), result);
    })
}

function call_getIndex(id) {
  if (!id) return;
  _Contract.certContract.methods.getIndex(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIndex + id, result);
    })
}

function call_getIssuer(id) {
  if (!id) return;
  _Contract.certContract.methods.getIssuer()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIssuer + id, result);
    })
}

function call_getHolder(id) {
  if (!id) return;
  _Contract.certContract.methods.getHolder()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getHolder + id, result);
    })
}

function call_getIssuerIndexs() {
  _Contract.certContract.methods.getIssuerIndexs()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIssuerIndexs + getAccount(), result);
    })
}

function call_getHolderIndexs() {
  _Contract.certContract.methods.getHolderIndexs()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getHolderIndexs + getAccount(), result);
    })
}

function call_getDidIndexs(did) {
  if (!did) return;
  _Contract.certContract.methods.getDidIndexs(did)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getDidIndexs + did, result);
    })
}

function call_existsCert(id) {
  if (!id) return;
  _Contract.certContract.methods.existsCert(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.existsCert + id, result);
    })
}

function call_getCert(index) {
  if (index == undefined) return;
  _Contract.certContract.methods.getCert(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCert + index, result);
    })
}

function call_getCertApplyData(id) {
  if (!id) return;
  _Contract.certContract.methods.getCertApplyData(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCertApplyData + id, result);
    })
}

function call_getCertIssueData(id) {
  if (!id) return;
  _Contract.certContract.methods.getCertIssueData(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCertIssueData + id, result);
    })
}

function call_getCertSign(id) {
  if (!id) return;
  _Contract.certContract.methods.getCertSign(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getCertSign + id, result);
    })
}

function send_applyCert(attrs, did, data, issuer) {
  if (!attrs) return;
  if (!did) return;
  if (!data) return;
  if (!issuer) return;
  let _id = getUUID();
  let _attrs = utils.stringToHex(attrs);
  let _did = did;
  let _data = utils.stringToHex(data);
  let _issuer = issuer;
  _Contract.certContract.methods.applyCert(_id, _attrs, _did, _data, _issuer)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

// handleCert(string _id, uint _status, string _reason, string _data, string _sign)
function send_handleCert(id, status, reason, data, sign) {
  if (!id) return;
  // check Issuer
  let isIssuerFlag = IssuerCall.existsIssuer();
  if (!isIssuerFlag) {
    return;
  }
  let existsCertFlag = existsCert(id);
  if (!existsCertFlag) {
    return;
  }
  if (status !== 3 && status !== 4) {
    return;
  }
  if (status === 3) {
    if (!data || !sign) {
      return;
    }
  }
  if (status === 4) {
    if (!reason) {
      return;
    }
  }
  // 封装参数

  let _reason = utils.stringToHex(reason);
  let _data = utils.stringToHex(data);
  let _sign = sign;

  _Contract.certContract.methods.handleCert(id, status, _reason, _data, _sign)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

function send_revokeCert(id) {
  if (!id) return;
  let isIssuerFlag = IssuerCall.existsIssuer();
  if (!isIssuerFlag) {
    return;
  }
  let existsCertFlag = existsCert(id);
  if (!existsCertFlag) {
    return;
  }
  _Contract.certContract.methods.revokeCert(id)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function existsCert(id) {
  if (!id) return false;
  let flag = getStorage(keys.existsCert + id);
  if (!flag) {
    call_existsCert(id);
  }
  return flag;
}

function applyCert(attrs, did, data, issuer) {
  send_applyCert(attrs, did, data, issuer);
}

function handleCert(id, status, reason, data, sign) {
  send_handleCert(id, status, reason, data, sign);
}

function revokeCert(id) {
  if (!id) return;
  send_revokeCert(id);
}

function rejectCertApply(id, reason) {
  if (!id) return;
  handleCert(id, 4, reason, "", "");
}

function agreeCertApply(id, data, sign) {
  if (!id) return;
  handleCert(id, 3, "", data, sign);
}

function getIssuerCertSize() {
  let size = getStorage(keys.getIssuerCertSize + getAccount());
  if (!size) {
    call_getIssuerCertSize();
  }
  return size;
}

function getIssuerIndexs() {
  let indexes = getStorage(keys.getIssuerIndexs + getAccount());
  call_getIssuerIndexs();
  return indexes;
}

function getHolderCertSize() {
  let size = getStorage(keys.getHolderCertSize + getAccount());
  if (!size) {
    call_getHolderCertSize();
  }
  return size;
}

function getDidIndexs(did) {
  if (!did) return null;
  let indexes = getStorage(keys.getDidIndexs + did);
  call_getDidIndexs(did);
  return indexes;
}


function getHolderIndexs() {
  let indexes = getStorage(keys.getHolderIndexs + getAccount());
  call_getHolderIndexs();
  return indexes;
}

function getCert(index) {
  if (index == undefined) return null;
  let cert = getStorage(keys.getCert + index);
  let tmp = null;
  if (cert) {
    tmp = {
      index: cert[0],
      id: cert[1],
      attrs: hexToString(cert[2]),
      did: cert[3],
      reason: hexToString(cert[4]),
      status: cert[5],
      applyTime: formatTs(cert[6] * 1000),
      issueTime: formatTs(cert[7] * 1000),
      issuer: cert[8],
      holder: cert[9]
    }
  }
  call_getCert(index);
  return tmp;
}

function getCertApplyData(id) {
  if (!id) return null;
  let result = getStorage(keys.getCertApplyData + id);
  let tmp = null;
  if (result) {
    tmp = hexToString(result[1]);
  } else {
    call_getCertApplyData(id);
  }
  return tmp;
}

function getCertIssueData(id) {
  if (!id) return null;
  let result = getStorage(keys.getCertIssueData + id);
  let tmp = null;
  if (result) {
    tmp = hexToString(result[1]);
  } else {
    call_getCertIssueData(id);
  }
  return tmp;
}

function getCertSign(id) {
  if (!id) return null;
  let result = getStorage(keys.getCertSign + id);
  let tmp = null;
  if (result) {
    tmp = result[1];
  } else {
    call_getCertSign(id);
  }
  return tmp;
}

function getIssuerName(address) {
  return IssuerCall.getIssuerName(address);
}

function getDIDInfo(did) {
  return DIDCall.getDIDInfoById(did);
}

function getHolderApplyCertList(status, searchKey, pageNum, pageSize) {
  // todo Page and searchKey
  let indexes = getHolderIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let cert = getCert(indexes[i]);
    if (cert) {
      let statusFlag = true;
      if (status && status !== cert.status) {
        statusFlag = false;
      }
      if (statusFlag) {
        let did = getDIDInfo(cert.did);
        let issuerName = getIssuerName(cert.issuer);
        let tmp = {
          didId: did == null ? '' : did.id,
          didAddress: did == null ? '' : did.address,
          didName: did == null ? '' : did.name,
          didCode: did == null ? '' : did.code,
          id: cert.id,
          index: cert.index,
          attrs: cert.attrs,
          issuerName: issuerName ? issuerName : cert.issuer,
          applyTime: cert.applyTime,
          status: cert.status,
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

function getHolderApplyCertView(index) {
  if (index == undefined) return null;
  let cert = getCert(index);
  let tmp = null;
  if (cert) {
    let did = getDIDInfo(cert.did);
    let issuerName = getIssuerName(cert.issuer);
    tmp = {
      didId: did == null ? '' : did.id,
      didAddress: did == null ? '' : did.address,
      didName: did == null ? '' : did.name,
      didCode: did == null ? '' : did.code,
      didOwner: did == null ? '' : did.owner,
      id: cert.id,
      index: cert.index,
      attrs: cert.attrs,
      holder: cert.holder,
      issuer: cert.issuer,
      issuerName: issuerName ? issuerName : (cert.issuer),
      applyTime: cert.applyTime,
      status: cert.status,
      reason: cert.reason,
      issueTime: cert.issueTime,
    };
  }
  return tmp;
}

function getHolderCertDetailed(did) {
  if (!did) return null;
  let indexes = getDidIndexs(did);
  if (!indexes || indexes.length == 0) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let cert = getCert(indexes[i]);
    if (cert && cert.status == 3) {
      let issuerName = getIssuerName(cert.issuer);
      let tmp = {
        id: cert.id,
        index: cert.index,
        attrs: cert.attrs,
        issuerName: issuerName ? issuerName : cert.issuer,
        issueTime: cert.issueTime,
        applyTime: cert.applyTime,
        status: cert.status,
      };
      size++;
      array.push(tmp);
    }
  }
  return {
    total: size,
    list: array
  };
}

function getIssuerCertApplyList(status, searchKey, pageNum, pageSize) {
  // todo Page and searchKey
  let flag = IssuerCall.existsIssuer();
  if (!flag) {
    return null;
  }
  let indexes = getIssuerIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let cert = getCert(indexes[i]);
    if (cert) {
      let statusFlag = true;
      if (status && status !== cert.status) {
        statusFlag = false;
      }
      if (statusFlag) {
        let did = getDIDInfo(cert.did);
        let tmp = {
          didId: did == null ? '' : did.id,
          didAddress: did == null ? '' : did.address,
          didName: did == null ? '' : did.name,
          didCode: did == null ? '' : did.code,
          id: cert.id,
          index: cert.index,
          attrs: cert.attrs,
          requester: cert.holder,
          requestTime: cert.applyTime,
          status: cert.status,
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

function getIssuerCertApplyView(index) {
  if (index == undefined) return null;
  let cert = getCert(index);
  let tmp = null;
  if (cert) {
    let did = getDIDInfo(cert.did);
    tmp = {
      didId: did == null ? '' : did.id,
      didAddress: did == null ? '' : did.address,
      didName: did == null ? '' : did.name,
      didCode: did == null ? '' : did.code,
      didOwner: did == null ? '' : did.owner,
      id: cert.id,
      index: cert.index,
      attrs: cert.attrs,
      holder: cert.holder,
      issuer: cert.issuer,
      applyTime: cert.applyTime,
      applyData: getCertApplyData(cert.id),
      status: cert.status,
    };
  }
  return tmp;
}

function getIssuerCertList(status, searchKey, pageNum, pageSize) {
  // todo Page and searchKey
  let flag = IssuerCall.existsIssuer();
  if (!flag) {
    return null;
  }
  let indexes = getIssuerIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let cert = getCert(indexes[i]);
    if (cert) {
      let statusFlag = true;
      if (status && status !== cert.status) {
        statusFlag = false;
        size--;
      }
      let mm = false;
      if (cert.status == 3 || cert.status == 9) {
        mm = true;
      }
      if (statusFlag && mm) {
        let did = getDIDInfo(cert.did);
        let tmp = {
          didId: did == null ? '' : did.id,
          didAddress: did == null ? '' : did.address,
          didName: did == null ? '' : did.name,
          didCode: did == null ? '' : did.code,
          id: cert.id,
          index: cert.index,
          attrs: cert.attrs,
          issueTime: cert.issueTime,
          status: cert.status,
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

function getIssuerCertView(index) {
  if (index == undefined) return null;
  let cert = getCert(index);
  let tmp = null;
  if (cert) {
    let did = getDIDInfo(cert.did);
    tmp = {
      didId: did == null ? '' : did.id,
      didAddress: did == null ? '' : did.address,
      didName: did == null ? '' : did.name,
      didCode: did == null ? '' : did.code,
      didOwner: did == null ? '' : did.owner,
      id: cert.id,
      index: cert.index,
      attrs: cert.attrs,
      holder: cert.holder,
      applyTime: cert.applyTime,
      applyData: getCertApplyData(cert.id),
      issueTime: cert.issueTime,
      status: cert.status,
    };
  }
  return tmp;
}

function getVerifyCertInfo(index) {
  if (index == undefined) return null;
  let cert = getCert(index);
  let tmp = null;
  if (cert && cert.status == 3) {
    let did = getDIDInfo(cert.did);
    let issuerName = getIssuerName(cert.issuer);
    tmp = {
      didId: did == null ? '' : did.id,
      didAddress: did == null ? '' : did.address,
      didName: did == null ? '' : did.name,
      didCode: did == null ? '' : did.code,
      didOwner: did == null ? '' : did.owner,
      id: cert.id,
      index: cert.index,
      attrs: cert.attrs,
      issuerName: issuerName ? issuerName : cert.issuer,
      issueTime: cert.issueTime,
    };
  }
  return tmp;
}

function getIndex(id) {
  if (!id) return null;
  let index = getStorage(keys.getIndex + id);
  if (!index) {
    call_getIndex(id);
  }
  return index;
}

function getDIDInfoByCertId(id) {
  if (!id) return null;
  let index = getIndex(id);
  if (!index) {
    return null
  }
  let cert = getCert(index);
  let tmp = null;
  if (cert && cert.status == 3) {
    let did = getDIDInfo(cert.did);
    let issuerName = getIssuerName(cert.issuer);
    tmp = {
      didId: did == null ? '' : did.id,
      didAddress: did == null ? '' : did.address,
      didName: did == null ? '' : did.name,
      didCode: did == null ? '' : did.code,
      didOwner: did == null ? '' : did.owner,
      id: cert.id,
      index: cert.index,
      owner: cert.holder,
      issueTime: cert.issueTime,
      issuerName: issuerName ? issuerName : (cert.issuer),
    };
  }
  return tmp;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let CertCall = {
  existsCert: function (id) {
    return existsCert(id);
  },
  applyCert: function (attrs, did, data, issuer) {
    applyCert(attrs, did, data, issuer);
  },
  rejectCertApply: function (id, reason) {
    rejectCertApply(id, reason)
  },
  agreeCertApply: function (id, data, sign) {
    agreeCertApply(id, data, sign);
  },
  revokeCert: function (id) {
    revokeCert(id);
  },
  getHolderApplyCertList: function (status, searchKey, pageNum, pageSize) {
    return getHolderApplyCertList(status, searchKey, pageNum, pageSize);
  },
  getHolderApplyCertView: function (id) {
    return getHolderApplyCertView(id);
  },
  getHolderCertDetailed: function (did) {
    return getHolderCertDetailed(did);
  },
  getIssuerCertApplyList: function (status, searchKey, pageNum, pageSize) {
    return getIssuerCertApplyList(status, searchKey, pageNum, pageSize);
  },
  getIssuerCertApplyView: function (index) {
    return getIssuerCertApplyView(index);
  },
  getIssuerCertList: function (status, searchKey, pageNum, pageSize) {
    return getIssuerCertList(status, searchKey, pageNum, pageSize);
  },
  getIssuerCertView: function (index) {
    return getIssuerCertView(index);
  },
  getVerifyCertInfo: function (index) {
    return getVerifyCertInfo(index);
  },
  getDIDInfoByCertId: function (id) {
    return getDIDInfoByCertId(id);
  },
  getCertIssuerData(id) {
    return getCertIssueData(id);
  },
};

function startUp() {
  call_totalSize();

  call_getIssuerIndexs();
  call_getIssuerCertSize();

  call_getHolderIndexs();
  call_getHolderCertSize();
}

startUp();
