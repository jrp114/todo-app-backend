import { Tasks } from '../../db-interfaces';

export interface TasksWithProject extends Tasks {
  project_id: string;
  project_name: string;
  project_description: string;
}

export function mapTasks(tasks: Array<TasksWithProject>) {
  return tasks.map(mapTask);
}

export function mapTask(task: TasksWithProject) {
  return {
    id: task.id,
    name: task.name,
    description: task.description,
    position: task.position,
    tags: task.tags,
    projectId: task.project_id,
    projectName: task.project_name,
    projectDescription: task.project_description,
  };
}
