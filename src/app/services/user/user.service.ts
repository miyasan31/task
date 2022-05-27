import { Injectable } from '@angular/core';

import { ICreateUser, IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { UserRepository } from '~/repositories/user/user.repository';
import { StorageService } from '~/services/storage/storage.service';
import { UserPipe } from '~/services/user/user.pipe';
import { checkExtension } from '~/utils/checkExtension';
import { isError } from '~/utils/isError';

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
      this.avatarUrl = await this.avatarUpload(avatarFile, user.id);
    }
    console.log(this.avatarUrl);
    const createUser = this.userPipe.create({
      ...user,
      avatar: this.avatarUrl || user.avatar,
    });
    if (isError(createUser)) {
      throw new Error(createUser.message);
    }
    return this.userRepository.create(createUser);
  }

  async update(user: IUser, avatarFile?: File): Promise<void> {
    if (avatarFile) {
      this.avatarUrl = await this.avatarUpload(avatarFile, user.id);
    }

    const updateUser = this.userPipe.update({
      ...user,
      avatar: this.avatarUrl || user.avatar,
    });
    if (isError(updateUser)) {
      throw new Error(updateUser.message);
    }
    return this.userRepository.update(updateUser);
  }

  delete(userId: IUser['id']): Promise<void> {
    return this.userRepository.delete(userId);
  }

  avatarUpload(avatarFile: File, userId: IUser['id']): Promise<string> {
    const fileExtension = checkExtension(avatarFile.name);
    return this.storageService.avatarUpload(avatarFile, `${userId}.${fileExtension}`);
  }
}
