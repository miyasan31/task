import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { TimelineService } from '~/services/timeline/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  timelineData: Observable<ITimeline[]>;

  constructor(private timelineService: TimelineService) {}

  async ngOnInit() {
    setTimeout(() => {
      this.timelineData = this.timelineService.getTimelineUserTaskList();
    }, 300);
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
