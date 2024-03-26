import db from '../../database/db';

/**
 * Get all comments for a task
 * @param taskId: string
 * @param return Array<object>: { id: string, text: string, taskId: string, createdAt: string, updatedAt: string }
 */
export async function getComment(taskId: string) {
  const result = await db.comments.getByTask(taskId);
  return result;
}

/**
 * Create a new comment
 * @param text: string
 * @param taskId: string
 * @param return object: { id: string, text: string, taskId: string, createdAt: string, updatedAt: string }
 */
export async function postComment(text: string, taskId: string) {
  const comment = await db.comments.add({ text, taskId });
  return comment;
}

/**
 * Update a comment
 * @param text: string
 * @param id: string
 * @param return object: { id: string, text: string, taskId: string, createdAt: string, updatedAt: string }
 */
export async function updateComment(text: string, id: string) {
  const comment = await db.comments.updateComment({
    text,
    id,
  });
  return comment;
}

/**
 * Delete a comment
 * @param id: string
 * @param return object: { id: string, text: stringa taskId: string, createdAt: string, updatedAt: string }
 */
export async function deleteComment(id: string) {
  const comment = await db.comments.remove(id);
  return comment;
}
