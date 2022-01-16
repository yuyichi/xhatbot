import React, { useState } from 'react';
import { Form, Input, Popup, Button, List, Checkbox } from 'antd-mobile';
import SelectDay from '@component/SelectDay';
import './index.less';
const Index = () => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [dayVisible, setDayVisible] = useState(false);
  return (
    <div>
      <Form>
        <Form.Item name="title" label="消息标题" rules={[{ required: true, message: '消息标题不能为空' }]}>
          <Input placeholder="请输入消息标题" />
        </Form.Item>
        <Form.Item
          name="123"
          trigger="onConfirm"
          onClick={() => {
            setDayVisible(true);
          }}
        >
          <SelectDay visible={dayVisible} setVisible={setDayVisible} />
        </Form.Item>
      </Form>
      <div>
          
      </div>
      <Popup
        visible={pickerVisible}
        onMaskClick={() => {
          setPickerVisible(false);
        }}
        bodyStyle={{ height: '50vh', overflow: 'scroll' }}
      >
        <div className="pop-header">选择发生目标 - 活码群</div>
        <div className="pop-body">
          <List>
            <List.Item>
              <Checkbox>有描述的勾选框</Checkbox>
            </List.Item>
            {/* <List.Item prefix={<PayCircleOutline />} onClick={() => {}}>
              总资产
            </List.Item> */}
          </List>
        </div>
        <div className="pop-footer">
          <Button color='warning' style={{ width: '45vw', borderRadius: '20px' }}>取消</Button>
          <Button color='warning' style={{ width: '45vw',  borderRadius: '20px' }}>确认</Button>
        </div>
      </Popup>
    </div>
  );
};

export default Index;
