import { ITask } from '~/interfaces/task/ITask';
import { ILike } from '~/interfaces/like/ILike';

export interface ITaskWithLike {
  task: ITask;
  like: ILike[];
}
