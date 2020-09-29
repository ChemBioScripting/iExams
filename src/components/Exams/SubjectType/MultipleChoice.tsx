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
  answer: Array<string>;
  score: number;
}

interface stylesType {
  [key: string]: React.CSSProperties;
}

interface questionAnswerType {
  [key: string]: Array<string>;
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

const MultipleChoice = (props: any) => {
  //多选

  const [state, setState] = useState([]);

  const questionAnswer = props.multipleChoiceAnswer;

  const setQuestionAnswer = (payload: questionAnswerType) => {
    props.change({
      multipleChoiceAnswer: {
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
      .getPaperQuestion('b')
      .then(res => {
        setState(res.data);
        const localStorageAnswer = JSON.parse(
          (localStorage.getItem('MultipleChoiceAnswer') as string) || '{}',
        );
        setQuestionAnswer(localStorageAnswer);
      })
      .catch(res => {
        console.log(res);
      });
  }, []);

  const changeCheckbox = (question: string, value: CheckboxValueType[]) => {
    setQuestionAnswer({ [question]: value as Array<string> });
    localStorage.setItem(
      'MultipleChoiceAnswer',
      JSON.stringify({ ...questionAnswer, [question]: value }),
    );
    props.statisticsCount();
  };

  return (
    <div id='multiple-choice'>
      {state.map((items: questionType, index) => {
        const question = items['question'];
        const option = items['option'];
        const score = items['score'];
        return (
          <div key={index} style={styles.questionContent}>
            <div style={styles.questionTitle}>
              {index + 1}. {question} ({score}分)
            </div>
            <Checkbox.Group
              onChange={e => changeCheckbox(question, e)}
              value={questionAnswer[question]}
              style={styles.optionContent}>
              {option.map((items, index) => {
                return (
                  <div key={index}>
                    <Checkbox value={items as string} style={styles.optionText}>
                      {letter[index]}：{items}
                    </Checkbox>
                  </div>
                );
              })}
            </Checkbox.Group>
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

export default connect(mapState, mapDispatch)(MultipleChoice);
