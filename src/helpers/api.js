import axios from 'axios';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'http://app.linkedin-reach.io/words';

const api = {
  getWords: () => {
    return axios
      .get(`${proxy}${endpoint}?count=10`)
      .then(response => {
        return response.data.split('\n');
      })
      .catch(error => {
        console.error(error);
      });
  }
};

export default api;
