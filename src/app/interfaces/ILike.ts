import type { IUser } from './IUser';
import type { ITask } from './ITask';

export type ILike = {
  id: number;
  userId: IUser['id'];
  taskId: ITask['id'];
  createdAt: number;
};
