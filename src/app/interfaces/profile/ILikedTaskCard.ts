import { ILike } from '~/interfaces/like/ILike';
import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface ILikedTaskCard {
  task: ITask;
  like: ILike;
  user: IUser;
}
