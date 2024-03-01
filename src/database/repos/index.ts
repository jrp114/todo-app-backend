import AccountsRepository from './accounts-repository';
import CommentsRepository from './comments-repository';
import ProjectMembersRepository from './project-members-repository';
import ProjectsRepository from './projects-respository';
import TodosRepository from './todos-repository';
import UsersRepository from './users-repository';

export { CommentsRepository, TodosRepository, UsersRepository };

export interface Extensions {
  todos: TodosRepository;
  comments: CommentsRepository;
  users: UsersRepository;
  accounts: AccountsRepository;
  projects: ProjectsRepository;
  projectMembers: ProjectMembersRepository;
}
