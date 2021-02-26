const db = require('../../data/dbConfig');
const request = require('supertest');
// const usersRouter = require('./users-router');
const server = require('../server');

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

describe('users-router', () => {
  describe('server is up and running', () => {
    it('responds with string -up & running-', async () => {
      const res = await request(server).get('/');
      expect(res.body.api).toBe('up & running');
    });
  });

  describe('[GET] /users', () => {
    it('responds with a 200 status', async () => {
      const res = await request(server).get('/api/users');
      expect(res.body).toHaveLength(0);
    });
    it('returns correct number of users', async () => {
      let res;
      //*Checking for only 1 user to be present
      await db('users').insert(adam);
      res = await request(server).get('/api/users');
      // expect(res.body).toBe({});
      // Use this line⏫ to see the incoming data
      expect(res.body).toHaveLength(1);

      //*Checking for 2 users to be present
      await db('users').insert(austin);
      res = await request(server).get('/api/users');
      expect(res.body).toHaveLength(2);
    });
    it('checks for correct user format', async () => {
      let res;
      await db('users').insert(adam);
      await db('users').insert(austin);
      res = await request(server).get('/api/users');
      expect(res.body[0]).toMatchObject({
        id: 1,
        name: 'Adam'
      });
      expect(res.body[1]).toMatchObject({
        id: 2,
        name: 'Austin'
      });
    });
  });

  describe('[POST] /users', () => {
    it('responds with newly created user', async () => {
      let res;

      res = await request(server)
        .post('/api/users')
        .send(adam);
      expect(res.body).toMatchObject({ id: 1, ...adam });

      res = await request(server)
        .post('/api/users')
        .send(austin);
      expect(res.body).toMatchObject({ id: 2, ...austin });
    });
  });


});
