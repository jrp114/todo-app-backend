export function mapTodos(todos: any) {
  return todos.map(mapTodo);
}

export function mapTodo(todo: any) {
  return {
    id: todo.id,
    name: todo.name,
    description: todo.description,
    position: todo.position,
    tags: todo.tags,
    projectId: todo.project_id,
    projectName: todo.project_name,
    projectDescription: todo.project_description,
  };
}
