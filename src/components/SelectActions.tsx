import React, { useState, useEffect } from 'react';
import { Button, Space, List, Checkbox, ActionSheet, Popup, TextArea } from 'antd-mobile';
import { CloseOutline, EditFill } from 'antd-mobile-icons';
import OssUpload from '@component/ossUpload';
import './index.less';

enum ActionType {
  Content = '@content',
  Text = 'text',
  Picture = 'picture',
}

interface Action {
  text: string;
  data?: string;
  key: string;
  visible?: boolean;
}

const actions: Action[] = [
  { text: '群公告@所有人', key: ActionType.Content },
  { text: '文本', key: ActionType.Text },
  { text: '图片', key: ActionType.Picture },
];

interface SelectPopProps {
  buttonText: string;
  value?: any;
  onChange?: (value: any) => void;
}

const Index = (props: SelectPopProps) => {
  const [visible, setVisible] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  const [datas, setDatas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { buttonText, onChange } = props;
  const onActionHandle = (action: any, index: number) => {
    const newDatas = [...datas];
    const text = ActionType.Content === action.key ? '@所有人发个群公告...' : '随便发条文本消息，哈哈...';
    newDatas.push({
      ...action,
      text,
      visible: false,
    });
    setDatas(newDatas);
    onChange(newDatas);
  };

  const setActionVisible = (index, visible: boolean) => {
    const newDatas = [...datas];
    const newAction = {
      ...datas[index],
      visible,
    };
    newDatas.splice(index, 1, newAction);
    setDatas(newDatas);
    onChange(newDatas);
  };

  const deleteHandle = (index: number) => {
    const newDatas = [...datas];
    newDatas.splice(index, 1);
    setDatas(newDatas);
    onChange(newDatas);
  };

  const visibleInput = (index: number) => {
    setCurrentIndex(index);
    setPopVisible(true);
  };

  const inputData = (text: string, index?: number) => {
    const newDatas = [...datas];
    const i = index !== undefined ? index : currentIndex;
    const newAction = {
      ...datas[i],
      data: text,
    };
    newDatas.splice(i, 1, newAction);
    setDatas(newDatas);
    onChange(newDatas);
    setPopVisible(false);
  };

  console.log(datas, '123')

  const renderData = (action: Action, index: number) => {
    return (
      <div
        key={`${action.text}-${index}`}
        style={{
          position: 'relative',
          width: '107px',
          height: '107px',
          padding: '5px',
          boxSizing: 'border-box',
          border: '1px solid rgba(121, 121, 121, 1)',
          backgroundColor: '#fff',
        }}
      >
        {action.key === ActionType.Content || action.key === ActionType.Text ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="textOver"
              style={{
                width: '100%',
                height: '44px',
              }}
            >
              {action.data ? action.data : action.text}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: '35px',
                  borderRadius: '35px',
                  backgroundColor: '#aaa',
                  textAlign: 'center',
                  lineHeight: '35px',
                  fontSize: '22px',
                }}
              >
                <CloseOutline style={{ color: '#fff' }} onClick={() => deleteHandle(index)} />
              </div>
              <div
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '35px',
                  backgroundColor: 'orange',
                  textAlign: 'center',
                  lineHeight: '35px',
                  color: '#fff',
                  fontSize: '22px',
                }}
              >
                <EditFill onClick={() => visibleInput(index)} />
              </div>
            </div>
          </div>
        ) : null}
        {action.key === ActionType.Picture && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <OssUpload ossIndex={index} inputData={inputData}  />
          </div>
        )}
      </div>
    );
  };


  return (
    <>
      <Space direction="vertical" block>
        <Button
          block
          color="warning"
          onClick={() => {
            setVisible(true);
          }}
        >
          {buttonText}
        </Button>
        <div style={{ display: 'flex', gap: '5%', flexWrap: 'wrap', rowGap: '10px' }}>
          {datas.map((item, index) => {
            return renderData(item, index);
          })}
        </div>
      </Space>
      <ActionSheet
        actions={actions}
        cancelText="取消"
        visible={visible}
        onClose={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}
        onAction={onActionHandle}
      />
      <TextPop visible={popVisible} text={datas?.[currentIndex]?.data} setVisible={setPopVisible} onOk={inputData} />
    </>
  );
};

const TextPop = props => {
  const { visible, setVisible, text, onOk } = props;
  const [inputText, setInputText] = useState(null);
  useEffect(() => {
    if (visible === false) {
      setInputText('');
    } else {
      if (text) {
        setInputText(text);
      }
    }
  }, [visible]);
  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{ height: '50vh', overflow: 'scroll' }}
    >
      <div className="pop-header">输入文本</div>
      <div className="pop-body">
        <TextArea
          placeholder="请输入内容"
          value={inputText}
          onChange={val => {
            console.log(val);
            setInputText(val);
          }}
        />
      </div>
      <div className="pop-footer">
        <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={() => setVisible(false)}>
          取消
        </Button>
        <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={() => onOk(inputText)}>
          确认
        </Button>
      </div>
    </Popup>
  );
};

export default Index;
