import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { ITimelineRepository } from '~/interfaces/timeline/ITimelineRepository';
import { IUser } from '~/interfaces/user/IUser';
import { TimelineRepository } from '~/repositories/timeline/timeline.repository';

@Injectable({
  providedIn: 'root',
})
export class TimelineService implements ITimelineRepository {
  constructor(private timelineRepository: TimelineRepository) {}

  getTimelineUserTaskList(): Observable<ITimeline[]> {
    return this.timelineRepository.getTimelineUserTaskList();
  }

  getTimelineDetailTaskListWithLike(
    userId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    return this.timelineRepository.getTimelineDetailTaskListWithLike(userId, currentUserId);
  }
}
