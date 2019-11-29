//处理树形结构数据
export function handleTreeData(data, result = [], type) {
  let temp = data
  let pid = findPid(data);
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].pid == pid) {
      let obj = new Object();
      switch (type) {
        case "region":
          obj.label = temp[i].regionName
          obj.value = temp[i].id
          break;
        case  "dept":
          obj.label = temp[i].deptName
          obj.value = temp[i].id
          break;
        case "classify":
          obj.label = temp[i].classifyName
          obj.id = temp[i].id
          obj.value = temp[i].classifyCode
          break;
        case "classifyId":
          obj.label = temp[i].classifyName
          obj.value = temp[i].id
          break;
      }
      if (isExistChildren(data, temp[i].id)) {
        obj.children = []
        let tempObj = handleChildrenObj(obj, data, type)
        result.push(tempObj)
      } else {
        result.push(obj)
      }
    }
  }
  return result;
}

function findPid(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid == '1') {
      return '1';
    }
  }
}


function handleChildrenObj(obj, data, type) {
  for (let i = 0; i < data.length; i++) {
    if (type == "classify") {
      if (obj.id == data[i].pid) {
        let tempObj = new Object();
        switch (type) {
          case "region":
            tempObj.label = data[i].regionName
            tempObj.value = data[i].id
            break;
          case  "dept":
            tempObj.label = data[i].deptName
            tempObj.value = data[i].id
            break;
          case "classify":
            tempObj.label = data[i].classifyName
            tempObj.value = data[i].classifyCode
            tempObj.id = data[i].id
            break;
        }
        if (isExistChildren(data, data[i].id)) {
          if (tempObj.children == undefined) {
            tempObj.children = []
          }
          obj.children.push(tempObj)
          handleChildrenObj(tempObj, data, type)
        } else {
          obj.children.push(tempObj)
        }
      }
    } else {
      if (obj.value == data[i].pid) {
        let tempObj = new Object();
        switch (type) {
          case "region":
            tempObj.label = data[i].regionName
            tempObj.value = data[i].id
            break;
          case  "dept":
            tempObj.label = data[i].deptName
            tempObj.value = data[i].id
            break;
          case "classify":
            tempObj.label = data[i].classifyName
            tempObj.value = data[i].classifyCode
            tempObj.id = data[i].id
            break;
          case "classifyId":
            tempObj.label = data[i].classifyName
            tempObj.value = data[i].id
            break;
        }
        if (isExistChildren(data, data[i].id)) {
          if (tempObj.children == undefined) {
            tempObj.children = []
          }
          obj.children.push(tempObj)
          handleChildrenObj(tempObj, data, type)
        } else {
          obj.children.push(tempObj)
        }
      }
    }

  }
  return obj;
}

function isExistChildren(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid == id) {
      return true
    }
  }
  return false
}
