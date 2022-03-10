import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd-mobile';
import Card, { CardCommon } from '@component/card';
import { getMessageListApi, Notice } from '@api/notice';
import { CloseOutline, EditFill } from 'antd-mobile-icons';
import Page from '@component/page';
import './index.less'

const defaultButtonCss = {
  width: '33.3vw',
  height: '40px',
  borderRadius: '0px',
  borderRight: '0px',
};

const Index = () => {
  const history = useHistory();
  const [selected, setSelected] = useState('');
  const [dataList, setDataList] = useState<Notice[]>([]);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const getMessageList = async status => {
    try {
      setLoading(true);
      const resp = await getMessageListApi(status);
      setDataList(resp.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const changeButtonHandle = (buttonStatus: number) => {
    if (buttonStatus === status) {
      return;
    }
    setStatus(buttonStatus);
    getMessageList(buttonStatus);
  };

  useEffect(() => {
    getMessageList(0);
  }, []);
  return (
    <Page spinLoading={loading}>
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '100%', display: 'flex', fontWeight: 'bold' }}>
          <Button
            color={status === 0 ? 'warning' : 'default'}
            onClick={() => changeButtonHandle(0)}
            style={{ ...defaultButtonCss, borderLeft: '0px' }}
          >
            待发送
          </Button>
          <Button
            color={status === 1 ? 'warning' : 'default'}
            onClick={() => changeButtonHandle(1)}
            style={defaultButtonCss}
          >
            每日发送
          </Button>
          <Button
            color={status === 2 ? 'warning' : 'default'}
            onClick={() => changeButtonHandle(2)}
            style={defaultButtonCss}
          >
            已发送
          </Button>
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            width: '100%',
            height: 'calc(100vh - 80px)',
            padding: '20px',
            gap: '16px',
            backgroundColor: 'rgba(241, 241, 241, 1)',
          }}
        >
          {
            dataList.map((item) => {
              return (
                <CardCommon
              cardHeaderNode={
                <>
                  <span>{item.tags}</span>
                  <span style={{ fontSize: '22px' }}>
                    <CloseOutline />
                  </span>
                </>
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#fff',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <span>定时发布：2022-02-02 23:59:59</span>
                <span
                  style={{ color: '#fff', fontSize: '22px' }}
                  onClick={() => history.push('/home/group-notice/edit')}
                >
                  <EditFill />
                </span>
              </div>
            </CardCommon>
              )
            })
          }
        </div>
        <div className="group-add-footer">
          <Button color="warning" block onClick={() => history.push('/home/group-notice/edit')} style={{
            borderRadius: '20px'
          }}>
            创建消息
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default Index;
