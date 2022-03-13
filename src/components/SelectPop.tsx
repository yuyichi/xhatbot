import React, { useState, useEffect } from 'react';
import { Button, Space, List, Checkbox, Popup } from 'antd-mobile';
import './index.less';

interface SelectPopProps {
  buttonText: string;
  dataList: any[];
  value?: any;
  onChange?: (value: any) => void;
}

const Index = (props: SelectPopProps) => {
  const [visible, setVisible] = useState(false);
  const [checkValue, setCheckValue] = useState([]);
  const [renderText, setRenderText] = useState('');
  const { buttonText, value, onChange, dataList } = props;
  useEffect(() => {
    let text = ''
    value?.forEach((valueItem, index) => {
      const data = dataList.find((item) => item.value === valueItem)
      if (data) {
        text += data.label
        if (index !== value.length - 1) { 
          text += ', '
        }
      }
      setRenderText(text);
    })
    setCheckValue(value || []);
  }, [value])

  const checkValueHandler = (checked: boolean, itemValue: number) => {
    const newCheckValue = [...checkValue];
    if (checked) {
      if (checkValue.includes(itemValue)) {
        return ;
      } else {
        newCheckValue.push(itemValue);
        setCheckValue(newCheckValue)
      }
    } else {
      
      const itemIndex = newCheckValue.findIndex((item) => item === itemValue);
      if (itemIndex >= 0) {
        newCheckValue.splice(itemIndex, 1);
      }
      setCheckValue(newCheckValue)
    }
  }
  return (
    <>
      <Space direction="vertical" block>
        <Button
          block
          color='warning'
          onClick={() => {
            setVisible(true);
          }}
        >
          {buttonText}
        </Button>
        {value?.length > 0 && (
          <div className="SelectPopValueContainer">
            <span className="leftText">{renderText}</span>
            <span className="rightText">{value.length}个群</span>
          </div>
        )}
      </Space>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: '50vh', overflow: 'scroll' }}
      >
        <div className="pop-header">选择发生目标 - 活码群</div>
        <div className="pop-body">
          <List>
            {dataList.map((item) => {
              return (
                <List.Item>
                  <Checkbox checked={checkValue.includes(item.value)} onChange={(checked) => checkValueHandler(checked, item.value)}>{item.label}</Checkbox>
                </List.Item>
              );
            })}
          </List>
        </div>
        <div className="pop-footer">
          <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={() => setVisible(false)}>
            取消
          </Button>
          <Button color="warning" style={{ width: '40vw', borderRadius: '20px' }} onClick={() => {
            onChange(checkValue)
            setVisible(false)
          }}>
            确认
          </Button>
        </div>
      </Popup>
    </>
  );
};

export default Index;
