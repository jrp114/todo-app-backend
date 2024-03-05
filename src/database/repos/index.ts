import AccountsRepository from './accounts-repository';
import CommentsRepository from './comments-repository';
import ProjectMembersRepository from './project-members-repository';
import ProjectsRepository from './projects-respository';
import TasksRepository from './tasks-repository';
import UsersRepository from './users-repository';

export { CommentsRepository, TasksRepository, UsersRepository };

export interface Extensions {
  tasks: TasksRepository;
  comments: CommentsRepository;
  users: UsersRepository;
  accounts: AccountsRepository;
  projects: ProjectsRepository;
  projectMembers: ProjectMembersRepository;
}
