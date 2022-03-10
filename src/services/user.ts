/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { post, Response, baseUri } from '@api/request';

interface User {
  id: number;
  city: string;
  createTime: string;
  degree: number;
  facadeId: string;
  gender: number;
  headicon: string;
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  member: number;
  mixhexId: string;
  nickname: string;
  official?: number;
  openid: string;
  province?: string;
  purchase: number;
  rnauth: number;
  source?: number;
  spread: number;
  status: number;
  updateTime: string;
}

interface LoginResult {
  authorization_token: string;
  userinfo: User;
}


interface UserInfo {
  nickname: string;
  headicon: string;
  facadeId: string;
  mixhexId: string;
}

interface GetUserInfoReq {
  username: string;
  category?: number; // 第三方：1.手机，2.邮箱，3.微信，4.QQ，5.支付宝，6.微博
  platform?: number; // 客服端：1.管理端，2.PC端网站，3.微信，4.APP，5.移动端网站
  mixhexId?: string; // 邀请码
  security?: number; // 安全码：category=1|2时必传，验证短信|邮箱验证码返回
}

export function getUserInfoApi(params: GetUserInfoReq) {
  return post<GetUserInfoReq, LoginResult>(`/user/api/user/fast_signin`, params);
}

export function getUserDetailApi() {
  return post<null, UserInfo>(`/user/api/user/detail`);
}
