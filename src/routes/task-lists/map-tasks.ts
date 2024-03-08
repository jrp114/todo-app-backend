import { Tasks } from '../../db-interfaces';

export interface TasksWithProjects extends Tasks {
  task_list_id: number;
  task_list_name: string;
}

interface TasksWithProject extends Tasks {
  taskListName: string;
}

export function mapTasks(tasks: Array<TasksWithProjects>) {
  return tasks.map(mapTask);
}

export function mapTask(task: TasksWithProjects): TasksWithProject {
  return {
    ...task,
    taskListId: task.task_list_id,
    taskListName: task.task_list_name,
  };
}
