import React from 'react';
import { CloseCircleFill, EditFill, DownlandOutline } from 'antd-mobile-icons'
import './index.less'

const Index = () => {

  return <div className="group-card-container">
    <div className="group-card-body">
     <div className="group-card-body-title">
         花点小钱官方福利群（天天抢红包）
     </div>

    </div>
    <div className="group-card-footer">
      <div style={{width: '35px', fontSize: '35px', color: '#fff'}}><CloseCircleFill /></div>
      <div style={{width: '35px', height: '35px', borderRadius: '35px', backgroundColor: 'green', textAlign: 'center', lineHeight: '35px', color: '#fff', fontSize: '22px'}}>
        <EditFill />
      </div>
      <div style={{width: '35px', height: '35px', borderRadius: '35px', backgroundColor: '#fff', textAlign: 'center', lineHeight: '35px', color: '#000', fontSize: '22px'}}>
        <DownlandOutline />
      </div>
    </div>
  </div>;
};

export default Index;
