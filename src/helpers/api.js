import axios from 'axios';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'http://app.linkedin-reach.io/words';

const NUMBER_OF_WORDS = 162413;
const DEFAULT_WORD = 'banana';
const DIFFICULTIES = {
  easy: 2,
  medium: 5,
  hard: 9
};

const api = {
  getWord: options => {
    if (process.env.REACT_APP_USE_LIVE_API.toLowerCase() === 'true') {
      const randomIndex = Math.floor(Math.random() * NUMBER_OF_WORDS);
      const queryString = `?start=${randomIndex}&count=1&difficulty=${
        DIFFICULTIES[options.difficulty]
      }`;

      return axios
        .get(`${proxy}${endpoint}${queryString}`)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      return DEFAULT_WORD;
    }
  }
};

export default api;
