import React, { useEffect } from 'react';
import { Button, Card, Col, Modal, notification, Row, Statistic } from 'antd';
import { useSetState } from 'ahooks';

import SingleChoice from '@/components/Exams/SubjectType/SingleChoice';
import MultipleChoice from '@/components/Exams/SubjectType/MultipleChoice';
import TrueFalse from '@/components/Exams/SubjectType/TrueFalse';
import FillInTheBlanks from '@/components/Exams/SubjectType/FillInTheBlanks';
import ShortAnswerQuestions from '@/components/Exams/SubjectType/ShortAnswerQuestions';

import { ClockCircleOutlined, FileDoneOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import axios from '@/plugins/http/axios';
import http from '@/plugins/http/http';

const { Countdown } = Statistic;

const styles = {
  testPaperToolBar: {
    display: 'flex',
  },
  timer: {
    fontSize: '18px',
  },
  icon: {
    marginRight: '6px',
    fontSize: '18px',
  },
  toolItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 10px',
    fontSize: '18px',
  },
};

const ToolBar = (props: any) => {
  const [state, setState] = useSetState({
    // timer: Date.now() + 1000 * 60 * 60,
    timer: parseInt(localStorage.getItem('examsEndTime') as string),
  });

  const submitPaper = (errorPush: boolean): void => {
    const data = {
      singleChoiceAnswer: JSON.parse(
        localStorage.getItem('SingleChoiceAnswer') as string,
      ),
      multipleChoiceAnswer: JSON.parse(
        localStorage.getItem('MultipleChoiceAnswer') as string,
      ),
      trueFalseAnswer: JSON.parse(
        localStorage.getItem('TrueFalseAnswer') as string,
      ),
      fillInTheBlanksAnswer: JSON.parse(
        localStorage.getItem('FillInTheBlanksAnswer') as string,
      ),
      shortAnswerQuestionsAnswer: JSON.parse(
        localStorage.getItem('ShortAnswerQuestions') as string,
      ),
    };
    http
      .submitPaper(data)
      .then(res => {
        if (res.data.Status) {
          props.history.push('/exams/list');
          notification['success']({
            message: 'Successfully!',
            description: res.data['Message'],
          });
          props.clearAnswerState();
        } else {
          if (errorPush) {
            props.clearAnswerState();
            props.history.push('/exams/list');
          }
          notification['error']({
            message: 'Failed!',
            description: res.data['Message'],
          });
        }
      })
      .catch(res => {
        if (errorPush) {
          props.clearAnswerState();
          props.history.push('/exams/list');
        }
        console.log(res);
        notification['error']({
          message: 'Failed!',
          description: '??????????????????????????????????????????',
        });
      });
  };

  const submitAnswer = (): void => {
    Modal.confirm({
      zIndex: 1002, //navbar and sidebar zIndex=1001
      title: '??????????????????',
      okText: '??????',
      cancelText: '??????',
      onOk: () => {
        //???????????????
        submitPaper(false);
      },
    });
  };

  const clearAnswer = (): void => {
    Modal.confirm({
      zIndex: 1002, //navbar and sidebar zIndex=1001
      title: '?????????????????????',
      okText: '??????',
      cancelText: '??????',
      onOk: () => {
        //???????????????
        props.clearAnswerState();
      },
    });
  };
  return (
    <div id='test-paper-tool-bar' style={styles.testPaperToolBar}>
      <div style={{ ...styles.toolItem }}>
        ?????????
        {localStorage.getItem('totalScore')}???
      </div>
      <div style={{ ...styles.toolItem }}>
        <FileDoneOutlined style={{ ...styles.icon }} />
        {props.answeredQuestionCountAll}/{localStorage.getItem('questionCount')}
      </div>
      <div style={{ ...styles.toolItem }}>
        <ClockCircleOutlined style={{ ...styles.icon }} />
        <Countdown
          valueStyle={styles.timer}
          value={state.timer}
          format='H???m???s???'
          onFinish={() => {
            notification['warning']({
              message: 'Warning!',
              description: '???????????????????????????',
            });
            submitPaper(false);
          }}
        />
      </div>
      <div style={{ ...styles.toolItem }}>
        <Button type='primary' onClick={() => submitAnswer()}>
          ??????
        </Button>
      </div>
      <div style={{ ...styles.toolItem }}>
        <Button onClick={() => clearAnswer()}>??????</Button>
      </div>
    </div>
  );
};

const ExamsSubject = (props: any) => {
  const examsToken = localStorage.getItem('examsToken') || '';

  if (examsToken) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + examsToken;

    const [state, setState] = useSetState({
      key: 'SingleChoice',
    });

    const tabList: any = [
      { key: 'SingleChoice', tab: '?????????' },
      { key: 'MultipleChoice', tab: '?????????' },
      { key: 'TrueFalse', tab: '?????????' },
      { key: 'FillInTheBlanks', tab: '?????????' },
      { key: 'ShortAnswerQuestions', tab: '?????????' },
    ];

    const tabContent: any = {
      SingleChoice,
      MultipleChoice,
      TrueFalse,
      FillInTheBlanks,
      ShortAnswerQuestions,
    };

    const Content = tabContent[state.key];

    useEffect(() => {
      props.statisticsCount();
    }, []);

    return (
      <div id='exams-subject'>
        <Row>
          <Col span={24}>
            <Card
              title='???????????????????????????'
              extra={
                <ToolBar
                  answeredQuestionCountAll={props.answeredQuestionCountAll}
                  clearAnswerState={props.clearAnswerState}
                  history={props.history}
                />
              }
              tabList={tabList}
              activeTabKey={state.key}
              onTabChange={key => {
                setState({ key: key });
              }}>
              <Content />
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    Modal.error({
      zIndex: 1002,
      title: '???????????????',
      content: '??????????????????????????????',
      keyboard: false,
      onOk: () => {
        props.history.push('/dashboard');
      },
    });
    return null;
  }
};

const mapState = (state: any, props: any) => {
  return state;
};

const mapDispatch = (dispatch: any, props: any) => {
  return {
    change: (payloads: any) => {
      dispatch({
        type: 'CHANGE',
        payloads,
      });
    },
    clearAnswerState: () => {
      localStorage.removeItem('SingleChoiceAnswer');
      localStorage.removeItem('MultipleChoiceAnswer');
      localStorage.removeItem('TrueFalseAnswer');
      localStorage.removeItem('FillInTheBlanksAnswer');
      localStorage.removeItem('ShortAnswerQuestions');
      dispatch({
        type: 'CHANGE',
        payloads: {
          singleChoiceAnswer: {},
          multipleChoiceAnswer: {},
          trueFalseAnswer: {},
          fillInTheBlanksAnswer: {},
          shortAnswerQuestionsAnswer: {},
        },
      });
    },
    statisticsCount: () => {
      dispatch({
        type: 'STATISTICS_COUNT',
      });
    },
  };
};

export default connect(mapState, mapDispatch)(ExamsSubject);
