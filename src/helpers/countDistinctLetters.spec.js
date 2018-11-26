import countDistinctLetters from './countDistinctLetters';

it('counts 4 distinct letters in hello', () => {
  expect(countDistinctLetters('hello')).toEqual(4);
});

it('counts 3 distinct letters in abc', () => {
  expect(countDistinctLetters('abc')).toEqual(3);
});

it('counts 1 distinct letter in aaa', () => {
  expect(countDistinctLetters('aaa')).toEqual(1);
});

it('counts 0 distinct letters in empty string', () => {
  expect(countDistinctLetters('')).toEqual(0);
});
