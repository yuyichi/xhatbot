/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { post, Response, baseUri } from "@api/request";


interface User {
    id: number;
    createdAt: string;
    operator: string;
    password: string;
    salt: string;
    updatedAt: string;
    username: string;
}

interface LoginResult {
    loginToken: string;
    user: User;
    userId: number;
}

export function login (params: any) {
    return post<any, Response<LoginResult>>(`${baseUri}/user/login`, params).catch((err) => {
      console.error("blogCataLogAdd() Error:", err, err.message);
    });
  }

  export function logout () {
    return post<any, Response<LoginResult>>(`${baseUri}/user/logout`).catch((err) => {
      console.error("blogCataLogAdd() Error:", err, err.message);
    });
  }