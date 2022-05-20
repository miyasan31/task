import { Observable } from 'rxjs';

import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';

export interface IProfileRepository {
  getUserTaskListWithLike(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]>;
  getUserLikedTaskList(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ILikedTaskCard[]>;
  getUserLikeCount(profileUserId: IUser['id']): Promise<number>;
}
