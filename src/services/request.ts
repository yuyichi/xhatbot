import { Toast } from 'antd-mobile';
import { removeEmptyObject } from '@util/common';
import { getToken } from '@util/user';
// import { createBrowserHistory } from "history";
export const baseUri = '/api/v1/admin';
// const history = createBrowserHistory();
// (function (Env) {
//   Env["daily"] = "daily";
//   Env["pre"] = "pre";
//   Env["prod"] = "prod";
// })(Env || (Env = {}));
interface Response<T> {
  errcode: number;
  count?: number;
  data: T;
  errmsg: string;
}
export interface PageResult<T> {
  current: number;
  data: T[];
  total: number;
}

export interface pageRequest {
  page: number;
  size: number;
}

const hostApi = {
  local: 'http://localhost:6008/',
  dev: 'https://aonetaskdevapi.daily.elenet.me',
  // daily: 'https://aonetaskdevapi.daily.elenet.me',
  // pre: 'https://aonetaskdevapi.daily.elenet.me',
  // prod: 'https://aonetaskdevapi.daily.elenet.me'
};
// console.log(process)
// const baseUrl = hostApi[process.env.NODE_ENV];
const baseUrl = window.location.origin;
function request<T>(url: string, config: RequestInit & {noJson?: boolean}): Promise<Response<T>> {
  config.credentials = 'include';
  config.headers = {
    'Authorization-Token': getToken(),
    ...config.headers,
  };
  return fetch(baseUrl + url, config)
    .then((res) => {
      // if (!res.ok) {
      //   // 服务器异常返回
      //   throw Error();
      // }
      if (config.noJson) {
        return res.text();
      } else if (!res.ok) {
        return res.json();
      }
      return res.json();
    })
    .then<Response<T>>((resJson) => {
      // if (resJson.code !== 0) {
      //   // 项目内部认为的错误
      //   message.error(resJson.msg);
      //   throw Error("");
      // } else {
      //   return resJson;
      // }
      if (resJson.errcode && resJson.errcode !== 0) {
        if (resJson.errcode === 400) {
          // token无效 返回登录页面
          // history.push('/admin/login');
          location.href = '/admin/login'; // 暂时用location.href跳转
        } else {
          Toast.clear();
          Toast.show({
            content: resJson?.errmsg,
          });
          throw Error('');
        }
      }
      return resJson;
    })
    .catch((error: any) => {
      throw error;
    });
}

const responseType = {
  blob: (url, req, fileName) => {
    return fetch(url, req).then(async res => {
      const blobData = await res.blob();
      downBlob(blobData, fileName);
    });
  },
  undefined: (url, req) => {
    return request(url, req);
  },
};

const downBlob = (blobData, fileName) => {
  const blob = new Blob([blobData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(link.href);
};

// POST请求
//   function get<R, S>(url: string, data: R, config: RequestInit & {responseType: string}): Promise<S> {
//     const req = { method: 'GET', ...config };
//     // 拼接 get 请求参数
//     let query = "";
//     Object.entries(data).forEach(([key, value], index) => {
//       query = query + (index === 0 ? "?" : "&");
//       query += `${key}=${value}`;
//     });
//     return responseType[String(config.responseType)](`${url}${query}`, req, config.fileName)
//   }

function get<R, S>(url: string, data?: R, config?: RequestInit & { responseType: string }): Promise<Response<S>> {
  const req = { method: 'GET', ...config };
  // 拼接 get 请求参数
  let query = '';
  if (data) {
    Object.entries(removeEmptyObject(data)).forEach(([key, value], index) => {
      query = query + (index === 0 ? '?' : '&');
      query += `${key}=${value}`;
    });
  }
  return request(`${url}${query}`, req);
}

// POST请求
function post<R, S>(url: string, data?: R, config?: RequestInit): Promise<Response<S>>  {
  let formBody = null;
  if(data) {
    formBody = Object.entries(removeEmptyObject(data)).map(([key, value], index) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
  }
  return request(url, {
    body: formBody,
    headers: {
      // 'content-type': 'application/json',
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'POST',
    ...config,
  });
}

export { Response, get, post };
