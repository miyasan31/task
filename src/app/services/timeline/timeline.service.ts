import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimeline } from '~/interfaces/ITimeline';
import { TimelineRepository } from '~/repositories/timeline/timeline.repository';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(public timelineRepository: TimelineRepository) {}

  getTimelineInfo(): Observable<ITimeline[]> {
    return this.timelineRepository.getTimelineInfo();
  }
}
