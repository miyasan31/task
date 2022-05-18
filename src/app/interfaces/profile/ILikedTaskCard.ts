import { ITask } from '~/interfaces/task/ITask';
import { ILike } from '~/interfaces/like/ILike';
import { IUser } from '~/interfaces/user/IUser';

export interface ILikedTaskCard {
  task: ITask;
  like: ILike;
  user: IUser;
}
