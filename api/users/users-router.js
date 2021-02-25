const express = require('express');
const router = express().Router();

const Users = require('./users-model');

router.get('/', (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/users/id', (req, res) => {
  res.end();
});

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  res.end();
});

router.put('/:id', (req, res) => {
  res.end();
});

module.exports = router;
