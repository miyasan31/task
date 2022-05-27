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

  create(createUser: ICreateUser): IUser | Error {
    if (!createUser.userName) {
      return new Error('ユーザー名を入力してください');
    }

    if (!createUser.avatar) {
      return new Error('アバターを選択してください');
    }

    return {
      ...createUser,
      profile: '',
    };
  }

  update(updateUser: IUser): IUser | Error {
    if (!updateUser.userName) {
      return new Error('ユーザー名を入力してください');
    }

    if (!updateUser.avatar) {
      return new Error('アバターを選択してください');
    }

    return updateUser;
  }
}
