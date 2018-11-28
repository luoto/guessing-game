import axios from 'axios';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'http://app.linkedin-reach.io/words';

// ref: https://github.com/meetDeveloper/googleDictionaryAPI
const hintEndpoint = 'https://googledictionaryapi.eu-gb.mybluemix.net';

// const NUMBER_OF_WORDS = 162413;
const NUMBER_OF_WORDS_PER_LEVEL = 16241;

const DEFAULT_WORD = 'horse';
const DIFFICULTIES = {
  easy: 2,
  medium: 5,
  hard: 9
};

const DEBUG = process.env.REACT_APP_DEBUG === 'true';
const USE_LIVE_API = process.env.REACT_APP_USE_LIVE_API === 'true';

const api = {
  getWord: options => {
    if (DEBUG) {
      console.log('getWord has been called');
    }

    if (USE_LIVE_API) {
      const randomIndex = Math.floor(Math.random() * NUMBER_OF_WORDS_PER_LEVEL);
      const queryString = `?start=${randomIndex}&count=1&difficulty=${
        DIFFICULTIES[options.difficulty]
      }`;
      return axios
        .get(`${proxy}${endpoint}${queryString}`)
        .then(response => {
          if (DEBUG) {
            console.log(response);
          }
          return response.data;
        })
        .catch(console.error);
    } else {
      return Promise.resolve(DEFAULT_WORD);
    }
  },
  getDefinition: word => {
    if (DEBUG) {
      console.log('getDefinition has been called');
    }

    if (USE_LIVE_API) {
      return axios
        .get(`${proxy}${hintEndpoint}?define=${word}&lang=en`)
        .then(response => {
          if (DEBUG) {
            console.log(response);
          }
          return response.data.meaning;
        })
        .catch(console.error);
    } else {
      return Promise.resolve({
        noun: [
          {
            definition:
              'A large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail, used for riding, racing, and to carry and pull loads.'
          }
        ]
      });
    }
  }
};

export default api;
