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
  //check that we are able to insert a user to the DB and then check if the user is getting the proper info
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

  //check that we are able to update a user and then check if the user data is actually updating
  describe('update function', () => {
    it('updates the user', async () => {
      const [id] = await db('users').insert(adam);
      await Users.update(id, { name: 'Atom' });
      const updated = await db('users')
        .where({ id })
        .first();
      expect(updated.name).toBe('Atom');
    });

    it('checks the updated user', async () => {
      const [id] = await db('users').insert(adam);
      await Users.update(id, { name: 'Atom' });
      const updated = await db('users')
        .where({ id })
        .first();
      expect(updated).toMatchObject({
        id: 1,
        name: 'Atom'
      });
    });
  });

  describe('remove function', () => {
    it('remove a user from the DB', async () => {
      let all;
      await Users.insert(adam);
      all = await db('users');
      expect(all).toHaveLength(1);

      const id = all[0].id;
      await Users.remove(id);
      console.log(all);
      expect(all).toHaveLength(0);
    });
  });
});
