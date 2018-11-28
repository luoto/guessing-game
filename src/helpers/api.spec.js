import api from './api';

it('returns banana', async () => {
  expect(await api.getWord()).toEqual('horse');
});
