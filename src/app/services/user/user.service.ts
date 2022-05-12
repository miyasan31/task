import { Injectable } from '@angular/core';

import { IUser } from '~/interfaces/IUser';
import { UserRepository } from '~/repositories/user/user.repository';
import { UserPipe } from '~/services/user/user.pipe';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public userRepository: UserRepository) {}

  getUser(userId: IUser['id']): Promise<IUser> {
    return this.userRepository.getUser(userId);
  }

  createUser(user: IUser): Promise<void> {
    const userDto = new UserPipe().create(user);
    return this.userRepository.createUser(userDto);
  }

  updateUser(user: IUser): Promise<void> {
    const userDto = new UserPipe().update(user);
    return this.userRepository.updateUser(userDto);
  }

  deleteUser(userId: IUser['id']): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
