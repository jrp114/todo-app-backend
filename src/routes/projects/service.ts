import db from '../../database/db';

/**
 * Get all projects
 * @param accountId: string
 * @param return Array<object>: { id: string, name: string, description: string, accountId: string }
 */
export async function getProjects(accountId: string) {
  const result = await db.projects.getProjects(accountId);
  return result;
}
