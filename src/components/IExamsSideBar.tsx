import React from 'react';

import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import { history } from 'umi';

const { Sider } = Layout;

const styles: any = {
  iExamsSidebar: {
    marginTop: '64px',
    position: 'fixed',
    left: 0,
    zIndex: 1001,
    height: '100%',
    background: '#fff',
  },
};

const IExamsSideBar = (props: any) => {
  return (
    <div id='i-exams-sidebar' style={styles.iExamsSidebar}>
      <Sider width={260}>
        <Menu mode='inline' defaultSelectedKeys={[props.name]}>
          <Menu.Item
            key='dashboard'
            icon={<DashboardOutlined />}
            onClick={() => history.push('/dashboard')}>
            仪表盘
          </Menu.Item>
          <Menu.Item
            key='exams-list'
            icon={<EditOutlined />}
            onClick={() => history.push('/exams/list')}>
            近期考试
          </Menu.Item>
          <Menu.Item
            key='result-list'
            icon={<UnorderedListOutlined />}
            onClick={() => history.push('/result/list')}>
            历史成绩
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default IExamsSideBar;
