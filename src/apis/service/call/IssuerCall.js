import {_Contract} from '../../contracts/Contract';
import {web3} from "../../web3";
import {_Storage} from "../../utils/Storage";

let utils = web3.utils;

let keys = {
  totalSize: getKry("totalSize"),
  getIndex: getKry("getIndex"),
  existsIssuer: getKry("existsIssuer"),
  getIssuer: getKry("getIssuer"),
  validIndexs: getKry("validIndexs"),
};

function getKry(m) {
  return "Issuer_" + m + "_";
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
  _Contract.issuerContract.methods.totalSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.totalSize, result);
    })
}

function call_getIndex(address) {
  _Contract.issuerContract.methods.getIndex(address)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIndex + address, result);
    })
}

function call_existsIssuer(address) {
  if (!address) {
    address = getAccount();
  }
  _Contract.issuerContract.methods.existsIssuer()
    .call({from: address})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.existsIssuer + address, result);
    })
}

function call_getIssuer(index) {
  _Contract.issuerContract.methods.getIssuer(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIssuer + index, result);
    })
}

function call_validIndexs() {
  _Contract.issuerContract.methods.validIndexs()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.validIndexs, result);
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getIssuer(index) {
  if (index == undefined) return null;
  let issuer = getStorage(keys.getIssuer + index);
  let tmp = null;
  if (issuer) {
    if (issuer[4])
      tmp = {
        index: issuer[0],
        id: issuer[1],
        address: issuer[1],
        name: issuer[2],
        code: issuer[3],
        status: issuer[4]
      };
  } else {
    call_getIssuer(index);
  }
  return tmp;
}

function validIndexs() {
  let indexes = getStorage(keys.validIndexs);
  call_validIndexs();
  return indexes;
}

function existsIssuer(address) {
  if (!address) {
    address = getAccount();
  }
  let flag = getStorage(keys.existsIssuer + address);
  if (!flag) {
    call_existsIssuer(address);
  }
  return flag;
}

function getIssuerList() {
  let indexes = validIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let issuer = getIssuer(indexes[i]);
    if (issuer && issuer.status) {
      size++;
      array.push(issuer);
    }
  }
  return {
    total: size,
    list: array
  };
}

function chooseIssuer() {
  let indexes = validIndexs();
  if (!indexes) return null;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let issuer = getIssuer(indexes[i]);
    if (issuer && issuer.status) {
      array.push({
        id: issuer.id,
        name: issuer.name,
        code: issuer.code,
      });
    }
  }
  return array;
}

function getIssuerName(address) {
  if (!address) return null;
  let flag = existsIssuer(address);
  if (!flag) {
    return null;
  }
  let index = getStorage(keys.getIndex + address);
  if (!index) {
    call_getIndex(address);
  }
  let issuer = getIssuer(index);
  if (issuer) {
    return issuer.name;
  }
  return null;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let IssuerCall = {
  existsIssuer: function () {
    return existsIssuer();
  },
  getIssuerList: function () {
    return getIssuerList();
  },
  getIssuer: function (index) {
    return getIssuer(index);
  },
  chooseIssuer: function () {
    return chooseIssuer();
  },
  getIssuerName: function (address) {
    return getIssuerName(address);
  }
};

function startUp() {
  call_totalSize();
  call_validIndexs();
  call_existsIssuer();
  setInterval(call_existsIssuer, 1000 * 60);
}

startUp();
