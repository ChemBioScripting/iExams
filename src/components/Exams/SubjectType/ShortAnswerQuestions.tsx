import React, { useEffect, useState } from 'react';
import http from '@/plugins/http/http';
import { useSetState } from 'ahooks';
import TextArea from 'antd/lib/input/TextArea';
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
  [key: string]: string;
}

const styles: stylesType = {
  questionContent: {
    margin: '20px 60px 80px 60px',
  },

  questionTitle: {
    fontSize: '22px',
  },

  textareaContent: {
    display: 'flex',
    marginTop: '30px',
  },

  textarea: {
    fontSize: '16px',
    margin: '0 10px',
    width: '600px',
    height: '200px',
  },
};

const ShortAnswerQuestions = (props: any) => {
  //简答

  const [state, setState] = useState([]);

  const questionAnswer = props.shortAnswerQuestionsAnswer;

  const setQuestionAnswer = (payload: questionAnswerType) => {
    props.change({
      shortAnswerQuestionsAnswer: {
        ...questionAnswer,
        ...payload,
      },
    });
  };

  useEffect(() => {
    http
      .getPaperQuestion('e')
      .then(res => {
        setState(res.data);
        const localStorageAnswer = JSON.parse(
          (localStorage.getItem('ShortAnswerQuestions') as string) || '{}',
        );
        setQuestionAnswer(localStorageAnswer);
      })
      .catch(res => {
        console.log(res);
      });
  }, []);

  const changeTextarea = (question: string, value: string) => {
    setQuestionAnswer({ [question]: value });
    localStorage.setItem(
      'ShortAnswerQuestions',
      JSON.stringify({ ...questionAnswer, [question]: value }),
    );
    props.statisticsCount();
  };
  return (
    <div id='short-answer-questions'>
      {state.map((items: questionType, index) => {
        const question = items['question'];
        const score = items['score'];
        return (
          <div key={index} style={styles.questionContent}>
            <div style={styles.questionTitle}>
              {index + 1}. {question} ({score}分)
            </div>
            <div style={styles.textareaContent}>
              <TextArea
                onChange={e => changeTextarea(question, e.target.value)}
                value={questionAnswer[question]}
                style={styles.textarea}
              />
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

export default connect(mapState, mapDispatch)(ShortAnswerQuestions);
