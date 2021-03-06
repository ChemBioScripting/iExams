import React from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Checkbox,
  Button,
  message,
  notification,
  Form,
  Alert,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import http from '../../plugins/http/http';
import { useSetState } from 'ahooks';
import { Link } from 'umi';

const styles: any = {
  loginContent: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    left: '50%',
  },

  loginButton: {
    marginTop: '24px',
  },

  mb12: {
    marginBottom: '12px',
  },

  title: {
    fontWeight: '600',
    fontSize: '24px',
  },

  text: {
    fontSize: '16px',
    paddingLeft: '6px',
  },

  pb12: {
    paddingBottom: '12px',
  },

  loginMain: {
    padding: '12px 24px',
  },

  loginInput: {
    width: '100%',
  },
};

interface userInfoType {
  uid: Number;
  email: String;
  phoneNumber: String;
  studentName: String;
  studentNumber: String;
  className: String;
  loginInfo: Object | null;
}

const UserLogin = (props: any) => {
  const login = (values: any) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    http
      .login(data)
      .then(res => {
        if (res.data['Status']) {
          const userInfo: userInfoType = {
            uid: res.data.uid,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            studentName: res.data.studentName,
            studentNumber: res.data.studentNumber,
            className: res.data.className,
            loginInfo: res.data.loginInfo,
          };

          localStorage.setItem('accessToken', res.data.token);
          localStorage.setItem(
            'accessTokenExpireTime',
            (Date.now() + 12 * 60 * 60 * 1000).toString(),
          );
          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          notification['success']({
            message: 'Successfully!',
            description: res.data['Message'],
          });

          props.history.push('/dashboard');
        } else {
          notification['error']({
            message: 'Failed!',
            description: res.data['Message'],
          });
        }
      })
      .catch(res => {
        notification['error']({
          message: 'Failed!',
          description: '??????????????????????????????????????????',
        });
        console.log(res);
      });
  };

  return (
    <div id='user-login'>
      <Row gutter={16}>
        <Col span='8' style={styles.loginContent}>
          <Card style={{ minWidth: '500px' }}>
            <Alert
              message='Demo????????????: 17700000000; ??????: 123456'
              type='info'
            />
            <div id='login-title' style={styles.pb12}>
              <h2 style={styles.title}>??????</h2>
              <span style={styles.text}>????????????iExams.</span>
            </div>

            <div style={styles.loginMain}>
              <Form initialValues={{ rememberMe: true }} onFinish={login}>
                <Form.Item
                  name='username'
                  rules={[{ required: true, message: '?????????????????????' }]}>
                  <Input
                    placeholder='???????????????'
                    prefix={<UserOutlined />}
                    style={styles.loginInput}
                    // onChange={(e) => setState({username: e.target.value})}
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[{ required: true, message: '??????????????????' }]}>
                  <Input.Password
                    placeholder='??????'
                    prefix={<LockOutlined />}
                    style={styles.loginInput}
                    // onChange={(e) => setState({password: e.target.value})}
                  />
                </Form.Item>
                <Form.Item noStyle>
                  <div id='login-other'>
                    <Form.Item
                      name='rememberMe'
                      valuePropName='checked'
                      noStyle>
                      <Checkbox>24h?????????</Checkbox>
                    </Form.Item>
                    <span style={{ float: 'right' }}>
                      <Link to='/user/forget'>????????????</Link>
                    </span>
                  </div>
                </Form.Item>

                <Form.Item noStyle>
                  <div style={styles.loginButton}>
                    <Button
                      style={{ padding: '0 1.75rem' }}
                      type='primary'
                      ghost>
                      ??????
                    </Button>
                    <Button
                      type='primary'
                      htmlType='submit'
                      style={{ float: 'right', padding: '0 1.75rem' }}>
                      ??????
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
            {/*<div style={styles.loginMain}>
              <Input
                value={state.username}
                placeholder="???????????????"
                prefix={<UserOutlined/>}
                style={styles.loginInput}
                onChange={(e) => setState({username: e.target.value})}
              />
              <Input.Password
                value={state.password}
                placeholder="??????"
                prefix={<LockOutlined/>}
                style={styles.loginInput}
                onChange={(e) => setState({password: e.target.value})}
              />
              <div id="login-other">
                <Checkbox v-model="isChecked">24h?????????</Checkbox>
                <span style={{float: "right"}}>
                  <Link to="/user/forget">????????????</Link>
                </span>
              </div>
              <div style={styles.loginButton}>
                <Button style={{padding: "0 1.75rem"}} type="primary" ghost>??????</Button>
                <Button
                  type="primary"
                  style={{float: "right", padding: "0 1.75rem"}}
                  onClick={login}
                >??????</Button>
              </div>
            </div>*/}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserLogin;
