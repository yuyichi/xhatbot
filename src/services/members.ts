/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { get, post, PageResult, Response, baseUri } from "@api/request";

interface AccountVO {
  id?: number;
  activated?: number; // 账号状态（0: 未激活, 1 未启用,2 已启用；默认：初始为0）
  address?: string;
  age?: number;
  avatar?: string; // 会员头像链接
  banned?:  number; // 是否禁止评论（1.否，0是；默认为1不禁言）
  code?: string;
  constellation?: string;
  createdAt?: string;
  deleted?: number;
  deletedId?: number;
  email?: string;
  nickname?: string;
//   password?: string;
//   salt?: string;
  updatedAt?: string;
}

export function insertAccount (params: any) {
    return post<any, Response<AccountVO>>(`${baseUri}/account/insertAccount`, params);
  }
  
  export function updateAccount (params: any) {
    return post<any, Response<AccountVO>>(`${baseUri}/account/updateAccount`, params);
  }

export function selectAccountByPage (params: any) {
    return post<any, Response<PageResult<AccountVO>>>(`${baseUri}/account/selectAccountByPage`, params);
  }

  export function queryAccountByNameOrEmail (params: any) {
    return post<any, Response<PageResult<AccountVO>>>(`${baseUri}/account/queryAccountByNameOrEmail`, params);
  }
  
  export function queryAccountById (id: any) {
    return get<any, Response<AccountVO>>(`${baseUri}/account/queryAccountById/${id}`, {});
  }

  export function batchDeleteAccount (params: any[]) {
    return post<any, Response<any>>(`${baseUri}/account/batchDeleteAccount`, params, {method: 'DELETE'});
  }
  
  