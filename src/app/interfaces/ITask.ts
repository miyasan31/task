import type { IUser } from './IUser';
import type { ITag } from './ITag';

export type ITask = {
  id: string;
  taskName: string;
  description: string;
  isDone: boolean;
  userId: IUser['id'];
  tagId: ITag['id'];
  createdAt: Date;
  updatedAt: Date;
};
