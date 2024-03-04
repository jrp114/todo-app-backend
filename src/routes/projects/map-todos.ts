import { Todos } from '../../db-interfaces';

export interface TodosWithProject extends Todos {
  project_id: string;
  project_name: string;
  project_description: string;
}

export function mapTodos(todos: Array<TodosWithProject>) {
  return todos.map(mapTodo);
}

export function mapTodo(todo: TodosWithProject) {
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
