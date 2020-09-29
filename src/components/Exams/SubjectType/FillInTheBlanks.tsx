import React, { useEffect, useImperativeHandle, useState } from 'react';
import http from '@/plugins/http/http';
import { Input } from 'antd';
import { connect } from 'react-redux';

interface questionType {
  question: string;
  answer: string[];
  score: number;
}

interface stylesType {
  [key: string]: React.CSSProperties;
}

interface questionAnswerType {
  [key: string]: string[];
}

const styles: stylesType = {
  questionContent: {
    margin: '20px 60px 80px 60px',
  },

  questionTitle: {
    fontSize: '22px',
  },

  inputContent: {
    display: 'flex',
    marginTop: '30px',
  },

  input: {
    fontSize: '16px',
    margin: '0 10px',
    width: '200px',
  },
};

const FillInTheBlanks = (props: any) => {
  const [state, setState] = useState([]);

  const questionAnswer = props.fillInTheBlanksAnswer;

  const setQuestionAnswer = (payload: questionAnswerType) => {
    props.change({
      fillInTheBlanksAnswer: {
        ...questionAnswer,
        ...payload,
      },
    });
  };

  const clearState = () => {
    // useImperativeHandle(ref, init);
  };

  useEffect(() => {
    http
      .getPaperQuestion('d')
      .then(res => {
        setState(res.data);
        const localStorageAnswer = JSON.parse(
          (localStorage.getItem('FillInTheBlanksAnswer') as string) || '{}',
        );
        setQuestionAnswer(localStorageAnswer);
      })
      .catch(res => {
        console.log(res);
      });
  }, []);

  const changeInput = (question: string, name: string, value: string) => {
    let l = questionAnswer[question] || [];
    l[parseInt(name)] = value;

    setQuestionAnswer({ [question]: l });

    localStorage.setItem(
      'FillInTheBlanksAnswer',
      JSON.stringify({ ...questionAnswer, [question]: l }),
    );
    props.statisticsCount();
  };
  return (
    <div id='fill-in-the-blanks'>
      {state.map((items: questionType, index) => {
        const question = items['question'];
        const answer = items['answer'];
        const score = items['score'];
        return (
          <div key={index} style={styles.questionContent}>
            <div style={styles.questionTitle}>
              {index + 1}. {question} ({score}分)
            </div>
            <div style={styles.inputContent}>
              {answer.map((items, index) => {
                return (
                  <Input
                    key={index}
                    name={index.toString()}
                    placeholder={'第' + index + '个空'}
                    value={
                      questionAnswer[question]
                        ? questionAnswer[question][index]
                        : ''
                    }
                    style={styles.input}
                    onChange={e =>
                      changeInput(question, e.target.name, e.target.value)
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
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
    statisticsCount: () => {
      dispatch({
        type: 'STATISTICS_COUNT',
      });
    },
  };
};

export default connect(mapState, mapDispatch)(FillInTheBlanks);
