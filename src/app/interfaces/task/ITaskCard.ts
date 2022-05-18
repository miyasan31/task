import { ITask } from '~/interfaces/task/ITask';
import { ILike } from '~/interfaces/like/ILike';

// export interface ITaskCard extends ITask {
//   isLiked: boolean;
// }

export interface ITaskCard {
  task: ITask;
  like: ILike[];
}
