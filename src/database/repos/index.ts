import AccountsRepository from './accounts-repository';
import CommentsRepository from './comments-repository';
import ProjectsRepository from './projects-repository';
import TaskListMembersRepository from './task-list-members-repository';
import TaskListsRepository from './task-lists-respository';
import TasksRepository from './tasks-repository';
import UsersRepository from './users-repository';

export { CommentsRepository, TasksRepository, UsersRepository };

export interface Extensions {
  tasks: TasksRepository;
  comments: CommentsRepository;
  users: UsersRepository;
  accounts: AccountsRepository;
  taskLists: TaskListsRepository;
  taskListMembers: TaskListMembersRepository;
  projects: ProjectsRepository;
}
