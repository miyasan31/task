import { Observable } from 'rxjs';
import type { ITask } from '~/interfaces/task/ITask';
import { ITaskWithLike } from '~/interfaces/ITaskWithLike';
import { IUser } from '~/interfaces/user/IUser';

export interface ITaskRepository {
  get(taskId: ITask['id']): Promise<ITask>;
  getTaskList(userId: IUser['id']): Observable<ITask[]>;
  getTaskListWithLike(userId: IUser['id'], currentUserId: IUser['id']): Observable<ITaskWithLike[]>;
  create(task: ITask): Promise<void>;
  update(task: ITask): Promise<void>;
  delete(taskId: ITask['id']): Promise<void>;
}
