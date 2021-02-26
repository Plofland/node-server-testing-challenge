const express = require('express');
const router = express.Router();

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
  const { id } = req.params;

  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({
          message: 'Could not find user with given id'
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Failed to delete user' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
    .then((user) => {
      if (user) {
        return Users.update(id, changes);
      } else {
        res.status(404).json({
          message: 'Could not find user with given id'
        });
      }
    })
    .then((updateduser) => {
      res.json(updateduser);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Failed to update user' });
    });
});

module.exports = router;
