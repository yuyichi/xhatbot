import React, { useState, useEffect } from 'react';
import { Form, Input, Popup, Button, List, Checkbox, Picker } from 'antd-mobile';
import SelectDay from '@component/SelectDay';
import SelectPop from '@component/SelectPop';
import SelectActions from '@component/SelectActions';
import { mineRooms, getRoomListApi } from '@api/bot';
import './index.less';

const Index = () => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [dayVisible, setDayVisible] = useState(false);
  const [roomsList, setRoomList] = useState([]);
  const [grosList, setGrosList] = useState([]);
  const [form] = Form.useForm();

  const getRoomList = async () => {
    try {
      const resp = await mineRooms();
      const dataList = resp.data?.map((item) => {
        return {
          label: item.subject,
          value: item.id,
        }
      })
      setRoomList(dataList)
    } catch (error) {
      
    }
  }

  const getGroList = async () => {
    try {
      const resp = await getRoomListApi();
      const dataList = resp.data?.map((item) => {
        return {
          label: item.laws,
          value: item.id,
        }
      })
      setGrosList(dataList)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getRoomList()
    getGroList()
    form.setFieldsValue({
      activedList: ['花点小钱官方福利群（天天抢红包）', '花点小钱官方福利群（天天抢红包）'],
    });
  }, []);

  const onValuesChange = (changedValues: any, values: any) => {
    console.log(values, 'onValues')
    if (changedValues.hasOwnProperty(values)) {
      
    }
  }
  return (
    <div>
      <Form form={form} onValuesChange={onValuesChange}>
        <Form.Item name="tags" label="消息标题" rules={[{ required: true, message: '消息标题不能为空' }]}>
          <Input placeholder="请输入消息标题" />
        </Form.Item>
        <Form.Item name="groslist">
          <SelectPop dataList={grosList}  buttonText={'设置发送目标-活码群'} />
        </Form.Item>
        <Form.Item name="roomlist">
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
            columns={[[
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
            ]]}
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
        <Form.Item
          name="time"
          trigger="onConfirm"
          onClick={() => {
            setDayVisible(true);
          }}
        >
          <SelectDay visible={dayVisible} setVisible={setDayVisible} />
        </Form.Item>
        <Form.Item name="data">
          <SelectActions buttonText={'添加消息内容'} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;


// [[
//   {
//     label: '立即发送',
//     value: '立即发送',
//   },
//   {
//     label: '定时发送',
//     value: '定时发送',
//   },
//   {
//     label: '每日发送',
//     value: '每日发送',
//   },
// ]]

