import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { IProfileRepository } from '~/interfaces/profile/IProfileRepository';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { ProfileRepository } from '~/repositories/profile/profile.repository';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements IProfileRepository {
  constructor(private profileRepository: ProfileRepository) {}

  getUserTaskListWithLike(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    return this.profileRepository.getUserTaskListWithLike(profileUserId, currentUserId);
  }

  getUserLikedTaskList(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ILikedTaskCard[]> {
    return this.profileRepository.getUserLikedTaskList(profileUserId, currentUserId);
  }
}
