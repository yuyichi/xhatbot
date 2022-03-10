import { post, Response, baseUri } from '@api/request';

interface Message {
  content: string;
  content_type: string; // （ANNOUNCE｜TEXT｜IMAGE）
}

interface Gro {
  id: number;
  bind: number;
  laws: string;
  door: string;
  sync: number;
}

interface Room {
  id: number;
  name: string;
}

export interface Notice {
  id?: number;
  bind?: number; // 发起用户ID
  tags?: string; // 消息标题
  data?: Message[]; // 消息列表
  gros?: string; // 集成群ID
  roos?: number; // 微信群ID
  djob?: string; // 每日发送时间
  time?: string; // 定时发送时间
  runs?: string; // 实际执行时间
  groslist?: Gro[];
  roomlist?: Room[];
}

// 0.待发送，1.每日发送，2.已发送
export function getMessageListApi(status: number) {
  return post<null, Notice[]>(`/gro/news/list?status=${status}`);
}
