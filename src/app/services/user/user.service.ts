import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimeline } from '~/interfaces/user/ITimeline';

import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { UserRepository } from '~/repositories/user/user.repository';
import { UserPipe } from '~/services/user/user.pipe';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserRepository {
  constructor(public userRepository: UserRepository) {}

  getUserTaskList(): Observable<ITimeline[]> {
    return this.userRepository.getUserTaskList();
  }

  get(userId: IUser['id']): Promise<IUser> {
    return this.userRepository.get(userId);
  }

  create(user: IUser): Promise<void> {
    const userDto = new UserPipe().create(user);
    return this.userRepository.create(userDto);
  }

  update(user: IUser): Promise<void> {
    const userDto = new UserPipe().update(user);
    return this.userRepository.update(userDto);
  }

  delete(userId: IUser['id']): Promise<void> {
    return this.userRepository.delete(userId);
  }
}
