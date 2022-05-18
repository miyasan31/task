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

  ngOnInit() {
    this.timelineData = this.timelineService.getUserTaskList();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
