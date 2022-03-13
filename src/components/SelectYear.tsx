import React from 'react';
import { DatePicker, Space, Button } from 'antd-mobile';
import { FormatShowTime } from '@util/time';


interface SelectDayProps {
  visible?: boolean;
  setVisible?: (value: boolean) => void;
  onChange?: (value: any) => void;
  value?: any;
}

const SelectDay = (props: SelectDayProps) => {
  const { visible, setVisible, onChange } = props;

  return (
    <Space align="center">
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        年-月-日-时-分
      </Button>
      <DatePicker
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        precision='minute'
        value={props?.value}
        onConfirm={(value) => { onChange(value)}}
      >
        {value => FormatShowTime(value)}
      </DatePicker>
    </Space>
  );
};

export default SelectDay;
