import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import {
  deleteComment,
  getComment,
  postComment,
  updateComment,
} from './service';

export async function getCommentController(req: Request, res: Response) {
  try {
    const result = await getComment(req.query.taskId as string);
    res.status(200).send(result);
  } catch (error: any) {
    logger('getComment', 'error', error);
    res.status(500).send(error.message);
  }
}

export async function postCommentController(req: Request, res: Response) {
  try {
    const { text, taskId } = req.body;
    const result = await postComment(text, taskId);
    res.status(201).send(result);
  } catch (error: any) {
    logger('postComment', 'error', error.message);
    res.status(500).send(error.message);
  }
}

export async function updateCommentController(req: Request, res: Response) {
  try {
    const result = await updateComment(req.body.text, req.params.id);
    res.status(201).send(result);
  } catch (error: any) {
    logger('updateComment', 'error', error.message);
    res.status(500).send(error.message);
  }
}

export async function deleteCommentController(req: Request, res: Response) {
  try {
    const result = await deleteComment(req.params.id);
    res.status(201).send(result);
  } catch (error: any) {
    logger('deleteComment', 'error', error.message);
    res.status(500).send(error.message);
  }
}
