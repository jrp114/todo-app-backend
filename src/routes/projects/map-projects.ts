export const mapProject = (project: any) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  accountId: project.account_id,
  createdAt: project.created_at,
  updatedAt: project.updated_at,
});
