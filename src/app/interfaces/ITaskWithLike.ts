import { ITask } from '~/interfaces/ITask';
import { ILike } from '~/interfaces/ILike';

// export interface ITimeline extends ILike, ITask {}

export interface ITaskWithLike {
  task: ITask;
  like: ILike[];
}
