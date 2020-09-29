import axios from 'axios';

// const baseURL = "http://127.0.0.1:8800"
const baseURL = '/api';

export default axios.create({
  baseURL,
});
