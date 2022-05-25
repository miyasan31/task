import { Observable } from 'rxjs';

import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { ITagChart } from '~/interfaces/profile/ITagChart';
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
  getUserIsDoneTaskCount(profileUserId: IUser['id']): Promise<number>;
  getUserLikeCount(profileUserId: IUser['id']): Promise<number>;
  getTagChartData(userId: IUser['id']): Promise<ITagChart[]>;
}
