import { Component, Input, OnInit } from '@angular/core';

import { ITask } from '~/interfaces/task/ITask';
import { IUser } from '~/interfaces/user/IUser';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() taskList: ITask[];
  @Input() routerLink: string;

  constructor() {}

  ngOnInit() {}

  onClickEvent($event): void {
    $event.stopPropagation();
    $event.preventDefault();
  }
}
