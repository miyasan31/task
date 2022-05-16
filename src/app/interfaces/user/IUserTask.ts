import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface IUserTask {
  user: IUser;
  task: ITask[];
}
