import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Space, Button } from 'antd-mobile';
import Card, { CardCommon } from '@component/card';
import { mineRooms, BotRoom, BotRoomStatusEmun } from '@api/bot';
import Page from '@component/page';
import moment from 'moment';
import { FormatShowTime } from '@util/time';

const Index = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<BotRoom[]>([]);

  const getMimeRoomList = async () => {
    try {
      const res = await mineRooms();
      setDataList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMimeRoomList();
  }, []);

  const renderStatus = (status: BotRoomStatusEmun, create_time: string, expire_time: string, room_id: string) => {
    let statusText = '';
    let statusCss;
    let button = 1;
    if (status === BotRoomStatusEmun.Expired) {
      statusText = '已过期';
      statusCss = {
        color: 'rgb(0, 0, 128)',
      };
      button = 1;
    } else {
      const current_time = Date.now();
      let isSoonExpired = moment(expire_time).subtract(7, 'day').isBefore(moment(current_time));
      if (!isSoonExpired) {
        statusText = '管理中';
        statusCss = {
          color: '#fff',
        };
        button = 2;
      } else {
        statusText = '将到期';
        statusCss = {
          color: 'rgb(255, 255, 0)',
        };
        button = 3;
      }
    }
    return (
      <Space style={{ display: 'flex', width: '100%', gap: '16px' }} direction="vertical">
        <div style={{ display: 'flex', justifyContent: 'space-between', ...statusCss }}>
          <span>{statusText}</span>
          <span>过期时间：{FormatShowTime(expire_time)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
          {button === 1 ? (
            <Button block color="warning" onClick={() => window.location.href = 'weixin://dl/business/?t=3AqQhgkObGh'}>
              续费
            </Button>
          ) : button === 2 ? (
            <Button block color="primary" onClick={() => history.push(`/home/group-list/edit?roomId=${room_id}`)}>
              管理
            </Button>
          ) : (
            <>
              <Button color="warning" style={{ width: '40vw' }} onClick={() => window.location.href = 'weixin://dl/business/?t=3AqQhgkObGh'}>
                续费
              </Button>
              <Button color="primary" style={{ width: '40vw' }} onClick={() => history.push(`/home/group-list/edit?roomId=${room_id}`)}>
                管理
              </Button>
            </>
          )}
        </div>
      </Space>
    );
  };

  return (
    <Page spinLoading={loading}>
      <Space direction="vertical" style={{ gap: '16px', width: '100%', backgroundColor: '#eee' }}>
        {dataList.map(item => {
          return (
            <CardCommon
              cardHeaderNode={
                <>
                  <span>{item.subject}</span>
                  <span>366人</span>
                </>
              }
            >
              <Space style={{ display: 'flex', width: '100%', gap: '16px' }} direction="vertical">
                {renderStatus(item.status, item.create_time, item.expire_time, item.room_id)}
              </Space>
            </CardCommon>
          );
        })}
      </Space>
    </Page>
  );
};

export default Index;
