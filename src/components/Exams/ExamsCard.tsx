import React from 'react';

import { Card, Modal, notification, Popover } from 'antd';

import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons';

import { history } from 'umi';

import http from '@/plugins/http/http';

const styles: any = {
  examsListCard: {
    marginBottom: '16px',
  },

  examsListCardA: {
    color: '#515a6e',
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentLeft: {
    paddingLeft: '12px',
  },

  contentText: {
    paddingTop: '14px',
  },

  contentTitle: {
    fontSize: '24px',
    fontWeight: '700',
  },

  contentDetail: {
    display: 'flex',
  },

  contentRight: {
    marginLeft: 'auto',
    paddingRight: '12px',
  },

  contentImages: {
    width: '74px',
    height: '74px',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentImagesImg: {
    width: '74px',
    height: '74px',
    borderRadius: '50%',
  },

  examsCard: {
    cursor: 'pointer',
  },
};

interface ExamsCardType {
  examsId: number;
  title: string;
  startTime: string;
  endTime: string;
  images?: string;
  examsTimeLong: number | string;
  examsSingleChoice: number | string;
  examsMultipleChoice: number | string;
  examsTrueFalse: number | string;
  examsFillInTheBlanks: number | string;
  examsShortAnswerQuestions: number | string;
  completed?: boolean;
}

export const ExamsCard = (props: ExamsCardType) => {
  const cardContent = (
    <div>
      <div style={styles.contentDetail}>
        <div id='content-time-long'>
          <ClockCircleOutlined />
          <span style={{ marginLeft: '6px' }}>
            <b>{props.examsTimeLong}</b> 分钟
          </span>
        </div>
      </div>
      <div id='content-exams-detail'>
        <div>
          <EditOutlined />
          <span style={{ marginLeft: '6px' }}>
            单选题: <b>{props.examsSingleChoice}</b> 道; 多选题:{' '}
            <b>{props.examsMultipleChoice}</b> 道;{' '}
          </span>
          <br />
          <EditOutlined />
          <span style={{ marginLeft: '6px' }}>
            判断题: <b>{props.examsTrueFalse}</b> 道; 填空题:{' '}
            <b>{props.examsFillInTheBlanks}</b> 道; 简答题:{' '}
            <b>{props.examsShortAnswerQuestions}</b> 道;
          </span>
        </div>
      </div>
    </div>
  );

  const startExams = (): void => {
    Modal.confirm({
      zIndex: 1002, //navbar and sidebar zIndex=1001
      title: '是否开始答题？',
      content: (
        <div>
          <div>注意：</div>
          <div style={{ padding: '0 12px', fontWeight: 600, fontSize: '18px' }}>
            <div>考试科目为：{props.title}</div>
            <div>考试时间为：{props.examsTimeLong}分钟</div>
            <div>
              单选题：{props.examsSingleChoice}道 &nbsp; &nbsp; 多选题：
              {props.examsMultipleChoice}道
            </div>
            <div>
              判断题：{props.examsTrueFalse}道 &nbsp; &nbsp; 填空题：
              {props.examsSingleChoice}道
            </div>
            <div>简答题：{props.examsShortAnswerQuestions}道</div>
            <div>请自行掌握好答题速度</div>
          </div>
        </div>
      ),
      okText: '开始',
      cancelText: '取消',
      onOk: () => {
        //确定后执行
        http
          .startExams(props.examsId)
          .then(res => {
            if (res.data.Status) {
              localStorage.setItem('examsToken', res.data.examsToken);
              localStorage.setItem(
                'examsEndTime',
                (Date.now() + 1000 * 60 * res.data.timer).toString(),
              );
              localStorage.setItem('answeredQuestionCountAll', '0');
              localStorage.setItem('questionCount', res.data.questionCount);
              localStorage.setItem('totalScore', res.data.totalScore);

              history.push({
                pathname: '/exams/paper',
              });
            } else {
              notification['error']({
                message: 'Failed!',
                description: res.data['Message'],
              });
            }
          })
          .catch(res => {
            console.log(res);
            notification['error']({
              message: 'Failed!',
              description: '未知错误，请联系管理员处理。',
            });
          });
      },
    });
  };

  return (
    <div
      id='exams-card'
      style={
        props.completed ? { cursor: 'not-allowed' } : { cursor: 'pointer' }
      }
      onClick={() => (!props.completed ? startExams() : '')}>
      <Card hoverable={!props.completed}>
        <div style={styles.cardContent}>
          <div style={styles.contentLeft}>
            <Popover placement='rightBottom' content={cardContent}>
              <div style={styles.contentTitle}>
                {props.title} {props.completed ? ' : 已完成' : ''}
              </div>
              <div style={styles.contentText}>
                <div id='content-time'>
                  <span>
                    开始：<b>{props.startTime}</b>
                  </span>
                  <br />
                  <span>
                    结束：<b>{props.endTime}</b>
                  </span>
                </div>
              </div>
            </Popover>
          </div>
          <div style={styles.contentRight}>
            <div style={styles.contentImages}>
              {props.images ? (
                <img
                  src={props.images}
                  style={styles.contentImagesImg}
                  alt=''
                />
              ) : (
                <EditOutlined style={{ fontSize: '48px' }} />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExamsCard;
