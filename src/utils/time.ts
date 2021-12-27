import moment from "moment";
export const defaultStartTime: moment.Moment = moment("00:00:00", "HH:mm:ss");
export const defaultEndTime: moment.Moment = moment("23:59:00", "HH:mm:ss");



function bindZero(num: number | string): string {
  return String(num).length > 1 ? String(num) : `0${num}`;
}

export function FormatShowTime(date: Date | string, formatStr = "YYYY-MM-DD HH:mm:ss"): string {
  // if (typeof date === "string") {
  //   date = new Date(date);
  // }
  // const year = (date as Date).getFullYear();
  // const month = bindZero((date as Date).getMonth() + 1);
  // const day = bindZero((date as Date).getDate());
  // const hour = bindZero((date as Date).getHours());
  // const minute = bindZero((date as Date).getMinutes());
  // // const  second = bindZero((date as Date).getSeconds());

  // return formatStr
  //   .replace("YYYY", String(year))
  //   .replace("MM", month)
  //   .replace("DD", day)
  //   .replace("HH", hour)
  //   .replace("mm", minute);
  // // .replace("ss", second);
  if (date === null || date === undefined) {
    return "";
  } else {
    return date = moment(date).format(formatStr); // 兼容safari
  }
}

export function FormatShow(date: Date | string, formatStr = "YYYY-MM-DD"): string {
  if (date === null) {
    return "";
  } else {
    return date = moment(date).format(formatStr); // 兼容safari
  }
}


export function formatSeconds(value: number) {
  if (typeof value !== "number") {
    return null;
  }
  let secondTime = Math.ceil(value / 1000); // 秒
  let minuteTime = 0; // 分
  let hourTime = 0; // 小时
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt((secondTime / 60).toString(), 10);
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt((secondTime % 60).toString(), 10);
    //  如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt((minuteTime / 60).toString(), 10);
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt((minuteTime % 60).toString(), 10);
    }
  }

  let result = "" + parseInt((secondTime).toString(), 10) + "秒";

  if (minuteTime > 0) {
    result = "" + parseInt((minuteTime).toString(), 10) + "分" + result;
  }
  if (hourTime > 0) {
    result = "" + parseInt(hourTime.toString(), 10) + "小时" + result;
  }
  return result;
}


export function formatDay(value: number) {
  if (typeof value !== "number") {
    return null;
  }
  if (value < 0) {
    return "";
  }
  let secondTime = Math.ceil(value / 1000); // 秒
  let minuteTime = 0; // 分
  let hourTime = 0; // 小时
  let day = 0;
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt((secondTime / 60).toString(), 10);
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt((secondTime % 60).toString(), 10);
    //  如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt((minuteTime / 60).toString(), 10);
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt((minuteTime % 60).toString(), 10);
      if (hourTime > 24) {
        day = Math.floor(hourTime / 24);
        hourTime = hourTime - day * 24;
      }
    }
  }

  let result = "" + parseInt((secondTime).toString(), 10) + "秒";

  if (minuteTime > 0) {
    result = "" + parseInt((minuteTime).toString(), 10) + "分" + result;
  }
  if (hourTime > 0) {
    result = "" + parseInt(hourTime.toString(), 10) + "小时" + result;
  }
  if (day > 0) {
    result = "" + day + "天" + result;
  }
  return result;
}
