import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimeline } from '~/interfaces/user/ITimeline';
import { UserService } from '~/services/user/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  timelineData: Observable<ITimeline[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.timelineData = this.userService.getUserTaskList();
  }
}
