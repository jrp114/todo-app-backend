const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authorize = require('../helpers/authorize');

router
  .route('/')
  .get(authorize(), async (req, res) => {
    const all = await db.todos.get();
    res.status(200).send(all);
  })
  .post(authorize(), async (req, res) => {
    const todo = await db.todos.add(req.body);
    res.status(201).send(todo);
  });

router.route('/status').get(authorize(), async (req, res) => {
  const all = await db.todos.getStatus(req.query.status);
  res.status(200).send(all);
});

router
  .route('/:id')
  .put(authorize(), async (req, res) => {
    const todo = await db.todos.updateTodo({
      ...req.body,
      id: req.params.id,
    });
    res.status(201).send(todo);
  })
  .delete(authorize(), async (req, res) => {
    const todo = await db.todos.remove(req.params.id);
    res.status(201).send(todo);
  });

router.route('/filter').get(authorize(), async (req, res) => {
  const all = await db.todos.filterByTag(req.query.value);
  res.status(200).send(all);
});

module.exports = router;
