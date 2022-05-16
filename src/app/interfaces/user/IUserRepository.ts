import { Observable } from 'rxjs';
import { ITimeline } from '~/interfaces/user/ITimeline';
import { IUser } from '~/interfaces/user/IUser';

export interface IUserRepository {
  get(userId: IUser['id']): Promise<IUser>;
  getUserTaskList(): Observable<ITimeline[]>;
  create(user: IUser): Promise<void>;
  update(user: IUser): Promise<void>;
  delete(userId: IUser['id']): Promise<void>;
}
