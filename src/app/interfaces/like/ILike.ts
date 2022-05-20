import { Timestamp } from '@angular/fire/firestore';

import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface ILike {
  id: string;
  userId: IUser['id'];
  taskId: ITask['id'];
  createdAt?: Timestamp;
}

export interface ICreateLike {
  userId: IUser['id'];
  taskId: ITask['id'];
}
