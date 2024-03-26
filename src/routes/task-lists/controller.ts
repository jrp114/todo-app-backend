import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import {
  createTaskList,
  filterTaskListsData,
  getTaskListsData,
} from './service';

export async function getTaskListsDataController(req: Request, res: Response) {
  try {
    const result = await getTaskListsData(req.query.userId as string);
    res.status(200).send(result);
  } catch (error: any) {
    logger('getTaskListsData', 'error', error);
    res.status(500).send(error.message);
  }
}

export async function filterTaskListsDataController(
  req: Request,
  res: Response,
) {
  try {
    const result = await filterTaskListsData(
      req.query.value as string,
      req.query.userId as string,
    );
    res.status(200).send(result);
  } catch (error: any) {
    logger('filterTaskListsData', 'error', error);
    res.status(500).send(error.message);
  }
}

export async function createTaskListController(req: Request, res: Response) {
  try {
    const result = await createTaskList(
      req.body.name,
      req.body.description,
      req.body.userId,
    );
    res.status(201).send(result);
  } catch (error: any) {
    logger('createTaskList', 'error', error);
    res.status(500).send(error.message);
  }
}
