import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserTask } from '~/interfaces/user/IUserTask';
import { UserService } from '~/services/user/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  timelineData: Observable<IUserTask[]>;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.timelineData = this.userService.getUserTaskList();
  }
}
