import {_holder} from './controller/Holder';
import {_issuer} from './controller/Issuer';
import {_verifier} from './controller/Verifier';

export let DAPIS = {
  $holder: _holder,
  $issuer: _issuer,
  $verifier: _verifier,
};
