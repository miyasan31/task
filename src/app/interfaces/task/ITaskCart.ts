import { ITask } from '~/interfaces/task/ITask';
import { ILike } from '~/interfaces/like/ILike';

export interface ITaskCart {
  task: ITask;
  like: ILike[];
}
