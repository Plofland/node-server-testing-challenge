const express = require('express');
const userRouter = require('./users/users-router');

const server = express();

server.use(express.json());
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up & running' });
});

module.exports = server;
