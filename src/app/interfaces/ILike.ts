import type { IUser } from './IUser';
import type { ITask } from './ITask';
import { Timestamp } from '@angular/fire/firestore';

export interface ILike {
  id: string;
  userId: IUser['id'];
  taskId: ITask['id'];
  createdAt?: Timestamp;
}
