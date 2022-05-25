import { ILike } from '~/interfaces/like/ILike';
import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface ITiedTagTask {
  task: ITask;
  like: ILike;
}
