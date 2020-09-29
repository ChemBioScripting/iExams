import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'umi';

const Page404 = (): JSX.Element => {
  const history = useHistory();
  console.log('page404');
  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='啊偶，页面被次掉惹.'
        extra={
          <Button type='primary' onClick={() => history.push('/dashboard')}>
            返回
          </Button>
        }
      />
    </div>
  );
};

export default Page404;
