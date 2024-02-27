import { Request, Response } from 'express';
import db from '../../database/db';
import { mapTodos } from './map-todos';

export async function getProjects(req: Request, res: Response) {
  const result = await db.projects.getProjectsData(req.query.userId as string);
  res.status(200).send(mapTodos(result));
}

export async function filterProjectsData(req: Request, res: Response) {
  const result = await db.projects.filterProjectsData(
    req.query.value,
    req.query.userId as string,
  );
  res.status(200).send(mapTodos(result));
}
