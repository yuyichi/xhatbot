import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import copy from 'copy-to-clipboard';
import { Space } from 'antd-mobile';
import { CardMain, CardCommon } from '@component/card';
import Page from '@component/page';
// import { RightOutline } from 'antd-mobile-icons';
import { getUserInfoApi, getUserDetailApi } from '@api/user';
import { setLogin, getToken } from '@util/user';
import { getBotListApi, getCDKEYApi } from '@api/bot';
import './index.less';
import { string } from 'prop-types';

const CardDatas = [];

const Index = () => {
  const history = useHistory();
  const [cardMainVisible, setCardMainVisible] = useState(true);
  const [botList, setBotList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [CDKEY, setCDKey] = useState(null);

  const [isLogin, setIsLogin] = useState(false);

  const getUserDetial = useCallback(async () => {
    try {
      setLoading(true);
      const userRep = await getUserDetailApi();
      const botList = await getBotListApi();
      const CDKEYRep = await getCDKEYApi();
      setBotList(botList.data);
      setCDKey(CDKEYRep.data);
      setIsLogin(false);
      console.log(userRep);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserInfo = useCallback(async (username: string) => {
    try {
      setLoading(true);
      const userInfoRep = await getUserInfoApi({
        username,
        category: 3,
        platform: 3,
      });
      if (userInfoRep.data) {
        const useData = userInfoRep.data;
        setLogin(useData);
        getUserDetial();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    console.log(parsed);
    if (getToken()) {
      getUserDetial();
    } else {
      if (parsed.openid) {
        getUserInfo(parsed.openid as string);
      } else {
        window.location.href =
          'https://sso.linkto.xin/weixin/oauth2/request?appkey=master&redirect_uri=http%3A%2F%2Flocalhost%3A6008/home';
      }
    }
  }, []);

  return (
    <Page spinLoading={loading}>
      <Space
        direction="vertical"
        style={{
          gap: '16px',
          width: '100%',
          backgroundColor: '#eee',
          overflow: 'scroll',
          height: '100vh',
          boxSizing: 'border-box',
          paddingBottom: '20px',
        }}
      >
        <CardMain
          showBody={cardMainVisible}
          headerNode={
            <>
              <span>群管家</span>
              <span>一分钟包学包会</span>
              <span onClick={() => setCardMainVisible(!cardMainVisible)}>{cardMainVisible ? '收起' : '展开'}</span>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>第一步、在下方【群管家】中选择一个你喜欢的</span>
            <span>第二步、复制你选择的【群管家】微信号</span>
            <span>第三步、打开微信APP，添加【群管家】为好友</span>
            <span>第四步、邀请【群管家】进入需要管理的微信群</span>
            <span>第五步、激活【群管家】，激活方式如下在群内【@群管理】发送【激活码】 @元宝 XHATBOT_xxxxxxxx</span>
          </div>
        </CardMain>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2vw' }}>
          {botList.map((item, index) => (
            <CardCommon
              cardCss={{ width: '49vw', marginTop: index > 1 ? '12px' : 0 }}
              cardHeaderNode={
                <>
                  <span>群管家</span>
                  <span>{item.name}</span>
                </>
              }
            >
              微信：{item.weixin}
            </CardCommon>
          ))}
        </div>
        {CDKEY && (
          <CardCommon
            cardHeaderNode={
              <>
                <span>激活码</span>
                <span>{CDKEY}</span>
                <span onClick={() => copy(CDKEY)}>复制</span>
              </>
            }
          >
            群激活口令、激活免费试用、无限数量激活
          </CardCommon>
        )}
        <CardCommon
          cardHeaderNode={
            <>
              <span>群活码（群推广神器）</span>
              <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push('/home/group', {CDKEY})}>
                管理
                <img src={require('@/assets/img/u11.png')} style={{ width: '14px' }} />
              </span>
            </>
          }
        >
          群推广活码、自动创建新群、群成员去重复
        </CardCommon>
        <CardCommon
          cardHeaderNode={
            <>
              <span>管理群（已激活的群）</span>
              <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push('/home/group-list')}>
                管理
                <img src={require('@/assets/img/u11.png')} style={{ width: '14px' }} />
              </span>
            </>
          }
        >
          轻松管理群、维护群聊环境、智能客服对话
        </CardCommon>
        <CardCommon
          cardHeaderNode={
            <>
              <span>群消息（无限制群发）</span>
              <span style={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push('/home/group-notice')}>
                管理
                <img src={require('@/assets/img/u11.png')} style={{ width: '14px' }} />
              </span>
            </>
          }
        >
          定时发消息、告别起早贪黑、省心省事省力
        </CardCommon>
      </Space>
    </Page>
  );
};

export default Index;
