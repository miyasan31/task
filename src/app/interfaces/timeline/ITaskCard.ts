import { ILike } from '~/interfaces/like/ILike';
import { ITag } from '~/interfaces/tag/ITag';
import { ITask } from '~/interfaces/task/ITask';

// export interface ITaskCard extends ITask {
//   isLiked: boolean;
// }

export interface ITaskCard {
  task: ITask;
  like: ILike;
  tag: ITag;
}
