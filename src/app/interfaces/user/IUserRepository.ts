import { IUser } from '~/interfaces/user/IUser';

export interface IUserRepository {
  get(userId: IUser['id']): Promise<IUser>;
  create(user: IUser): Promise<void>;
  update(user: IUser): Promise<void>;
  delete(userId: IUser['id']): Promise<void>;
}
