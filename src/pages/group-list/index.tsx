import React from 'react';
import { Space, Button } from 'antd-mobile';
import Card from '@component/card';

const Index = () => {
  return (
    <Space direction="vertical" style={{ gap: '16px', width: '100%', height: '100vh', backgroundColor: '#eee' }}>
      <div style={{ display: 'flex' }}>
        <Card
          cardHeaderCss={{ backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000' }}
          cardHeaderNode={
            <>
              <span>花点小钱官方福利群(天天抢红包)</span>
              <span>366人</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          <Space style={{ display: 'flex', width: '100%', gap: '16px' }} direction="vertical">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <span>管理中</span>
              <span>过期时间：2022-02-02 23:59:59</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <Button block color='primary'>管理</Button>
            </div>
          </Space>
        </Card>
      </div>
      <div style={{ display: 'flex' }}>
        <Card
          cardHeaderCss={{ backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000' }}
          cardHeaderNode={
            <>
              <span>花点小钱官方福利群(天天抢红包)</span>
              <span>366人</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          <Space style={{ display: 'flex', width: '100%', gap: '16px' }} direction="vertical">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <span>将到期</span>
              <span>过期时间：2022-02-02 23:59:59</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <Button color='warning' style={{width: '40vw'}}>续费</Button>
              <Button color='primary' style={{width: '40vw'}}>管理</Button>
            </div>
          </Space>
        </Card>
      </div>
      <div style={{ display: 'flex' }}>
        <Card
          cardHeaderCss={{ backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000' }}
          cardHeaderNode={
            <>
              <span>花点小钱官方福利群(天天抢红包)</span>
              <span>366人</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          <Space style={{ display: 'flex', width: '100%', gap: '16px' }} direction="vertical">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <span>管理中</span>
              <span>过期时间：2022-02-02 23:59:59</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <Button block color='warning'>续费</Button>
            </div>
          </Space>
        </Card>
      </div>
    </Space>
  );
};

export default Index;
