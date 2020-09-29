import React from 'react';

import axios from '@/plugins/http/axios';
import http from '@/plugins/http/http';
import { notification } from 'antd';

import { Redirect } from 'umi';

const loginTimeout = (props: any) => {
  notification['warning']({
    message: 'Successfully!',
    description: '登录超时，请重新登录。',
  });
};

const removeLocalStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('accessTokenExpireTime');
  localStorage.removeItem('userInfo');
};

const authTokenUrl: Array<String> = [
  '/dashboard',
  '/exams/list',
  '/exams/paper',
  '/result/list',
];

const tokenAuth = (props: any) => {
  if (authTokenUrl.includes(props.location.pathname)) {
    const accessToken = localStorage.getItem('accessToken') || '';
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + accessToken;

      const nowDate: number = Date.now();
      const expireTime: number = parseInt(
        localStorage.getItem('accessTokenExpireTime') || '0',
      );
      const renewStartTime: number = expireTime - 60 * 60 * 1000;

      if (nowDate >= renewStartTime && nowDate < expireTime) {
        // 发送续签请求
        http
          .refreshToken()
          .then(res => {
            if (res.data['Status']) {
              localStorage.setItem('accessToken', res.data.token);
              localStorage.setItem(
                'accessTokenExpireTime',
                (Date.now() + 12 * 60 * 60 * 1000).toString(),
              );
              console.log('token续签成功.');
            } else {
              loginTimeout(props);
              removeLocalStorage();
              return <Redirect to='/user/login' />;
            }
          })
          .catch(res => {
            console.log(res);
            loginTimeout(props);
            removeLocalStorage();
            return <Redirect to='/user/login' />;
          });
      } else if (nowDate > expireTime) {
        //登录超时
        removeLocalStorage();
        return <Redirect to='/user/login' />;
      } else {
        return props.children;
      }
    } else {
      return <Redirect to='/user/login' />;
    }
  } else {
    return props.children;
  }
};

export default tokenAuth;
