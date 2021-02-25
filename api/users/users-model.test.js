const Users = require('./users-model');
const db = require('../../data/dbConfig');

//Sanity test
it('correct env', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

const adam = { name: 'Adam' };
const austin = { name: 'Austin' };

//Create a set-up to handle migrations & destruction of test DB before and after each test
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('users').truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe('Users model', () => {
  describe('insert function', () => {
    it('add a user to the DB', async () => {
      let all;
      await Users.insert(adam);
      all = await db('users');
      expect(all).toHaveLength(1);

      await Users.insert(austin);
      all = await db('users');
      expect(all).toHaveLength(2);
    });
    it('check values of user from DB', async () => {
      const user = await Users.insert(adam);
      expect(user).toMatchObject({ id: 1, ...adam });
    });
  });


});
