import {didJson} from './DPOC28DID.js';
import {issuerJson} from './DPOC28Issuer.js';
import {certJson} from './DPOC28Cert.js';
import {verifyJson} from './DPOC28CertVerify.js';

export let DPOCABI = {
  "didABI": didJson,
  "issuerABI": issuerJson,
  "certABI": certJson,
  "verifyABI": verifyJson
};
