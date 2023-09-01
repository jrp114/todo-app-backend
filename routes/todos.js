const express = require('express');
const router = express.Router();
const db = require('../database/db');

router
  .route('/')
  .get(async (req, res) => {
    const all = await db.todos.get();
    res.status(200).send(all);
  })
  .post(async (req, res) => {
    const todo = await db.todos.add(req.body);
    res.status(201).send(todo);
  });

router.route('/status').get(async (req, res) => {
  const all = await db.todos.getStatus(req.query.status);
  res.status(200).send(all);
});

router
  .route('/:id')
  .put(async (req, res) => {
    const todo = await db.todos.updateTodo({
      ...req.body,
      id: req.params.id,
    });
    res.status(201).send(todo);
  })
  .delete(async (req, res) => {
    const todo = await db.todos.remove(req.params.id);
    res.status(201).send(todo);
  });

module.exports = router;
