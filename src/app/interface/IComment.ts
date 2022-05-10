import type { IUser } from './IUser';
import type { ITask } from './ITask';

export type IComment = {
  id: number;
  comment: string;
  user_id: IUser['id'];
  task_id: ITask['id'];
  created_at: number;
};
