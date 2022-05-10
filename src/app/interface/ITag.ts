import { IUser } from './IUser';

export type ITag = {
  id: number;
  tag_name: string;
  color: string;
  user_id: IUser['id'];
  created_at: number;
  updated_at: number;
};
