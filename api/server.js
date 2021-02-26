const express = require('express');
const UsersRouter = require('./Users/users-router');

const server = express();

server.use(express.json());
server.use('/api/users', UsersRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up & running' });
});

module.exports = server;
