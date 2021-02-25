const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
};

function getAll() {
  return db('users');
}

function getById(id) {
  return db('users').where('id', id).first();
}

async function insert(user) {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
}

async function update(id, changes) {
  return db('users').update(changes).where({ id });
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del()
    .then(() => {
      return db('users');
    });
}
