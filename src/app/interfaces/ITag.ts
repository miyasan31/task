import { IUser } from './IUser';

export type ITag = {
  id: number;
  tagName: string;
  color: string;
  isActive: boolean;
  userId: IUser['id'];
  createdAt: number;
  updatedAt: number;
};
