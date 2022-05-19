import { Timestamp } from '@angular/fire/firestore';

import { colorPallet } from '~/constants/colorPicker';
import { IUser } from '~/interfaces/user/IUser';

export type ColorScheme = typeof colorPallet[number]['name'];

export interface ITag {
  id: string;
  tagName: string;
  color: ColorScheme;
  isActive: boolean;
  userId: IUser['id'];
  createdAt?: Timestamp;
}
