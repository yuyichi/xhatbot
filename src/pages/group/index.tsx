import React, { useState, useEffect } from 'react';
import Page from '@component/page';
import { Button, Popup, Toast, Input } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { saveRoom, getRoomListApi, Room, deleteRoom, syncRoom } from '@api/bot';
import GroupCard from '@component/groupCard';
import './index.less';

const Index = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [editId, setEditId] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [CDKEY, setCDKEY] = useState(null);

  const getRoomList = async () => {
    try {
      setLoading(true);
      const resp = await getRoomListApi();
      setRoomList(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const state = history.location.state;
    if (state) {
      // @ts-ignore
      setCDKEY(state?.CDKEY || null);
    }
    getRoomList();
  }, []);

  const onOk = async value => {
    try {
      if (!value) {
        Toast.show('请输入名称')
        return;
      }
      let id = null;
      if (editId) {
        id = editId;
      }
      const rep = await saveRoom(value, id);
      getRoomList();
      setEditId(null);
      setVisible(false);
      setEditInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandle = async (id: number) => {
    try {
      const rep = await deleteRoom(id);
      getRoomList();
    } catch (error) {
      console.log(error);
    }
  }

  const modifyHandle =  (id: number, inputValue: string) => {
    setEditId(id);
    setVisible(true);
    setEditInputValue(inputValue);
  }

  const syncHandle = async (id: number, sync: number) => {
    try {
      const syncReq = sync === 0 ? 1 : 0;
      await syncRoom(id, syncReq)
      getRoomList();
    } catch (error) {
      
    }
  }

  return (
    <Page spinLoading={loading}>
      <div className="group-container">
        {roomList.map(item => {
          return <GroupCard itemKey={item.id} data={item} deleteHandle={deleteHandle} modifyHandle={modifyHandle} syncHandle={syncHandle} />;
        })}
        <div className="group-add-footer">
          <Button color="warning" block onClick={() => setVisible(true)}>
            创建群活码
          </Button>
        </div>
        <TextPop text={editId ? '修改群活码' :'创建群活码'} visible={visible} setVisible={setVisible} onOk={onOk} editInputValue={editInputValue} />
      </div>
    </Page>
  );
};

const TextPop = props => {
  const { visible, setVisible, text, onOk, editInputValue } = props;
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText(editInputValue);
  }, [visible]);

  const onOkHandle = () => {
    onOk && onOk(inputText);
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{ height: '180px', overflow: 'scroll' }}
    >
      <div className="pop-header">{text}</div>
      <div className="pop-body">
        <Input
          placeholder="请填写群活码名称（群命名规则）"
          value={inputText}
          onChange={val => {
            setInputText(val);
          }}
        />
      </div>
      <div className="pop-footer">
        <Button
          style={{ width: '40vw', borderRadius: '20px' }}
          onClick={() => {
            setVisible(false);
          }}
        >
          关闭
        </Button>
        <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={onOkHandle}>
          确认
        </Button>
      </div>
    </Popup>
  );
};

export default Index;
