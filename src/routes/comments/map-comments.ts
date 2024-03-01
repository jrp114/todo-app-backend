export const mapComments = (comments: any) => comments.map(mapComment);

export const mapComment = (comment: any) => ({
  id: comment.id,
  text: comment.text,
  todoId: comment.todo_id,
  createdAt: comment.created_at,
  updatedAt: comment.updated_at,
});
