import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import { addProject, getProjects } from './service';

export async function getProjectsController(req: Request, res: Response) {
  try {
    const result = await getProjects(req.query.accountId as string);
    res.status(200).json(result);
  } catch (error: any) {
    logger('getProjects', 'error', error.message);
    res.status(500).send(error.message);
  }
}

export async function addProjectController(req: Request, res: Response) {
  try {
    console.log(req.body);
    const result = await addProject(
      req.body.name,
      req.body.description,
      req.body.accountId,
    );
    res.status(201).json(result);
  } catch (error: any) {
    logger('addProject', 'error', error.message);
    res.status(500).send(error.message);
  }
}
