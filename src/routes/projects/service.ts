import { Request, Response } from 'express';
import db from '../../database/db';
import { mapProject } from './map-projects';
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

/**
 *
 * @param req body: { name: string, description: string, accountId: string }
 * @param return { name: string, description: string, accountId: string, createdAt: string, updatedAt: string}
 */
export async function createProject(req: Request, res: Response) {
  const response = await db.projects.createProject(req.body);
  await db.projectMembers.add({
    userId: req.body.userId,
    projectId: response.id,
  });
  res.status(201).send(mapProject(response));
}
