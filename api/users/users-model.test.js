const users = require('./users-model')
const db = require('../../data/dbConfig')


//Sanity test
it('correct env', () => {
  expect(process.env.DB_ENV).toBe('testing');
});
