import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { TimelineService } from '~/services/timeline/timeline.service';
import { UserService } from '~/services/user/user.service';

@Component({
  selector: 'app-timeline-detail',
  templateUrl: './timeline-detail.page.html',
  styleUrls: ['./timeline-detail.page.scss'],
})
export class TimelineDetailPage implements OnInit {
  userId: string;
  taskList: Observable<ITaskCard[]>;
  user: IUser;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private timelineService: TimelineService,
  ) {}

  async ngOnInit() {
    const subscribe = this.route.paramMap.subscribe((prams: ParamMap) => {
      this.userId = prams.get('userId');
    });
    subscribe.unsubscribe();

    const user = await this.authService.getAuthUser();

    this.user = await this.userService.get(this.userId);
    this.taskList = this.timelineService.getTimelineDetailTaskListWithLike(this.userId, user.uid);
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
