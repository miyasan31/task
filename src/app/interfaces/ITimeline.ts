import { ITask } from '~/interfaces/ITask';
import { IUser } from '~/interfaces/IUser';

// export interface ITimeline extends IUser, ITask {}

export interface ITimeline {
  user: IUser;
  task: ITask[];
}
