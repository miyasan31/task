import type { IUser } from './IUser';
import type { ITask } from './ITask';

export type IComment = {
  id: string;
  comment: string;
  userId: IUser['id'];
  taskId: ITask['id'];
  createdAt: Date;
};
