import { Observable } from 'rxjs';
import { IUserTask } from '~/interfaces/user/IUserTask';
import { IUser } from '~/interfaces/user/IUser';

export interface IUserRepository {
  get(userId: IUser['id']): Promise<IUser>;
  getUserTaskList(): Observable<IUserTask[]>;
  create(user: IUser): Promise<void>;
  update(user: IUser): Promise<void>;
  delete(userId: IUser['id']): Promise<void>;
}
