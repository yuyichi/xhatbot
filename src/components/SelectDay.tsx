import React from 'react';
import { Picker, Space, Button } from 'antd-mobile';

const basicColumns = [
  [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ],
  [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ],
];

interface SelectDayProps {
  visible?: boolean;
  setVisible?: (value: boolean) => void;
  value?: any;
}

const SelectDay = (props: SelectDayProps) => {
  const { visible, setVisible } = props;

  return (
    <Space align="center">
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        选择
      </Button>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={props.value}
        onConfirm={(value) => { console.log(value)}}
      >
        {(items: any[]) => {
          if (items.every(item => item === null)) {
            return '未选择';
          } else {
            return items.map(item => item?.label ?? '未选择').join(' : ');
          }
        }}
      </Picker>
    </Space>
  );
};

export default SelectDay;
