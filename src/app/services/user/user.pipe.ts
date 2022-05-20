import { Injectable } from '@angular/core';

import { ICreateUser, IUser } from '~/interfaces/user/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserPipe implements IUser {
  id: IUser['id'];
  userName: IUser['userName'];
  email: IUser['email'];
  profile: IUser['profile'];
  avatar: IUser['avatar'];
  createdAt?: IUser['createdAt'];
  updatedAt?: IUser['updatedAt'];

  constructor() {}

  create(createUser: ICreateUser): IUser {
    // TODO:バリデーション追加
    return {
      ...createUser,
      profile: '',
    };
  }

  update(user: IUser): IUser {
    return user;
  }
}
