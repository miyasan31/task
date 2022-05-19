import { Observable } from 'rxjs';

import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { IUser } from '~/interfaces/user/IUser';

export interface ITimelineRepository {
  getUserTaskList(): Observable<ITimeline[]>;
  getTaskListWithLike(userId: IUser['id'], currentUserId: IUser['id']): Observable<ITaskCard[]>;
}
