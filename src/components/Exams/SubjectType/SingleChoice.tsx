import React, { useEffect, useState } from 'react';
import http from '@/plugins/http/http';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { connect } from 'react-redux';

interface questionType {
  question: string;
  option: Array<string>;
  answer: string;
  score: number;
}

interface stylesType {
  [key: string]: React.CSSProperties;
}

interface questionAnswerType {
  [key: string]: string;
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

const SingleChoice = (props: any) => {
  //单选

  const [state, setState] = useState([]);

  const questionAnswer = props.singleChoiceAnswer;

  const setQuestionAnswer = (payload: questionAnswerType) => {
    props.change({
      singleChoiceAnswer: {
        ...questionAnswer,
        ...payload,
      },
    });
  };

  // const setQuestionAnswer = (payload: questionAnswerType) => {
  //   props.dispatch({ singleChoiceAnswer: payload });
  // };

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
      .getPaperQuestion('a')
      .then(res => {
        setState(res.data);
        const localStorageAnswer = JSON.parse(
          (localStorage.getItem('SingleChoiceAnswer') as string) || '{}',
        );
        // props.change({ singleChoiceAnswer: localStorageAnswer });
        setQuestionAnswer(localStorageAnswer);
        props.statisticsCount();
      })
      .catch(res => {
        console.log(res);
      });
  }, []);

  const changeRadio = (e: RadioChangeEvent, question: string) => {
    setQuestionAnswer({ [question]: e.target.value });
    localStorage.setItem(
      'SingleChoiceAnswer',
      JSON.stringify({ ...questionAnswer, [question]: e.target.value }),
    );
    props.statisticsCount();
  };

  return (
    <div id='single-choice'>
      {state.map((items: questionType, index) => {
        const question = items['question'];
        const option = items['option'];
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
              {option.map((items, index) => {
                return (
                  <div key={index}>
                    <Radio value={items as string} style={styles.optionText}>
                      {letter[index]}：{items}
                    </Radio>
                  </div>
                );
              })}
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

export default connect(mapState, mapDispatch)(SingleChoice);
