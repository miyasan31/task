import { Injectable } from '@angular/core';

import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { UserRepository } from '~/repositories/user/user.repository';
import { StorageService } from '~/services/storage/storage.service';
import { checkExtension } from '~/utils/checkExtension';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserRepository {
  avatarUrl = '';

  constructor(private userRepository: UserRepository, private storageService: StorageService) {}

  get(userId: IUser['id']): Promise<IUser> {
    return this.userRepository.get(userId);
  }

  async create(user: IUser, avatarFile?: File): Promise<void> {
    if (avatarFile) {
      const fileExtension = checkExtension(avatarFile.name);
      this.avatarUrl = await this.storageService.avatarUpload(
        avatarFile,
        `${user.id}.${fileExtension}`,
      );
    }

    const userDto = { ...user, profile: '', avatar: this.avatarUrl || user.avatar };
    return this.userRepository.create(userDto);
  }

  update(user: IUser): Promise<void> {
    return this.userRepository.update(user);
  }

  delete(userId: IUser['id']): Promise<void> {
    return this.userRepository.delete(userId);
  }
}
