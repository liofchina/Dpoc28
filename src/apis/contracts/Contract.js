import {web3} from '../web3/index.js';
import {DPOCABI} from '../abis/DPOCABI.js';
import {address} from "./address.js";

export let _Contract = {
  issuerContract: new web3.eth.Contract(DPOCABI.issuerABI, address.issuerAddress),
  didContract: new web3.eth.Contract(DPOCABI.didABI, address.didAddress),
  certContract: new web3.eth.Contract(DPOCABI.certABI, address.certAddress),
  verifyContract: new web3.eth.Contract(DPOCABI.verifyABI, address.verifyAddress),
};
