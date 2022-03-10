import React, { useState } from 'react';
import { Button, Space, List, Checkbox, ActionSheet, Popup, TextArea } from 'antd-mobile';
import { CloseCircleFill, EditFill } from 'antd-mobile-icons';
import './index.less';

enum ActionType {
  Content = '@content',
  Text = 'text',
  Picture = 'picture',
}

interface Action {
  text: string;
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
  const { buttonText, onChange } = props;
  const onActionHandle = (action: any, index: number) => {
    console.log(action, index);
    const newDatas = [...datas];
    newDatas.push({
      ...action,
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

  const renderData = (action: Action, index: number) => {
    console.log(action.key, ActionType.Text);
    console.log(action.key === ActionType.Text, index);
    return (
      <div
        key={`${action.text}-${index}`}
        style={{
          position: 'relative',
          width: '107px',
          height: '107',
          padding: '10px',
          boxSizing: 'border-box',
          border: '1px solid rgba(121, 121, 121, 1)',
          backgroundColor: '#fff',
        }}
      >
        {action.key === ActionType.Text ? (
          <div>
            <span>@所有人发个群公告...</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{ width: '35px', fontSize: '35px'}}>
                <CloseCircleFill />
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
                <EditFill />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Space direction="vertical" block>
        <Button
          block
          color="primary"
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
      <TextPop visible={popVisible} setVisible={setPopVisible} />
    </>
  );
};

const TextPop = props => {
  const { visible, setVisible, text, onOk } = props;
  const [inputText, setInputText] = useState(null);
  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{ height: '50vh', overflow: 'scroll' }}
    >
      <div className="pop-header">{text}</div>
      <div className="pop-body">
        <TextArea
          placeholder="请输入内容"
          value={inputText}
          onChange={val => {
            setInputText(val);
          }}
        />
      </div>
      <div className="pop-footer">
        <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={() => setVisible(false)}>
          取消
        </Button>
        <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={() => onOk()}>
          确认
        </Button>
      </div>
    </Popup>
  );
};

export default Index;
