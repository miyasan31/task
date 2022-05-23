import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { IUser } from '~/interfaces/user/IUser';

export interface ITimelineRepository {
  getTimelineUserTaskList(agoDate: number, endDate: number): Promise<ITimeline[]>;
  // --- MEMO:Observable用 ---
  // getTimelineUserTaskList(agoDate: number): Observable<ITimeline[]>;
  getTimelineDetailTaskListWithLike(
    taskUserId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]>;
}
