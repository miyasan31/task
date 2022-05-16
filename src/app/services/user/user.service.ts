import { Injectable } from '@angular/core';

import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { UserRepository } from '~/repositories/user/user.repository';
import { UserPipe } from '~/services/user/user.pipe';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserRepository {
  constructor(public userRepository: UserRepository) {}

  getUserTaskList() {
    return this.userRepository.getUserTaskList();
  }

  get(userId: IUser['id']) {
    return this.userRepository.get(userId);
  }

  create(user: IUser) {
    const userDto = new UserPipe().create(user);
    return this.userRepository.create(userDto);
  }

  update(user: IUser) {
    const userDto = new UserPipe().update(user);
    return this.userRepository.update(userDto);
  }

  delete(userId: IUser['id']) {
    return this.userRepository.delete(userId);
  }
}
