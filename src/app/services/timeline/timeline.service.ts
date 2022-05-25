import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITiedTagTask } from '~/interfaces/timeline/ITiedTagTask';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { ITimelineRepository } from '~/interfaces/timeline/ITimelineRepository';
import { IUser } from '~/interfaces/user/IUser';
import { TimelineRepository } from '~/repositories/timeline/timeline.repository';

@Injectable({
  providedIn: 'root',
})
export class TimelineService implements ITimelineRepository {
  constructor(private timelineRepository: TimelineRepository) {}

  getTimelineUserTaskList(startDate: number, endDate: number): Promise<ITimeline[]> {
    return this.timelineRepository.getTimelineUserTaskList(startDate, endDate);
  }
  // --- MEMO:Observable用 ---
  // getTimelineUserTaskList(agoDate: number): Observable<ITimeline[]> {
  //   return this.timelineRepository.getTimelineUserTaskList(agoDate);
  // }

  getTimelineDetailTaskListWithLike(
    taskUserId: ITask['userId'],
    currentUserId: IUser['id'],
    startDate: number,
    endDate: number,
  ): Observable<ITaskCard[]> {
    return this.timelineRepository.getTimelineDetailTaskListWithLike(
      taskUserId,
      currentUserId,
      startDate,
      endDate,
    );
  }

  getTiedTagTaskList(
    tagId: ITask['tagId'],
    currentUserId: IUser['id'],
  ): Observable<ITiedTagTask[]> {
    return this.timelineRepository.getTiedTagTaskList(tagId, currentUserId);
  }
}
