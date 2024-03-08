import { Request, Response } from 'express';
import db from '../../database/db';

/**
 * Get all projects
 * @param req query: { userId: string }
 * @param return Array<object>: { id: string, name: string, description: string, accountId: string }
 */
export async function getProjects(req: Request, res: Response) {
  const result = await db.projects.getProjects(req.query.accountId as string);
  res.status(200).send(result);
}
