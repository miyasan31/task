import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { TimelineService } from '~/services/timeline/timeline.service';
import { sleep } from '~/utils/sleep';

type TimelineData = {
  sectionLabel: Date;
  data: ITimeline[];
};

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  agoDateCount = 1;
  timelineData: TimelineData[] | null = null;
  // --- MEMO:Observable用 ---
  // timelineData: Observable<ITimeline[]>;

  constructor(private timelineService: TimelineService) {}

  private dayAgo(agoDate: number): Date {
    return new Date(new Date().setDate(new Date().getDate() - agoDate));
  }

  async ngOnInit() {
    await sleep(400);
    const timelineList = await this.timelineService.getTimelineUserTaskList(
      this.agoDateCount,
      this.agoDateCount,
    );
    this.timelineData = [{ sectionLabel: this.dayAgo(this.agoDateCount), data: timelineList }];
  }

  async onLoadData($event) {
    this.agoDateCount++;
    await sleep(600);
    const addTimelineList = await this.timelineService.getTimelineUserTaskList(
      this.agoDateCount,
      this.agoDateCount,
    );
    if (addTimelineList.length) {
    }
    this.timelineData = [
      ...this.timelineData,
      { sectionLabel: this.dayAgo(this.agoDateCount), data: addTimelineList },
    ];
    await $event.target.complete();
  }

  // --- MEMO:Observable用 ---
  // async ngOnInit() {
  //   setTimeout(() => {
  //     this.timelineData = this.timelineService.getTimelineUserTaskList(this.agoDateCount);
  //   }, 300);
  // }

  // onloadData($event) {
  //   this.agoDateCount = this.agoDateCount + 1;
  //   this.timelineData = this.timelineService.getTimelineUserTaskList(this.agoDateCount);
  // }

  trackByFn(index, item): number {
    return item.id;
  }
}
