import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd-mobile';
import Card from '@component/card';
import { CloseOutline, EditFill } from 'antd-mobile-icons'

const defaultButtonCss = {
  width: '33.3vw',
  height: '40px',
  borderRadius: '0px',
  borderRight: '0px',
};

const Index = () => {
  const history = useHistory();
  const [selected, setSelected] = useState('');
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', display: 'flex' }}>
        <Button style={{ ...defaultButtonCss, borderLeft: '0px' }}>待发送</Button>
        <Button color="warning" style={defaultButtonCss}>
          每日发送
        </Button>
        <Button style={defaultButtonCss}>已发送</Button>
      </div>
      <div style={{ boxSizing: 'border-box', width: '100%', height: 'calc(100vh - 80px)', padding: '20px', gap: '16px' ,backgroundColor: 'rgba(241, 241, 241, 1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card
            cardHeaderCss={{ backgroundColor: '#ffffff' }}
            cardHeaderNode={
              <>
                <span>消息测试</span>
                <span style={{fontSize: '22px'}}>
                  <CloseOutline />
                </span>
              </>
            }
            cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', width: '100%', alignItems: 'center', marginTop: '10px' }}>
              <span>过期时间：2022-02-02 23:59:59</span>
              <span style={{ color: '#fff', fontSize: '22px'}} onClick={() => history.push('/group-notice/edit')}><EditFill /></span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
