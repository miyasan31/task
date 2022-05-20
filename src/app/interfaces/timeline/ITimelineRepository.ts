import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { IUser } from '~/interfaces/user/IUser';

export interface ITimelineRepository {
  getTimelineUserTaskList(): Observable<ITimeline[]>;
  getTimelineDetailTaskListWithLike(
    taskUserId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]>;
}
