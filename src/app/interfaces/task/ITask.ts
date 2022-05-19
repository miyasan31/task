import { Timestamp } from '@angular/fire/firestore';

import { ITag } from '~/interfaces/tag/ITag';
import { IUser } from '~/interfaces/user/IUser';

export interface ITask {
  id: string;
  taskName: string;
  description: string;
  isDone: boolean;
  userId: IUser['id'];
  tagId: ITag['id'];
  createdAt?: Timestamp;
}
