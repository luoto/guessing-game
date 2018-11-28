import api from './api';

it('returns horse', async () => {
  expect(await api.getWord()).toEqual('horse');
});

it('returns the definition of a horse', async () => {
  expect(await api.getDefinition('horse')).toEqual({
    noun: [
      {
        definition:
          'A large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail, used for riding, racing, and to carry and pull loads.'
      }
    ]
  });
});
