import { Timestamp } from '@angular/fire/firestore';

import { colorPicker } from '~/constants/colorPicker';
import { IUser } from '~/interfaces/user/IUser';

export type ColorScheme = typeof colorPicker[number]['value'];

export interface ITag {
  id: string;
  tagName: string;
  color: ColorScheme;
  isActive: boolean;
  userId: IUser['id'];
  createdAt?: Timestamp;
}

export interface ICreateTag {
  tagName: string;
  color: ColorScheme;
  userId: IUser['id'];
}
