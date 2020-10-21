import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://zentimer-2fbe5.firebaseio.com'
});

export default instance;