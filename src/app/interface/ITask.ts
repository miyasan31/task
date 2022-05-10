import type { IUser } from './IUser';
import type { ITag } from './ITag';

export type ITask = {
  id: number;
  task_name: string;
  description: string;
  is_done: boolean;
  user_id: IUser['id'];
  tag_id: ITag['id'];
  created_at: number;
  updated_at: number;
};
