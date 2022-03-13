import React, { useState, useEffect } from 'react';
import { Form, Input, Popup, Button, List, Checkbox, Picker } from 'antd-mobile';
import SelectDay from '@component/SelectDay';
import SelectYear from '@component/SelectYear';
import SelectPop from '@component/SelectPop';
import SelectActions from '@component/SelectActions';
import { mineRooms, getRoomListApi } from '@api/bot';
import './index.less';

const Index = () => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [dayVisible, setDayVisible] = useState(false);
  const [roomsList, setRoomList] = useState([]);
  const [grosList, setGrosList] = useState([]);
  const [formValue, setFormValue] = useState<any>({});
  const [form] = Form.useForm();

  const getRoomList = async () => {
    try {
      const resp = await mineRooms();
      const dataList = resp.data?.map(item => {
        return {
          label: item.subject,
          value: item.id,
        };
      });
      setRoomList(dataList);
    } catch (error) {}
  };

  const getGroList = async () => {
    try {
      const resp = await getRoomListApi();
      const dataList = resp.data?.map(item => {
        return {
          label: item.laws,
          value: item.id,
        };
      });
      setGrosList(dataList);
    } catch (error) {}
  };

  useEffect(() => {
    getRoomList();
    getGroList();
    form.setFieldsValue({
      activedList: ['花点小钱官方福利群（天天抢红包）', '花点小钱官方福利群（天天抢红包）'],
    });
  }, []);

  const onValuesChange = (changedValues: any, values: any) => {
    if (changedValues.hasOwnProperty('typeModel')) {
      const newFormValues = { ...values, time: undefined };
      console.log(newFormValues, 'newFormValues');
      form.setFieldsValue(newFormValues);
      setFormValue(newFormValues);
    }
  };

  function submitForm() {
    form.validateFields().then(values => {
      console.log(values)
    });
  }

  return (
    <div>
      <Form form={form} onValuesChange={onValuesChange}>
        <Form.Item name="tags" label="消息标题" rules={[{ required: true, message: '消息标题不能为空' }]}>
          <Input placeholder="请输入消息标题" />
        </Form.Item>
        <Form.Item name="gros">
          <SelectPop dataList={grosList} buttonText={'设置发送目标-活码群'} />
        </Form.Item>
        <Form.Item name="roos">
          <SelectPop dataList={roomsList} buttonText={'设置发送目标-微信群'} />
        </Form.Item>
        <Form.Item
          label="发送模式"
          onClick={() => {
            setPickerVisible(true);
          }}
          name="typeModel"
          trigger="onConfirm"
        >
          <Picker
            visible={pickerVisible}
            onClose={() => {
              setPickerVisible(false);
            }}
            onClick={e => {
              e.stopPropagation();
            }}
            columns={[
              [
                {
                  label: '立即发送',
                  value: '1',
                },
                {
                  label: '定时发送',
                  value: '2',
                },
                {
                  label: '每日发送',
                  value: '3',
                },
              ],
            ]}
          >
            {(items: any[]) => {
              if (items.every(item => item === null)) {
                return '未选择';
              } else {
                return items.map(item => item?.label ?? '未选择').join(' : ');
              }
            }}
          </Picker>
        </Form.Item>
        {formValue?.typeModel?.toString() === '3' ? (
          <Form.Item
            name="time"
            onClick={() => {
              setDayVisible(true);
            }}
          >
            <SelectDay visible={dayVisible} setVisible={setDayVisible} />
          </Form.Item>
        ) : formValue?.typeModel?.toString() === '2' ? (
          <Form.Item
            name="time"
            onClick={() => {
              setDayVisible(true);
            }}
          >
            <SelectYear visible={dayVisible} setVisible={setDayVisible} />
          </Form.Item>
        ) : null}
        <Form.Item name="data">
          <SelectActions buttonText={'添加消息内容'} />
        </Form.Item>
      </Form>
      <div className="group-add-footer">
        <Button
          color="warning"
          block
          onClick={submitForm}
          style={{
            borderRadius: '20px',
          }}
        >
          确认
        </Button>
      </div>
    </div>
  );
};

export default Index;
