import {IssuerCall} from "./call/IssuerCall";

export let IssuerService = {
  existsIssuer() {
    return IssuerCall.existsIssuer();
  },
  getIssuerList() {
    return IssuerCall.getIssuerList();
  },
  getIssuer(index) {
    return IssuerCall.getIssuer(index);
  },
  chooseIssuer() {
    return IssuerCall.chooseIssuer();
  }
};
