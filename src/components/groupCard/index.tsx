import React from 'react';
import { Switch } from 'antd-mobile';
import { CloseCircleFill, EditFill, DownlandOutline } from 'antd-mobile-icons';
import { Room } from '@api/bot';
import './index.less';

interface GroupCardProps {
  data: Room;
  itemKey: number;
  deleteHandle: (id: number) => void;
  modifyHandle: (id: number, inputValue: string) => void;
  syncHandle: (id: number, sync: number) => void;
}

const Index = (props: GroupCardProps) => {
  const { data, itemKey, deleteHandle, modifyHandle, syncHandle } = props;
  return (
    <div className="group-card-container" key={itemKey}>
      <div className="group-card-body">
        <div className="group-card-body-title">{data.laws}</div>
        <img src={data.data} alt="" />
        <div style={{ marginTop: '20px', display: 'flex', width: '100%', justifyContent: 'space-between', color: 'white', lineHeight: '30px'}}>
          <span>禁止成员重复</span>
          <Switch checked={Boolean(data.sync)} onChange={() => syncHandle(data.id, data.sync)} />
        </div>
      </div>
      <div className="group-card-footer">
        <div style={{ width: '35px', fontSize: '35px', color: '#fff' }}>
          <CloseCircleFill onClick={() => deleteHandle(data.id)} />
        </div>
        <div
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '35px',
            backgroundColor: 'green',
            textAlign: 'center',
            lineHeight: '35px',
            color: '#fff',
            fontSize: '22px',
          }}
        >
          <EditFill onClick={() => modifyHandle(data.id, data.laws)}/>
        </div>
        <div
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '35px',
            backgroundColor: '#fff',
            textAlign: 'center',
            lineHeight: '35px',
            color: '#000',
            fontSize: '22px',
          }}
        >
          <DownlandOutline />
        </div>
      </div>
    </div>
  );
};

export default Index;
