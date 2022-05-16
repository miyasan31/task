import { IUser } from '~/interfaces/IUser';

export class UserPipe implements IUser {
  id: IUser['id'];
  userName: IUser['userName'];
  email: IUser['email'];
  profile?: IUser['profile'];
  avatar: IUser['avatar'];
  createdAt?: IUser['createdAt'];

  constructor() {
    this.profile = '';
  }

  create(user: IUser): IUser {
    // TODO:バリデーション追加
    return {
      ...user,
      profile: this.profile,
    };
  }

  update(user: IUser): IUser {
    return user;
  }
}
