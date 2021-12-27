/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const isDev = () => {
  return (
    /[a-zA-Z]+\-dev/.test(location.hostname) ||
    location.hostname === "localhost"
  );
};
const isTest = () => {
  return /[a-zA-Z]+\-test/.test(location.hostname) || isDev;
};
const isMaster = () => {
  return /[a-zA-Z]+\-demo/.test(location.hostname);
};
const isProduction = () => {
  return location.hostname === "creeks.codoclub.com";
};


const getUrlVal = (str) =>  {
  if(!str || str.indexOf('?') != 0) return false;
  const urlValArry = str.replace('?','').split('&');
  const urlValObject = {};
  for(const i in urlValArry){
      urlValObject[urlValArry[i].split('=')[0]] = urlValArry[i].split('=')[1];
  }
  return urlValObject;
};

const getUrlObj = () => {
  const urlStr = window.location.search;
  return getUrlVal(urlStr)
}

function removeEmptyObject(object) {
  const newObject: unknown = {};
  for (const i in object) {
    if (object[i] !== undefined && object[i] !== "" && object[i] !== null) {
      newObject[i] = object[i];
    }
  }
  return newObject;
}

export { isDev, isTest, isProduction, isMaster, getUrlObj, removeEmptyObject };
