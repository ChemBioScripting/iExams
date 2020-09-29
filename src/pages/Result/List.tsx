import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tabs } from 'antd';
import http from '@/plugins/http/http';

import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;

interface studentAchievementType {
  studentAnswerId: number;
  studentName: string;
  date: string;
  subject: string;
  score: string;
}

interface stylesType {
  [key: string]: React.CSSProperties;
}

const styles: stylesType = {
  questionContent: {
    margin: '20px 60px 80px 60px',
  },

  questionTitle: {
    fontSize: '22px',
  },

  optionContent: {
    marginTop: '10px',
  },

  optionText: {
    fontSize: '16px',
    margin: '10px 30px',
  },
};

const ResultList = () => {
  const [state, setState] = useState([] as object[]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null as number | null);

  const showDetails = (studentAnswerId: number) => {
    setCurrent(studentAnswerId);
    setVisible(true);
  };

  const columns: any = [
    { title: '学生姓名', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '时间', dataIndex: 'date', key: 'date', align: 'center' },
    { title: '科目', dataIndex: 'subject', key: 'subject', align: 'center' },
    {
      title: '成绩',
      dataIndex: 'achievement',
      key: 'achievement',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (text: any, record: any) => (
        <Button
          type='primary'
          size='small'
          disabled={record.achievement == '未出成绩' ? true : false}
          onClick={() => showDetails(record.studentAnswerId)}>
          查看
        </Button>
      ),
    },
  ];

  useEffect(() => {
    http
      .getScore()
      .then(res => {
        const fakeList = [] as object[];
        res.data.studentAchievement.map(
          (item: studentAchievementType, index: number) => {
            fakeList[index] = {
              key: index,
              studentAnswerId: item.studentAnswerId,
              name: item.studentName,
              date: item.date,
              subject: item.subject,
              achievement: item.score,
            };
          },
        );
        setState(fakeList);
      })
      .catch(res => {
        console.log(res);
      });
  }, []);

  const Detail = (props: any) => {
    interface answersType {
      [key: string]: {
        question: string;
        youAnswer: string;
        correctAnswer: string;
        isCorrect: boolean | number;
      };
    }

    if (visible) {
      const [detailState, setDetailState] = useState({
        questionAAnswers: [],
        questionBAnswers: [],
        questionCAnswers: [],
        questionDAnswers: [],
        questionEAnswers: [],
      });

      useEffect(() => {
        http.getScoreDetail(current as number).then(res => {
          setDetailState({ ...res.data });
          console.log(detailState);
        });
      }, []);

      const IconContent = (props: any) => {
        if (props.isCorrect === 1) {
          return <CheckCircleOutlined style={{ color: '#95de64' }} />;
        } else if (props.isCorrect === 2) {
          return <IssuesCloseOutlined style={{ color: '#ffa940' }} />;
        } else {
          return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
        }
      };

      return (
        <Modal
          centered
          zIndex={1002}
          visible={visible}
          width={1000}
          onCancel={() => setVisible(false)}
          footer={null}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='单选题' key='1'>
              {detailState.questionAAnswers.map((item: answersType, index) => {
                return (
                  <div key={index} style={styles.questionContent}>
                    <div style={styles.questionTitle}>
                      {index + 1}. {item.question}{' '}
                      {item.isCorrect ? (
                        <CheckCircleOutlined style={{ color: '#95de64' }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                      )}
                    </div>
                    <div style={styles.optionContent}>
                      <div style={styles.optionText}>
                        你的答案：{item.youAnswer}
                      </div>
                      <div style={styles.optionText}>
                        正确答案：{item.correctAnswer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabPane>
            <TabPane tab='多选题' key='2'>
              {detailState.questionBAnswers.map((item: answersType, index) => {
                console.log(item.isCorrect);
                return (
                  <div key={index} style={styles.questionContent}>
                    <div style={styles.questionTitle}>
                      {index + 1}. {item.question}{' '}
                      <IconContent isCorrect={item.isCorrect} />
                    </div>
                    <div style={styles.optionContent}>
                      <div style={styles.optionText}>
                        你的答案：{item.youAnswer}
                      </div>
                      <div style={styles.optionText}>
                        正确答案：{item.correctAnswer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabPane>
            <TabPane tab='判断题' key='3'>
              {detailState.questionCAnswers.map((item: answersType, index) => {
                return (
                  <div key={index} style={styles.questionContent}>
                    <div style={styles.questionTitle}>
                      {index + 1}. {item.question}{' '}
                      {item.isCorrect ? (
                        <CheckCircleOutlined style={{ color: '#95de64' }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                      )}
                    </div>
                    <div style={styles.optionContent}>
                      <div style={styles.optionText}>
                        你的答案：{item.youAnswer}
                      </div>
                      <div style={styles.optionText}>
                        正确答案：{item.correctAnswer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabPane>
            <TabPane tab='填空题' key='4'>
              {detailState.questionDAnswers.map((item: answersType, index) => {
                return (
                  <div key={index} style={styles.questionContent}>
                    <div style={styles.questionTitle}>
                      {index + 1}. {item.question}
                      <IconContent isCorrect={item.isCorrect} />
                    </div>
                    <div style={styles.optionContent}>
                      <div style={styles.optionText}>
                        你的答案：{item.youAnswer}
                      </div>
                      <div style={styles.optionText}>
                        正确答案：{item.correctAnswer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabPane>
            <TabPane tab='简答题' key='5'>
              {detailState.questionEAnswers.map((item: answersType, index) => {
                return (
                  <div key={index} style={styles.questionContent}>
                    <div style={styles.questionTitle}>
                      {index + 1}. {item.question}
                    </div>
                    <div style={styles.optionContent}>
                      <div style={styles.optionText}>
                        你的答案：{item.youAnswer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabPane>
          </Tabs>
        </Modal>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div id='result-list'>
      <Detail />
      <Table
        bordered={true}
        dataSource={state}
        columns={columns}
        sortDirections={['descend']}
        // pagination={false}
        pagination={{ position: ['bottomCenter'], size: 'default' }}
      />
    </div>
  );
};
export default ResultList;
