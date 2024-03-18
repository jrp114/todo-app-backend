import { Request, Response } from 'express';
import db from '../../database/db';
import logger from '../../helpers/logger';

/**
 * Get all projects
 * @param req query: { userId: string }
 * @param return Array<object>: { id: string, name: string, description: string, accountId: string }
 */
export async function getProjects(req: Request, res: Response) {
  try {
    const result = await db.projects.getProjects(req.query.accountId as string);
    res.status(200).send(result);
  } catch (error: any) {
    logger('getProjects', 'error', error.message);
  }
}
