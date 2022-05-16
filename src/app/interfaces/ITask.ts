import type { IUser } from './IUser';
import type { ITag } from './ITag';
import { Timestamp } from '@angular/fire/firestore';

export interface ITask {
  id: string;
  taskName: string;
  description: string;
  isDone?: boolean;
  userId: IUser['id'];
  tagId: ITag['id'];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
