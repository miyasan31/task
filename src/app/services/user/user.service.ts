import { Injectable } from '@angular/core';

import { ICreateUser, IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { UserRepository } from '~/repositories/user/user.repository';
import { StorageService } from '~/services/storage/storage.service';
import { UserPipe } from '~/services/user/user.pipe';
import { checkExtension } from '~/utils/checkExtension';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserRepository {
  avatarUrl = '';

  constructor(
    private userPipe: UserPipe,
    private userRepository: UserRepository,
    private storageService: StorageService,
  ) {}

  get(userId: IUser['id']): Promise<IUser> {
    return this.userRepository.get(userId);
  }

  async create(user: ICreateUser, avatarFile?: File): Promise<void> {
    if (avatarFile) {
      const fileExtension = checkExtension(avatarFile.name);
      this.avatarUrl = await this.storageService.avatarUpload(
        avatarFile,
        `${user.id}.${fileExtension}`,
      );
    }

    const createUser = this.userPipe.create({
      ...user,
      avatar: this.avatarUrl || user.avatar,
    });
    return this.userRepository.create(createUser);
  }

  update(user: IUser): Promise<void> {
    return this.userRepository.update(user);
  }

  delete(userId: IUser['id']): Promise<void> {
    return this.userRepository.delete(userId);
  }
}
