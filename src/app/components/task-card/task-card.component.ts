import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '~/interfaces/ITask';
import { IUser } from '~/interfaces/IUser';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() taskList: ITask[];
  @Input() isLike: boolean;

  constructor() {}

  ngOnInit() {}

  onClickEvent($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }
}
