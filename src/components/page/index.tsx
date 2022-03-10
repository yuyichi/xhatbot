import React from 'react';
import Spin from '@component/loading';
import './index.less'

interface PageProps {
  spinLoading: boolean;
  children: React.ReactNode;
}

const Page = (props: PageProps) => {
  const { spinLoading, children } = props;
  return (
    <div className="page-container">
      <Spin visible={spinLoading}>{children}</Spin>
    </div>
  );
};

export default Page;
