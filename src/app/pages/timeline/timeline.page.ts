import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { TimelineService } from '~/services/timeline/timeline.service';
import { sleep } from '~/utils/sleep';

type TimelineData = {
  sectionLabel: Date;
  sectionId: number;
  data: ITimeline[];
};

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  isLoading = false;
  agoDateCount = 0;
  timelineData: TimelineData[] | null = [];
  // --- MEMO:Observable用 ---
  // timelineData: Observable<ITimeline[]>;

  constructor(private timelineService: TimelineService) {}

  async ngOnInit() {
    await this.timelineFetch(400, this.agoDateCount, { isInit: true });
    this.agoDateCount++;
    await this.timelineFetch(400, this.agoDateCount);
  }

  async onLoadMoreData(): Promise<void> {
    this.isLoading = true;
    this.agoDateCount++;
    await this.timelineFetch(600, this.agoDateCount);
    this.isLoading = false;
  }

  // async onLoadPrevData($event): Promise<void> {
  //   this.agoDateCount++;
  //   await this.timelineFetch(600, this.agoDateCount);
  //   await $event.target.complete();
  // }

  async onTimelineRefresh($event): Promise<void> {
    this.agoDateCount = 0;
    await this.timelineFetch(400, this.agoDateCount, { isInit: true });
    this.agoDateCount++;
    await this.timelineFetch(400, this.agoDateCount);
    await $event.target.complete();
  }

  async timelineFetch(
    delay: number,
    agoDateCount: number,
    option?: { isInit?: boolean },
  ): Promise<void> {
    const [timelineList] = await Promise.all([
      this.timelineService.getTimelineUserTaskList(agoDateCount, agoDateCount),
      sleep(delay),
    ]);

    if (option?.isInit) {
      this.timelineData = [
        {
          sectionLabel: this.dayAgo(agoDateCount),
          sectionId: this.agoDateCount,
          data: timelineList,
        },
      ];
      return;
    }

    this.timelineData = [
      ...this.timelineData,
      { sectionLabel: this.dayAgo(agoDateCount), sectionId: this.agoDateCount, data: timelineList },
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
    return new Date(new Date().setDate(new Date().getDate() - agoDate || 0));
  }

  trackByFnSection(_, item: TimelineData): number {
    return item.sectionId;
  }

  trackByTask(_, item: TimelineData['data'][number]): string {
    return item.user.id;
  }
}
