import { IUser } from './IUser';

export type ITag = {
  id: number;
  tagName: string;
  color: string;
  userId: IUser['id'];
  createdAt: number;
  updatedAt: number;
};
