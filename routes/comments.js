const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authorize = require('../helpers/authorize');

router
  .route('/')
  .get(authorize(), async (req, res) => {
    const result = await db.comments.getByTodo(req.query.todoId);
    res.status(200).send(result);
  })
  .post(authorize(), async (req, res) => {
    const comment = await db.comments.add(req.body);
    res.status(201).send(comment);
  });

router
  .route('/:id')
  .put(authorize(), async (req, res) => {
    const comment = await db.comments.updateComment({
      ...req.body,
      id: req.params.id,
    });
    res.status(201).send(comment);
  })
  .delete(authorize(), async (req, res) => {
    const comment = await db.comments.remove(req.params.id);
    res.status(201).send(comment);
  });

module.exports = router;
