/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { get, post, PageResult, Response, baseUri } from "@api/request";




export interface BlogCatalog {
  coverPictureUrl?: string;
  createdAt?: string;
  deleted?: string;
  deletedId?: string;
  description?: string;
  display?: string;
  id?: string;
  name?: string;
  operator?: string;
  sort?: string;
  updatedAt?: string;
}

export interface BlogDetail {
  categoryId?: number;
  categoryName?: string;
  content?: string;
  coverPictureUrl?: string;
  createdAt?: string;
  deleted?: number;
  deletedId?: number;
  id?: number;
  intervalPublishTime?: any;
  operator?: string;
  publishStatus?: number;
  title?: string;
  updatedAt?: string;
}

export interface CommentVo {
  accountId?: number;
  avatar?: string;
  blogDetailList?: BlogDetail[];
  commentObjectId?: number; // 评论类别ID号（评论具体的所属类别的ID号）
  commentObjectType?: number; // 评论具体类别（1.评论博客，2.评论商品。。。现版本只有1.）
  content?: string;
  createdAt?: string;
  deleted?: number;
  deletedId?: number;
  id?: number;
  nickname?: string;
  parentId?: number;
  show_status?: number; // 是否显示（1：显示，2：不显示；默认为1 显示）
  title?: string;
}

export function blogCataLoglist () {
  return get<any, Response<BlogCatalog[]>>(`${baseUri}/blogCategory/list`, {
  });
}

export function blogCataLogPage (params: any) {
  return post<any, Response<PageResult<BlogCatalog>>>(`${baseUri}/blogCategory/select`, params);
}

export function blogCataLogDetail (id: any) {
  return get<any, Response<BlogCatalog>>(`${baseUri}/blogCategory/queryDetail/${id}`, {});
}

export function blogCataLogAdd (params: any) {
  return post<any, Response<BlogCatalog>>(`${baseUri}/blogCategory/insert`, params);
}

export function blogCataLogUpdate (params: any) {
  return post<any, Response<BlogCatalog>>(`${baseUri}/blogCategory/update`, params);
}
export function updateComment (params: any) {
  return post<any, Response<BlogCatalog>>(`${baseUri}/comment/updateComment`, params);
}
export function blogCataLogDelete (params: any[]) {
  return post<any, Response<BlogCatalog>>(`${baseUri}/blogCategory/batchDelete`, params, {method: 'DELETE'});
}

export function blogDetaillist () {
  return get(`${baseUri}/blogDetails/list`, {
  });
}
export function blogDetailPage (params: any) {
  return post<any, Response<PageResult<BlogDetail>>>(`${baseUri}/blogDetails/selectBlogAndLike`, params);
}
export function blogDetailPageByName (params: any) {
  return post<any, Response<PageResult<BlogDetail>>>(`${baseUri}/blogDetails/selectByTitle`, params);
}

export function blogDetail (id: any) {
  return get<any, Response<BlogDetail>>(`${baseUri}/blogDetails/queryDetail/${id}`, {});
}

export function blogDetailAdd (params: any) {
  return post<any, Response<BlogDetail>>(`${baseUri}/blogDetails/insert`, params);
}

export function blogDetailUpdate (params: any) {
  return post<any, Response<BlogDetail>>(`${baseUri}/blogDetails/update`, params);
}

export function blogDetailDelete (params: any[]) {
  return post<any, Response<any>>(`${baseUri}/blogDetails/batchDelete`, params, {method: 'DELETE'});
}

export function selectCommentByPage (params: any) {
  return post<any, Response<PageResult<CommentVo>>>(`${baseUri}/comment/selectCommentByPage`, params);
}

export function queryCommentByAccountNameOrBlogName (params: any) {
  return post<any, Response<PageResult<CommentVo>>>(`${baseUri}/comment/queryCommentByAccountNameOrBlogName`, params);
}
export function queryCommentById (id: any) {
  return get<any, Response<CommentVo>>(`${baseUri}/comment/queryCommentById/${id}`, {});
}


export function getList(params) {
  return get("http://localhost:6008/getList", {
    ...params,
  }).catch((err) => {
    console.error("getList() Error:", err, err.message);
  });
}

