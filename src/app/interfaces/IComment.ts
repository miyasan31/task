import type { IUser } from './IUser';
import type { ITask } from './ITask';

export interface IComment {
  id: string;
  comment: string;
  userId: IUser['id'];
  taskId: ITask['id'];
  createdAt: Date;
}
