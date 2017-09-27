const dummy = require('./dummy');

test('test true equals to true', () => {
  expect(dummy(true)).toBe(true);
});