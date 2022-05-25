import { Component, Input, OnInit } from '@angular/core';

import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';
import { RouterService } from '~/services/router/router.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() taskList: ITask[];
  @Input() routerLink: string;
  @Input() profilePath?: string;

  constructor(private routerService: RouterService) {}

  ngOnInit() {}

  navigatePush($event, path?: string): void {
    this.routerService.navigatePush($event, path);
  }
}
