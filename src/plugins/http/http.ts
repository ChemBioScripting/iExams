import axios from './axios';

const methods = {
  login: function(data: object) {
    return axios.post('/user/login', data);
  },

  refreshToken: function() {
    return axios.get('/token/refresh');
  },

  startExams: function(paperId: number) {
    return axios.get('/exams/start/' + paperId.toString());
  },

  getExams: function() {
    return axios.get('/exams');
  },

  getScore: function() {
    return axios.get('/exams/score');
  },

  getScoreDetail: function(scoreId: number) {
    return axios.get('/exams/score/' + scoreId);
  },

  submitPaper: function(data: object) {
    return axios.post('/exams', data);
  },

  getPaperQuestion: function(questionType: string) {
    return axios.get('/paper/' + questionType);
  },
};

export default methods;
