import React from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

const IExamsFooter = (props: any) => {
  const nowYear = new Date().getFullYear().toString();

  return (
    <div
      className='i-exams-footer'
      style={{
        textAlign: 'center',
      }}>
      <Footer>
        &copy;{nowYear}
        <a href='/'>iExams</a>, All rights Reserved. By
        <a href='https://www.zeroy.net'>ZeroY</a>
      </Footer>
    </div>
  );
};

export default IExamsFooter;
