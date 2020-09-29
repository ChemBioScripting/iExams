import React, { useEffect } from 'react';

import {
  Row,
  Col,
  Statistic,
  Card,
  Descriptions,
  Tooltip,
  Progress,
} from 'antd';

import DashboardCard from '@/components/Dashboard/DashboardCard';

import {
  EditOutlined,
  UnorderedListOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import { useSetState } from 'ahooks';

import { Line } from '@ant-design/charts';

const { Countdown } = Statistic;

const styles: any = {
  progressStyle: {
    textAlign: 'center',
    paddingBottom: '10px',
    fontWeight: '600',
    fontSize: '18px',
  },
  userInfoTitle: {
    paddingBottom: '30px',
    fontWeight: '600',
    fontSize: '18px',
  },
};

const Dashboard = (props: any) => {
  const [state, setState] = useSetState({
    userInfo: {
      uid: '',
      email: '',
      phoneNumber: '',
      studentName: '',
      studentNumber: '',
      className: '',
      loginInfo: '',
    },
  });

  const iconStyle = {
    fontSize: '32px',
  };

  const fakeData = [
    {
      date: '2020-09-25',
      value: '89',
      subject: '计算机应用',
    },
    {
      date: '2020-09-25',
      value: '73',
      subject: '计算机网络',
    },
    {
      date: '2020-09-24',
      value: '89',
      subject: '计算机应用',
    },
    {
      date: '2020-09-24',
      value: '73',
      subject: '计算机网络',
    },
    {
      date: '2020-09-23',
      value: '89',
      subject: '计算机应用',
    },
    {
      date: '2020-09-23',
      value: '73',
      subject: '计算机网络',
    },
    {
      date: '2020-09-22',
      value: '89',
      subject: '计算机应用',
    },
    {
      date: '2020-09-22',
      value: '73',
      subject: '计算机网络',
    },
    {
      date: '2020-09-21',
      value: '89',
      subject: '计算机应用',
    },
    {
      date: '2020-09-21',
      value: '73',
      subject: '计算机网络',
    },
  ];

  const config: any = {
    title: {
      visible: true,
      text: '近期成绩',
    },
    padding: 'auto',
    forceFit: true,
    data: fakeData,
    xField: 'date',
    yField: 'value',
    seriesField: 'subject',
    xAxis: { type: 'time' },
    yAxis: {
      label: {
        formatter: (v: any) => `${v}分`,
      },
    },
    tooltip: {
      formatter: (k: any, v: any) => {
        return {
          name: k,
          value: v + '分',
        };
      },
    },
    responsive: true,
  };

  const loadUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
    setState({ userInfo });
  };

  useEffect(() => {
    loadUserInfo();

    localStorage.setItem('debug', '123');

    return () => {
      localStorage.removeItem('debug');
    };
  }, []);

  return (
    <div className='page-dashboard'>
      <Row gutter={[16, 16]}>
        <Col span='6'>
          <DashboardCard
            title='近期考试'
            text='4'
            icon={<EditOutlined style={iconStyle} />}
          />
        </Col>
        <Col span='6'>
          <DashboardCard
            title='已出成绩'
            text='1'
            icon={<UnorderedListOutlined style={iconStyle} />}
          />
        </Col>
        <Col span='6'>
          <DashboardCard
            title='未读评语'
            text='3'
            icon={<MailOutlined style={iconStyle} />}
          />
        </Col>
        <Col span='6'>
          <DashboardCard
            title='距离下次考试'
            text={
              <Countdown
                value={Date.now() + 1000 * 60 * 60 * 24 * 3}
                format='D天H时m分s秒'
              />
            }
            icon={<ClockCircleOutlined style={iconStyle} />}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card style={{ height: '240px' }}>
            <div style={styles.userInfoTitle}>学生信息</div>
            <Descriptions style={{ padding: '0 12px' }}>
              <Descriptions.Item label='学号'>
                {state.userInfo.studentNumber}
              </Descriptions.Item>
              <Descriptions.Item label='姓名'>
                {state.userInfo.studentName}
              </Descriptions.Item>
              <Descriptions.Item label='电话'>
                {state.userInfo.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label='邮箱'>
                {state.userInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label='班级'>
                {state.userInfo.className}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={12}>
          <Card style={{ height: '240px' }}>
            <Row justify='space-around'>
              <Col>
                <Tooltip title='60 / 60 次'>
                  <div style={styles.progressStyle}>近期及格率</div>
                  <Progress
                    percent={100}
                    width={150}
                    status='normal'
                    type='dashboard'
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip title='0 / 60 次'>
                  <div style={styles.progressStyle}>缺考率</div>
                  <Progress
                    percent={0}
                    width={150}
                    status='normal'
                    type='dashboard'
                  />
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
