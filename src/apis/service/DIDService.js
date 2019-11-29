import {DIDCall} from "./call/DIDCall";

export let DIDService = {
  getDIDList(searchKey, pageNum, pageSize) {
    return DIDCall.getDIDList(searchKey, pageNum, pageSize)
  },
  getDID(index) {
    return DIDCall.getDID(index);
  },
  registerDID(name, code) {
    DIDCall.registerDID(name, code)
  },
  revokeDID(id) {
    DIDCall.revokeDID(id);
  },
  searchDIDList(searchKey, pageNum, pageSize) {
    return DIDCall.searchDIDList(searchKey, pageNum, pageSize);
  },
  searchDIDView(index) {
    return DIDCall.searchDIDView(index);
  }
};
