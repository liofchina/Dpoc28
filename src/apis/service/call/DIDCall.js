import {_Contract} from '../../contracts/Contract';
import {web3} from "../../web3";
import {_Storage} from "../../utils/Storage";
import {getUUID, hexToString} from "../../utils/Util";

let utils = web3.utils;

let keys = {
  totalSize: getKry("totalSize"),
  existsDID: getKry("existsDID"),
  getIndex: getKry("getIndex"),
  getDID: getKry("getDID"),
  ownerDIDSize: getKry("ownerDIDSize"),
  ownerDIDIndexs: getKry("ownerDIDIndexs"),
};

function getKry(m) {
  return "DID_" + m + "_";
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
  _Contract.didContract.methods.totalSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.totalSize, result);
    })
}

function call_existsDID(id) {
  _Contract.didContract.methods.existsDID(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.existsDID + id, result);
    })
}

function call_getIndex(id) {
  _Contract.didContract.methods.getIndex(id)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getIndex + id, result);
    })
}

function call_getDID(index) {
  _Contract.didContract.methods.getDID(index)
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.getDID + index, result);
    })
}

function call_ownerDIDSize() {
  _Contract.didContract.methods.ownerDIDSize()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.ownerDIDSize + getAccount(), result);
    })
}

function call_ownerDIDIndexs() {
  _Contract.didContract.methods.ownerDIDIndexs()
    .call({from: getAccount()})
    .then(function (result) {
      // console.log(result);
      setStorage(keys.ownerDIDIndexs + getAccount(), result);
    })
}

function send_registerDID(name, code) {
  let _id = getUUID();
  let _name = utils.stringToHex(name);
  let _code = utils.stringToHex(code);
  _Contract.didContract.methods.registerDID(_id, _name, _code)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

function send_revokeDID(id) {
  // let flag = existsDID(id);
  // if (!flag) {
  //   return;
  // }
  _Contract.didContract.methods.revokeDID(id)
    .send({from: getAccount()})
    .on('transactionHash', function (hash) {
      // console.log(hash);
    })
  // .on('error', console.error);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function registerDID(name, code) {
  if (!name || !code) return;
  send_registerDID(name, code);
}

function revokeDID(id) {
  if (!id) return;
  send_revokeDID(id);
}

function existsDID(id) {
  if (!id) return null;
  let flag = getStorage(keys.existsDID + id);
  if (!flag) {
    call_existsDID(id);
  }
  return flag;
}

function getDID(index) {
  if (index === undefined) {
    return null;
  }
  let did = getStorage(keys.getDID + index);
  let tmp = null;
  if (did) {
    if (did[4])
      tmp = {
        index: did[0],
        id: did[1],
        address: formatDIDID(did[1], did[5]),
        name: hexToString(did[2]),
        code: hexToString(did[3]),
        status: did[4],
        owner: did[5]
      };
  }
  call_getDID(index);
  return tmp;
}

function ownerDIDIndexs() {
  let indexes = getStorage(keys.ownerDIDIndexs + getAccount());
  call_ownerDIDIndexs();
  return indexes;
}

function formatDIDID(id, owner) {
  return "did:lac:" + owner + ":" + id;
}

function rematDIDID(id) {
  return id.substring(id.lastIndexOf(":") + 1);
}

function getDIDList(searchKey, pageNum, pageSize) {
  // todo page
  let indexes = ownerDIDIndexs();
  if (!indexes) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < indexes.length; i++) {
    let did = getDID(indexes[i]);
    if (did && did.status) {
      let searchFlag = true;
      if (searchKey) {
        if (did.name && did.name.indexOf(searchKey) == -1) {
          searchFlag = false;
        }
      }
      if (searchFlag) {
        size++;
        array.push(did);
      }
    }
  }
  return {
    total: size,
    list: array
  };
}

function getDIDInfoById(id) {
  if (!id) return null;
  let flag = existsDID(id);
  if (!flag) {
    return null;
  }
  let index = getStorage(keys.getIndex + id);
  if (!index) {
    call_getIndex(id);
    return null;
  }
  return getDID(parseInt(index));
}

function totalSize() {
  let size = getStorage(keys.totalSize);
  call_totalSize();
  return size;
}

function searchDIDList(searchKey, pageNum, pageSize) {
  // todo page
  let total = totalSize();
  if (total == undefined) return null;
  let size = 0;
  let array = [];
  for (let i = 0; i < total; i++) {
    let did = getDID(i);
    if (did && did.status) {
      let searchFlag = true;
      if (searchKey) {
        if (did.name && did.name.indexOf(searchKey) == -1) {
          searchFlag = false;
        }
      }
      if (searchFlag) {
        size++;
        array.push(did);
      }
    }
  }
  return {
    total: size,
    list: array
  };
}

function searchDIDView(index) {
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let DIDCall = {
  existsDID: function (id) {
    return existsDID(id);
  },
  getDIDList: function (searchKey, pageNum, pageSize) {
    return getDIDList(searchKey, pageNum, pageSize);
  },
  getDID: function (index) {
    return getDID(index);
  },
  registerDID: function (name, code) {
    registerDID(name, code)
  },
  revokeDID: function (id) {
    revokeDID(id);
  },
  getDIDInfoById: function (id) {
    return getDIDInfoById(id);
  },
  searchDIDList(searchKey, pageNum, pageSize) {
    return searchDIDList(searchKey, pageNum, pageSize);
  },
  searchDIDView(index) {
    return searchDIDView(index);
  }
};

function startUp() {
  call_totalSize();
  call_ownerDIDSize();
  call_ownerDIDIndexs();
}

startUp();
