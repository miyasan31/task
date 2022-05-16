import { Timestamp } from '@angular/fire/firestore';
import { IUser } from './IUser';

export interface ITag {
  id: string;
  tagName: string;
  color: string;
  isActive: boolean;
  userId: IUser['id'];
  createdAt?: Timestamp;
}
