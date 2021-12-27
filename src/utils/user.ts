/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import StorageUtil from "./localstorage";
import SessionStorageUtil from "./sessionStorage";


const USER_INFO_KEY = "ZjC7bLq94rb3";

const storgeUtil = new StorageUtil({});
const sessionStorgeUtil = new SessionStorageUtil({});


export function setCommonSession(key, value) {
  sessionStorgeUtil.set(key, value)
}

export function getCommonSession(key): () => any {
  return sessionStorgeUtil.get(key)
}

export function setLogin(user) {
  storgeUtil.set(USER_INFO_KEY, user, 3);
}

export function clearUser(history: any) {
  storgeUtil.remove(USER_INFO_KEY);
  history.push("/admin/login");
}

export function getUserInfo(): any | null {
  try {
    const value = storgeUtil.get(USER_INFO_KEY);
    if (value) {
      return value;
    }
    return null;
  } catch (err) {
    console.error("Get user info error");
    return null;
  }
}

export function getToken(): any | null {
  try {
    const value = storgeUtil.get(USER_INFO_KEY);
    if (value) {
      return value.loginToken;
    }
    return null;
  } catch (err) {
    console.error("Get user info error");
    return null;
  }
}

export function setSearchFormValue(formValue) {
  try {
    const key = location.pathname;
    const obj = {[key]: formValue}
    sessionStorgeUtil.set('formCache', obj);
  } catch (err) {
    console.error("Get user info error");
    return null;
  }
}


export function getSearchFormValue(key): unknown | null{
  try {
    const value = sessionStorgeUtil.get('formCache');
    if (value) {
      return value;
    }
    return null;
  } catch (err) {
    console.error("Get user info error");
    return null;
  }
}