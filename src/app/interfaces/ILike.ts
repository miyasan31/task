import type { IUser } from './IUser';
import type { ITask } from './ITask';

export interface ILike {
  id: string;
  userId: IUser['id'];
  taskId: ITask['id'];
  createdAt?: Date;
}
