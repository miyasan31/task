import { Injectable } from '@angular/core';

import { IUser } from '~/interfaces/IUser';
import { UserRepository } from '~/repositories/user/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public userRepository: UserRepository) {}

  getUser(userId: IUser['id']): Promise<IUser> {
    return this.userRepository.getUser(userId);
  }

  createUser(user: IUser): Promise<void> {
    return this.userRepository.createUser(user);
  }

  updateUser(user: IUser): Promise<void> {
    return this.userRepository.updateUser(user);
  }

  deleteUser(userId: IUser['id']): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
