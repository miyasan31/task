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
  selector: 'app-timeline-page',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  agoDateCount = 1;
  timelineData: TimelineData[] | null = [];
  // --- MEMO:Observable用 ---
  // timelineData: Observable<ITimeline[]>;

  constructor(private timelineService: TimelineService) {}

  async ngOnInit() {
    await this.timelineFetch(400, 1, { isInit: true });
  }

  async onLoadPrevData($event): Promise<void> {
    this.agoDateCount++;
    await this.timelineFetch(600, this.agoDateCount);
    await $event.target.complete();
  }

  async onTimelineRefresh($event): Promise<void> {
    this.agoDateCount = 1;
    await this.timelineFetch(400, this.agoDateCount, { isInit: true });
    await $event.target.complete();
  }

  async timelineFetch(
    delay: number,
    agoDateCount: number,
    option?: { isInit?: boolean },
  ): Promise<void> {
    await sleep(delay);
    const timelineList = await this.timelineService.getTimelineUserTaskList(
      agoDateCount,
      agoDateCount,
    );

    console.log(timelineList);

    if (option?.isInit) {
      this.timelineData = [{ sectionLabel: this.dayAgo(agoDateCount), data: timelineList }];
      return;
    }

    this.timelineData = [
      ...this.timelineData,
      { sectionLabel: this.dayAgo(agoDateCount), data: timelineList },
    ];
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

  private dayAgo(agoDate: number): Date {
    return new Date(new Date().setDate(new Date().getDate() - agoDate));
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
