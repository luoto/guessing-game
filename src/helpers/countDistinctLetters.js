const countDistinctLetters = word => {
  let result = word.split('').reduce((hash, letter) => {
    hash[letter] = true;
    return hash;
  }, {});

  return Object.keys(result).length;
};

export default countDistinctLetters;
