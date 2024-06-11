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

/**
 * Add a new project
 * @param name: string
 * @param description: string
 * @param accountId: string
 * @param return object: { id: string, name: string, description: string, accountId: string }
 */
export async function addProject(
  name: string,
  description: string,
  accountId: string,
) {
  const project = await db.projects.add({ name, description, accountId });
  return project;
}
