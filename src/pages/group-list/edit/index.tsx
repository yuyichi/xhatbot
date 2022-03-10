import React, { useEffect, useState } from 'react';
import { Space, Switch, Toast } from 'antd-mobile';
import { CardCommon } from '@component/card';
import { roomInfo, BotRoom } from '@api/bot';

import queryString from 'query-string';

const Index = () => {
  const [roomId, setRoomId] = useState(null);

  const [infoData, setInfoData] = useState<BotRoom>({});

  const getInfo = async (roomId: string) => {
    const resp = await roomInfo({room: roomId});
    setInfoData(resp.data)
    console.log(resp, 'info');
  }

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    console.log(parsed)
    if (parsed?.roomId) {
      setRoomId(parsed.roomId);
      getInfo(parsed.roomId as string);
    } else {
      Toast.show({
        content: 'Invalid'
      })
    }
  }, []);
  return (
    <Space direction="vertical" style={{ gap: '4px', width: '100%', height: '100vh', backgroundColor: '#eee' }}>
      <CardCommon
        cardHeaderNode={
          <>
            <span>花点小钱官方福利群(天天抢红包)</span>
            <span>成员</span>
          </>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#fff' }}>
          <span>管理中</span>
          <span>过期时间：2022-02-02 23:59:59</span>
        </div>
      </CardCommon>
      <h2 style={{margin: 0, textAlign: 'center'}}>基础设置</h2>
      <CardCommon
        cardHeaderNode={
          <>
            <span>入群欢迎</span>
            <span>设置</span>
          </>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#fff' }}>
          <span>{`{{邀请人}}将{{被邀请人}}拉进了群聊，热烈欢迎～`}</span>
        </div>
      </CardCommon>
      <h2 style={{margin: 0, textAlign: 'center'}}>保护设置</h2>
      <CardCommon
        cardHeaderNode={
          <>
            <span>群名保护（已开启/警告并踢出群聊）</span>
            <span>设置</span>
          </>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#fff' }}>
          <span>修改警告  :  请勿随意修改群聊标题，谢谢合作～</span>
        </div>
      </CardCommon>
      <h2 style={{margin: 0, textAlign: 'center'}}>安全设置</h2>
      <CardCommon
        cardHeaderNode={
          <>
            <span>安全聊天（已开启/警告3次踢出群聊）</span>
            <span>设置</span>
          </>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#fff' }}>
          <span>违规警告  :  请勿在群内发恶意广告，谢谢合作～</span>
        </div>
      </CardCommon>
      <CardCommon
        showBody={false}
        cardHeaderNode={
          <>
            <span>文本超过80个字</span>
            <Switch defaultChecked style={{ '--checked-color': '#ff8f1f' }} />
          </>
        }
      />
       <CardCommon
        showBody={false}
        cardHeaderNode={
          <>
            <span>图片</span>
            <Switch defaultChecked style={{ '--checked-color': '#ff8f1f' }} />
          </>
        }
      />
    </Space>
  );
};

export default Index;
