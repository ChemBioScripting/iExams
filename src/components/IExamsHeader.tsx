import React from 'react';

import { Layout, Dropdown, Menu, Avatar, notification } from 'antd';

import { history } from 'umi';

import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const styles: any = {
  iExamsHeader: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1001,
  },
  logo: {
    width: '120px',
    height: '31px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '16px 28px 16px 0',
    float: 'left',
  },
  nav: {
    width: '60px',
    margin: '0 0 0 auto',
  },

  avatarStyle: {
    marginRight: '24px',
    cursor: 'pointer',
  },
};

const IExamsHeader = (props: any) => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpireTime');
    localStorage.removeItem('userInfo');
    history.push('/user/login');
    notification['success']({
      message: 'Successfully!',
      description: '注销成功。',
    });
  };

  const dropdownMenu = (
    <Menu slot='list'>
      <Menu.Item>
        <SettingOutlined />
        个人设置
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item onClick={logout}>
        <LogoutOutlined />
        注销
      </Menu.Item>
    </Menu>
  );

  return (
    <div id='i-exams-header' style={styles.iExamsHeader}>
      <Header>
        <div style={styles.logo} />
        <div style={styles.nav}>
          <Dropdown
            trigger={['click']}
            overlayStyle={{ zIndex: '1001' } as any}
            placement='bottomCenter'
            overlay={dropdownMenu}
            arrow>
            <Avatar
              icon={<UserOutlined />}
              size={42}
              style={styles.avatarStyle}
            />
          </Dropdown>
        </div>
      </Header>
    </div>
  );
};

export default IExamsHeader;
