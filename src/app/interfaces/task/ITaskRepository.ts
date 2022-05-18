import { Observable } from 'rxjs';
import type { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

export interface ITaskRepository {
  get(taskId: ITask['id']): Promise<ITask>;
  getTaskList(userId: IUser['id']): Observable<ITask[]>;
  create(task: ITask): Promise<void>;
  update(task: ITask): Promise<void>;
  delete(taskId: ITask['id']): Promise<void>;
}
