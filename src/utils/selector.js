const labelStr = "--请选择--"

//区域下拉
export function regionSelectInit(arr) {
  if (!arr) {
    return [];
  }
  let first = {id: null, regionName: labelStr}
  arr.splice(0, 0, first);
  return arr;
}

//用户列表下拉
export function userSelectInit(arr) {
  if (!arr) {
    return [];
  }
  let first = {id: null, realname: labelStr}
  arr.splice(0, 0, first);
  return arr;
}

//获取级联下拉列表最近一个元素
export function getCascaderLast(casArr) {
  if (!casArr || casArr == null || casArr.length < 1) {
    return null;
  }
  return casArr[casArr.length - 1];
}
