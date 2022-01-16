import React from 'react';
import { useHistory } from 'react-router-dom';

import { Space } from 'antd-mobile';
import Card from '@component/card';
import { RightOutline } from 'antd-mobile-icons';
import './index.less';

const CardDatas = [];

const Index = () => {
  const history = useHistory();

  return (
    <Space direction="vertical" style={{ gap: '16px', width: '100%', backgroundColor: '#eee', overflow: 'scroll',
    height: '100vh', boxSizing: 'border-box', paddingBottom: '100px'}}>
      <div style={{ display: 'flex' }}>
        <Card
          cardHeaderCss={{ backgroundColor: 'rgba(247, 101, 85, 1)', color: 'white' }}
          cardHeaderNode={
            <>
              <span>群管家</span>
              <span>一分钟包学包会</span>
              <span>收起</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>第一步、在下方【群管家】中选择一个你喜欢的</span>
            <span>第二步、复制你选择的【群管家】微信号</span>
            <span>第三步、打开微信APP，添加【群管家】为好友</span>
            <span>第四步、邀请【群管家】进入需要管理的微信群</span>
            <span>第五步、激活【群管家】，激活方式如下在群内【@群管理】发送【激活码】 @元宝 XHATBOT_xxxxxxxx</span>
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          cardCss={{ width: '49vw' }}
          cardHeaderCss={{ backgroundColor: '#ffffff' }}
          cardHeaderNode={
            <>
              <span>群管家</span>
              <span>元宝</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          微信：bot_yuanbao
        </Card>
        <Card
          cardCss={{ width: '49vw' }}
          cardHeaderCss={{ backgroundColor: '#ffffff' }}
          cardHeaderNode={
            <>
              <span>群管家</span>
              <span>元宝</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          微信：bot_yuanbao
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          cardHeaderCss={{ backgroundColor: '#ffffff' }}
          cardHeaderNode={
            <>
              <span>激活码</span>
              <span>XHATBOT_n4J84tpJ</span>
              <span>复制</span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          群激活口令、激活免费试用、无限数量激活
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          cardHeaderCss={{ backgroundColor: '#ffffff' }}
          cardHeaderNode={
            <>
              <span>群活码（群推广神器）</span>
              <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push('/group')}>
                管理
                <img src={require('@/assets/img/u11.png')} style={{ width: '14px' }} />
              </span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          群推广活码、自动创建新群、群成员去重复
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          cardHeaderCss={{ backgroundColor: '#ffffff' }}
          cardHeaderNode={
            <>
              <span>管理群（已激活的群）</span>
              <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push('/group-list')}>
                管理
                <img src={require('@/assets/img/u11.png')} style={{ width: '14px' }} />
              </span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          轻松管理群、维护群聊环境、智能客服对话
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          cardHeaderCss={{ backgroundColor: '#ffffff' }}
          cardHeaderNode={
            <>
              <span>群消息（无限制群发）</span>
              <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push('/group-notice')}>
                管理
                <img src={require('@/assets/img/u11.png')} style={{ width: '14px' }} />
              </span>
            </>
          }
          cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
        >
          定时发消息、告别起早贪黑、省心省事省力
        </Card>
      </div>
    </Space>
  );
};

export default Index;
