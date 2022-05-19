import { ILike } from '~/interfaces/like/ILike';
import { ITask } from '~/interfaces/task/ITask';

// export interface ITaskCard extends ITask {
//   isLiked: boolean;
// }

export interface ITaskCard {
  task: ITask;
  like: ILike;
}
