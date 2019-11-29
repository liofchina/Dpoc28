// export function formatDate(date, fmt) {
// //   fmt = fmt.replace(/(-)/g, '/');
//   // return formatTime(date, fmt);
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   let o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   };
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + '';
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//   return fmt;
// };

export function formatDate(date, fmt) {
  if (!date) {
    return null;
  }
  //2018-08-24 00:00:00
  let yy = date.substring(0, 4);
  let MM = date.substring(5, 7);
  let dd = date.substring(8, 10);
  let hh = date.substring(11, 13);
  let mm = date.substring(14, 16);
  let ss = date.substring(17, 19);

  if (fmt) {
    return fmt
      .replace('yyyy', yy)
      .replace('yy', yy.slice(2))
      .replace('MM', MM)
      .replace('dd', dd)
      .replace('hh', hh)
      .replace('mm', mm)
      .replace('ss', ss)
  } else {
    return [yy, MM, dd].join('-') + ' ' + [hh, mm, ss].join(':');
  }
}


const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/

///const formatTime = (val, format) => {
export function formatTime(val, format) {
  if (val) {
    /**
     * @instructions 如果不是时间戳格式，且含有字符 '-' 则将 '-' 替换成 '/' && 删除小数点及后面的数字
     * @reason 将 '-' 替换成 '/' && 删除小数点及后面的数字 的原因是safari浏览器仅支持 '/' 隔开的时间格式
     */
    if (val.toString().indexOf('-') > 0) {
      val = val.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/'); // 将 '-' 替换成 '/'
      val = val.slice(0, val.indexOf(".")); // 删除小数点及后面的数字
    }
    let date = new Date(val);
    date.setHours(date.getHours() + 8);
    const [whole, yy, MM, dd, hh, mm, ss] = date.toISOString().match(REGEX);
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const dates = new Date().getDate();
    if (format) {
      return format
        .replace('yyyy', yy)
        .replace('yy', yy.slice(2))
        .replace('MM', MM)
        .replace('dd', dd)
        .replace('hh', hh)
        .replace('mm', mm)
        .replace('ss', ss)
    } else {
      return [yy, MM, dd].join('-') + ' ' + [hh, mm, ss].join(':');
    }
  } else {
    return '--';
  }
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

export function formatLen(month) {
  month = Number(month);
  let year = parseInt(month / 12);
  month = Number(month % 12);
  let str = null;
  if (year == 0) {
    str = (month + " 个月");
  } else if (month == 0) {
    str = (year + " 年");
  } else {
    str = (year + " 年 " + month + " 个月");
  }
  return (str);
}

export function dataFormatter_hhmmss(val) {
  if (val == undefined || val == null) {
    return "";
  }
  val = new Date(val);
  let month = val.getMonth() + 1;
  let day = val.getDate();
  month = (month.toString().length == 1) ? ("0" + month) : month;
  day = (day.toString().length == 1) ? ("0" + day) : day;
  let hour = val.getHours();
  hour = (hour.toString().length == 1) ? ("0" + hour) : hour;
  let minute = val.getMinutes();
  minute = (minute.toString().length == 1) ? ("0" + minute) : minute;
  let second = val.getSeconds();
  second = (second.toString().length == 1) ? ("0" + second) : second;
  let result = val.getFullYear() + '-' + month + '-' + day;
  result = result + " " + hour + ":" + minute + ":" + second
  return result;
}
