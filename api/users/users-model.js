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
  return null;
}

async function insert(user) {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}
