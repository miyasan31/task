import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface ITimeline {
  user: IUser;
  task: ITask[];
}
