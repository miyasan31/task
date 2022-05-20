import { Timestamp } from '@angular/fire/firestore';

export interface IUser {
  id: string;
  userName: string;
  email: string;
  profile?: string;
  avatar: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
