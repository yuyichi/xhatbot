import React, { useState, useEffect } from 'react';
import './index.less';

interface propsType {
  visible: boolean;
  children?: any;
  tips?: any;
  delay?: number;
}

const Loading: React.FC = () => (
  <div className="spinner">
    <div className="rect1"></div>
    <div className="rect2"></div>
    <div className="rect3"></div>
    {/* <div className="rect4"></div>
    <div className="rect5"></div> */}
  </div>
);

let timer: any;

export default function Spin(props: propsType) {
  const [visible, setVisible] = useState(props.visible);
  useEffect(() => {
    if (props.delay) {
      timer && clearTimeout(timer);
      if (props.visible) {
        timer = setTimeout(() => setVisible(true), props.delay);
      } else {
        setVisible(false);
      }
    } else {
      setVisible(props.visible);
    }
  }, [props.visible]);
  return (
    <div className={visible ? 'hp-spin' : 'hp-spin hide'}>
      {/* {visible === false ? props.children : null} */}
      {props.children}
      <div className={props.children ? 'spin-content' : ''}>
        <Loading />
      </div>
    </div>
  );
}
