import stopPropagation from './stopPropagation';

it('calls stopPropagation', () => {
  const fakeEvent = { stopPropagation: jest.fn() };

  stopPropagation(fakeEvent);
  expect(fakeEvent.stopPropagation).toHaveBeenCalledTimes(1);
});
