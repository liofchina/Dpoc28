import {web3} from "../web3";
import {gatewayUrl} from "../ipfs";

export function getUUID() {
  return 'xxxxxxxxxxxx9xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

export function hexToString(string) {
  if (string == null || string === "") {
    return string;
  }
  let f = web3.utils.isHex(string);
  if (f) {
    string = web3.utils.hexToString(string);
  }
  return string;
}

export function IPFSURL(h) {
  if (!h) return null;
  if (h.indexOf('http') != 0) {
    h = gatewayUrl + h;
  }
  return h;
}

export function formatTs(val) {
  if (val === undefined || val == null) {
    return "";
  }
  if (val === 0) {
    return "";
  }
  val = new Date(val);
  let month = val.getMonth() + 1;
  let day = val.getDate();
  month = (month.toString().length === 1) ? ("0" + month) : month;
  day = (day.toString().length === 1) ? ("0" + day) : day;
  let hour = val.getHours();
  hour = (hour.toString().length === 1) ? ("0" + hour) : hour;
  let minute = val.getMinutes();
  minute = (minute.toString().length === 1) ? ("0" + minute) : minute;
  let second = val.getSeconds();
  second = (second.toString().length === 1) ? ("0" + second) : second;
  let result = val.getFullYear() + '-' + month + '-' + day;
  result = result + " " + hour + ":" + minute + ":" + second;
  return result;
}

export function objectHash(proof) {
  if (!proof) return null;
  let str = JSON.stringify(proof);
  let hex = web3.utils.stringToHex(str);
  let sha3 = web3.utils.sha3(hex);
  return sha3.toString();
}

function isString(obj) {
  return obj === obj + '';
}

export function signCert(obj) {
  if (!obj) return null;
  let emo = JSON.parse(JSON.stringify(obj));
  emo.proof = proofListHash(emo.proof);
  return objectHash(emo);
}

function proofListHash(proofList) {
  if (!proofList) return null;
  let result = [];
  for (let i in proofList) {
    let tmp = proofList[i];
    let str = null;
    if (isString(tmp)) {
      str = tmp;
    } else {
      str = JSON.stringify(tmp);
    }
    if (str.length != 66 || str.indexOf('0x') != 0) {
      str = objectHash(tmp);
    }
    result.push(str);
  }
  return result;
}
