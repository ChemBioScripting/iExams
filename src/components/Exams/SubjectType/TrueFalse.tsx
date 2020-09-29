import React, { useEffect, useState } from 'react';
import http from '@/plugins/http/http';
import { Checkbox, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useSetState } from 'ahooks';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { connect } from 'react-redux';

interface questionType {
  question: string;
  option: Array<string>;
  answer: number;
  score: number;
}

interface stylesType {
  [key: string]: React.CSSProperties;
}

interface questionAnswerType {
  [key: string]: number;
}

const styles: stylesType = {
  questionContent: {
    margin: '20px 60px 80px 60px',
  },

  questionTitle: {
    fontSize: '22px',
  },

  optionContent: {
    display: 'flex',
    marginTop: '30px',
  },

  optionText: {
    fontSize: '16px',
    margin: '0 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const TrueFalse = (props: any) => {
  //判断

  const [state, setState] = useState([]);

  const questionAnswer = props.trueFalseAnswer;

  const setQuestionAnswer = (payload: questionAnswerType) => {
    props.change({
      trueFalseAnswer: {
        ...questionAnswer,
        ...payload,
      },
    });
  };

  const letter = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  useEffect(() => {
    http
      .getPaperQuestion('c')
      .then(res => {
        setState(res.data);
        const localStorageAnswer = JSON.parse(
          (localStorage.getItem('TrueFalseAnswer') as string) || '{}',
        );
        setQuestionAnswer(localStorageAnswer);
      })
      .catch(res => {
        console.log(res);
      });
  }, []);

  const changeRadio = (e: RadioChangeEvent, question: string) => {
    setQuestionAnswer({ [question]: e.target.value });
    localStorage.setItem(
      'TrueFalseAnswer',
      JSON.stringify({ ...questionAnswer, [question]: e.target.value }),
    );
    props.statisticsCount();
  };

  return (
    <div id='true-false'>
      {state.map((items: questionType, index) => {
        const question = items['question'];
        const score = items['score'];
        return (
          <div key={index} style={styles.questionContent}>
            <div style={styles.questionTitle}>
              {index + 1}. {question} ({score}分)
            </div>
            <Radio.Group
              onChange={e => changeRadio(e, question)}
              value={questionAnswer[question]}
              style={styles.optionContent}>
              <Radio value={0} style={styles.optionText}>
                对
              </Radio>
              <Radio value={1} style={styles.optionText}>
                错
              </Radio>
            </Radio.Group>
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

export default connect(mapState, mapDispatch)(TrueFalse);
