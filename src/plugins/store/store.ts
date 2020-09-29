import { useReducer } from 'react';
import { createStore } from 'redux';

export const initState = {
  singleChoiceAnswer: {},
  multipleChoiceAnswer: {},
  trueFalseAnswer: {},
  fillInTheBlanksAnswer: {},
  shortAnswerQuestionsAnswer: {},

  answeredQuestionCountAll: 0,
};

const statisticsCount = (i: number, type: string): number => {
  for (let item in JSON.parse((localStorage.getItem(type) as string) || '{}')) {
    i++;
  }
  return i;
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        ...action.payloads,
      };
    case 'STATISTICS_COUNT':
      let i = 0;
      i = statisticsCount(i, 'SingleChoiceAnswer');
      i = statisticsCount(i, 'MultipleChoiceAnswer');
      i = statisticsCount(i, 'TrueFalseAnswer');
      i = statisticsCount(i, 'FillInTheBlanksAnswer');
      i = statisticsCount(i, 'ShortAnswerQuestions');
      return {
        ...state,
        answeredQuestionCountAll: i,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer, initState);
