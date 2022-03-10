/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { post, Response, baseUri } from '@api/request';

interface BotRep {
  wxid: string;
  weixin: string;
  name: string;
  avatar: string;
  gender: number;
  province: string;
  city: string;
}

export enum BotRoomStatusEmun {
  Expired = 'expired',
  Control = 'control',
}

export interface BotRoom {
  id?: number;
  user_id?: number; // 管理用户ID
  bind_id?: string; // 机器人ID
  bind_wx?: string; // 绑定微信ID
  room_id?: string; // 微信群ID
  subject?: string; // 微信群名称
  is_work?: number; // 是否工作
  talk_bot_serve?: number; // 艾特回应
  talk_bot_token?: string; // 微信智能对话TOKEN
  talk_bot_realm?: string; // 智能对话领域
  exit_room_text?: string; // ）离群提示文字  ${leavers}，离群者占位符
  spit_room_text?: string; // 踢出群聊文字 ${leavers}，离群者占位符 ${remover}，踢人者占位符
  join_room_lock?: number; // 是否入群验证
  join_room_rule?: string; // 入群规则文字
  join_room_tips?: string; // 入群提醒文字
  topic_defense?: number; // 群名保护规则 0.不保护 1.警告 2.警告+踢人
  topic_warning?: string; // 修改群名警告
  chat_safe_test?: number; // 是否聊天安全
  chat_safe_rule?: string; // 聊天安全规则
  chat_safe_hits?: number; // 聊天违规限制，警告次数，超出次数则踢出群聊
  chat_safe_text?: string; // 违规警告文字
  chat_safe_kiss?: string; // 开放授权微信ID
  fission_spread?: number; // 微信群推裂变 值为0时表示不开启活码 值大于0表示开启群活码
  create_time?: string;
  expire_time?: string;
  status?: BotRoomStatusEmun; //管理群状态 expired：已过期 control：控制中
  tear?: Tear;
  opps?: Opps[];
}

interface Tear {
  id?: number; // 群活码ID
  bind?: number;  // 用户ID
  laws?: string; // 裂变群命名规则
  door?: string; // 群活码对外ID
  sync?: number; // 是否锁定成员重复
  data?: string; // 二维码URL
}

interface Opps {
  id?: number; // 管理员ID
  room_id?: string; // 微信群ID
  op_wxid?: string; // 微信ID
  wx_user?: string; // 微信昵称
  wx_icon?: string; // 微信头像
}

export interface Room {
  id: number;
  door: string;
  data: string;
  bind: number;
  laws: string;
  sync: number;
}

export function getBotListApi() {
  return post<null, BotRep[]>('/bot/open');
}

export function getCDKEYApi() {
  return post<null, BotRep[]>('/bot/room/x-sn');
}

export function getRoomListApi() {
  return post<null, Room[]>('/gro/room/list');
}

export function saveRoom(laws: string, id?: number) {
  const url = id ? `/gro/room/save?id=${id}` : '/gro/room/save'
  return post<{laws: string }, BotRep[]>(url, {laws});
}

export function deleteRoom(id: number) {
  return post<null, BotRep[]>(`/gro/room/kill?id=${id}`);
}

export function syncRoom(id: number, sync: number) {
  return post<{sync: number}, BotRep[]>(`/gro/room/sync?id=${id}`, {sync});
}

export function mineRooms() {
  return post<null, BotRoom[]>('/bot/room/mine');
}

export function roomInfo(data: {room: string}) {
  return post<{room: string}, BotRoom>('/bot/room/data', data);
}

