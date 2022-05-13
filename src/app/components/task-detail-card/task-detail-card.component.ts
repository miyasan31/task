import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '~/interfaces/ITask';
import { IUser } from '~/interfaces/IUser';

@Component({
  selector: 'app-task-detail-card',
  templateUrl: './task-detail-card.component.html',
  styleUrls: ['./task-detail-card.component.scss'],
})
export class TaskDetailCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() task: ITask;

  constructor() {}

  ngOnInit() {}

  onClickEvent($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }
}
