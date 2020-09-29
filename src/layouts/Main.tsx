import React from 'react';
import { BackTop, Layout } from 'antd';

import IExamsHeader from '../components/IExamsHeader';
import IExamsSideBar from '../components/IExamsSideBar';
import IExamsFooter from '../components/IExamsFooter';

const styles = {
  contentContainer: {
    marginTop: '64px',
    marginLeft: '260px',
  },
  contentMain: {
    padding: '26px 16px 0 16px',
  },
};

const Main = (props: any) => {
  const sideBarProps = {
    name: props.name,
    meta: props.meta,
  };

  return (
    <div id='layouts-main'>
      <Layout style={{ minHeight: '100vh' }}>
        <IExamsHeader />
        <Layout>
          <IExamsSideBar {...sideBarProps} />
          <Layout style={styles.contentContainer}>
            <Layout style={styles.contentMain}>
              {props.children}
              <BackTop />
            </Layout>
            <IExamsFooter />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default Main;
