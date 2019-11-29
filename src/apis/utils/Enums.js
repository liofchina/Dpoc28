/**
 *  DID状态（true-可用、false-不可用）
 * @param {boolean} status
 */
export function getDIDStatus(status) {
  switch (status) {
    case true:
      return "正常";
    case false:
      return "已作废";
  }
}

/**
 *  Cert状态
 * @param {string} status
 */
export function getCertStatus(status) {
  switch (status) {
    case "1":
      return "待处理";
    case "3":
      return "已发证";
    case "4":
      return "已拒绝";
    case "9":
      return "已撤销";
  }
}

/**
 *  Verify状态
 * @param {string} status
 */
export function getVerifyStatus(status) {
  switch (status) {
    case "1":
      return "待处理";
    case "3":
      return "已同意";
    case "4":
      return "已拒绝";
  }
}
