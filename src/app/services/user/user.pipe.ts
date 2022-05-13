import { IUser } from '~/interfaces/IUser';

export class UserPipe implements IUser {
  id: IUser['id'];
  userName: IUser['userName'];
  email: IUser['email'];
  profile: IUser['profile'];
  avatar: IUser['avatar'];
  createdAt: IUser['createdAt'];
  updatedAt: IUser['updatedAt'];

  constructor() {
    this.profile = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  create(user: IUser): Required<IUser> {
    // TODO:バリデーション追加
    return {
      ...user,
      profile: this.profile,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update(user: IUser): IUser {
    return {
      ...user,
      updatedAt: this.updatedAt,
    };
  }
}