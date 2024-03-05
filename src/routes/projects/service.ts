import { Request, Response } from 'express';
import db from '../../database/db';
import { mapTasks } from './map-tasks';

/**
 * Get all projects
 * @param req query: { userId: string }
 * @param return Array<object>: { id: string, name: string, description: string, position: number, tags: string[], projectId: string, projectName: string, projectDescription: string }
 */
export async function getProjects(req: Request, res: Response) {
  const result = await db.projects.getProjectsData(req.query.userId as string);
  res.status(200).send(mapTasks(result));
}

/**
 * Filter projects by name, description, or tags
 * @param req query: { value: string, userId: string }
 * @param return object: { id: string, name: string, description: string, position: number, tags: string[], projectId: string, projectName: string, projectDescription: string }
 */
export async function filterProjectsData(req: Request, res: Response) {
  const result = await db.projects.filterProjectsData(
    req.query.value,
    req.query.userId as string,
  );
  res.status(200).send(mapTasks(result));
}

/**
 * Create a new project
 * @param req body: { name: string, description: string, accountId: string }
 * @param return object: { name: string, description: string, accountId: string, createdAt: string, updatedAt: string}
 */
export async function createProject(req: Request, res: Response) {
  const response = await db.projects.createProject(req.body);
  await db.projectMembers.add({
    userId: req.body.userId,
    projectId: response.id,
  });
  res.status(201).send(response);
}
