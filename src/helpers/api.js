import axios from 'axios';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'http://app.linkedin-reach.io/words';

// ref: https://github.com/meetDeveloper/googleDictionaryAPI
const hintEndpoint = 'https://googledictionaryapi.eu-gb.mybluemix.net';

const NUMBER_OF_WORDS = 162413;
const DEFAULT_WORD = 'banana';
const DIFFICULTIES = {
  easy: 2,
  medium: 5,
  hard: 9
};

const api = {
  getWord: options => {
    if (process.env.REACT_APP_USE_LIVE_API === 'true') {
      const randomIndex = Math.floor(Math.random() * NUMBER_OF_WORDS);
      const queryString = `?start=${randomIndex}&count=1&difficulty=${
        DIFFICULTIES[options.difficulty]
      }`;

      return axios
        .get(`${proxy}${endpoint}${queryString}`)
        .then(response => {
          return response.data;
        })
        .catch(console.error);
    } else {
      return Promise.resolve(DEFAULT_WORD);
    }
  },
  getDefinition: word => {
    if (process.env.REACT_APP_USE_LIVE_API === 'true') {
      return axios
        .get(`${proxy}${hintEndpoint}?define=${word}&lang=en`)
        .then(response => {
          return response.data.meaning;
        })
        .catch(console.error);
    } else {
      return Promise.resolve({
        noun: [{ definition: 'a fruit' }, { definition: 'a tropical fruit' }]
      });
    }
  }
};

export default api;
