import { Request, Response } from 'express';
import db from '../../database/db';

export async function getTodos(req: Request, res: Response) {
  const all = await db.todos.get(req.query.accountId as string);
  res.status(200).send(all);
}

export async function addTodo(req: Request, res: Response) {
  try {
    const last = await db.todos.findLast('todo', req.body.accountId);
    if (!last) {
      req.body.position = 0;
    } else {
      req.body.position = last.position + 1;
    }
    const todo = await db.todos.add(req.body);
    res.status(201).send(todo);
  } catch (err) {
    res.status(500).send('Error adding todo');
  }
}

export async function getTodoStatus(req: Request, res: Response) {
  const all = await db.todos.getStatus(req.query.status);
  res.status(200).send(all);
}

export async function updateTodo(req: Request, res: Response) {
  const todo = await db.task(async (task) => {
    if (req.body.origin !== req.body.status) {
      // we need the rest of the todos within the same status to move order up by one
      await task.todos.movePosition(req.body.position, req.body.status);
      return task.todos.updateTodo({
        ...req.body,
        position: req.body.position || 0,
      });
    } else {
      if (req.body.originalPosition > req.body.position) {
        // we need the rest of the todos within the same status to move order up by one
        await task.todos.movePosition(req.body.position, req.body.status);
      } else {
        // we need the rest of the todos within the same status to move order down by one
        await task.todos.movePositionDown(req.body.position, req.body.status);
      }
      return task.todos.updateTodo({
        ...req.body,
        position: req.body.position || 0,
      });
    }
  });
  res.status(201).send(todo);
}

export async function deleteTodo(req: Request, res: Response) {
  const todo = await db.todos.remove(req.params.id);
  res.status(201).send(todo);
}

export async function filterByTag(req: Request, res: Response) {
  const all = await db.todos.filterByTag(
    req.query.value,
    req.query.accountId as string,
  );
  res.status(200).send(all);
}
