import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import { getProjects } from './service';

export async function getProjectsController(req: Request, res: Response) {
  try {
    const result = await getProjects(req.query.accountId as string);
    res.status(200).json(result);
  } catch (error: any) {
    logger('getProjects', 'error', error.message);
    res.status(500).send(error.message);
  }
}
