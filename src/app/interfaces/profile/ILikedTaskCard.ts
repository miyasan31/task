import { ILike } from '~/interfaces/like/ILike';
import { ITag } from '~/interfaces/tag/ITag';
import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface ILikedTaskCard {
  task: ITask;
  like: ILike;
  user: IUser;
  tag: ITag;
}
