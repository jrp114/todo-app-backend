import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import { addTask, deleteTask, updateTask } from './service';

export async function addTaskController(req: Request, res: Response) {
  try {
    const result = await addTask({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      projectId: req.body.projectId,
      taskListId: req.body.taskListId,
    });
    res.status(201).send(result);
  } catch (err: any) {
    logger('addTask', 'error', err);
    res.status(500).send(err.message);
  }
}

export async function updateTaskController(req: Request, res: Response) {
  try {
    const result = await updateTask({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      projectId: req.body.projectId,
      position: req.body.position,
      originalPosition: req.body.originalPosition,
      origin: req.body.origin,
      taskListId: req.body.taskListId,
      id: req.params.id,
    });
    res.status(201).send(result);
  } catch (err: any) {
    logger('updateTask', 'error', err);
    res.status(500).send(err.message);
  }
}

export async function deleteTaskController(req: Request, res: Response) {
  try {
    const result = await deleteTask(req.params.id);
    res.status(201).send(result);
  } catch (err: any) {
    logger('deleteTask', 'error', err);
    res.status(500).send(err.message);
  }
}
