import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '~/interfaces/IUser';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() user: Pick<IUser, 'id' | 'userName' | 'avatar'>;
  @Input() updatedAt: number;
  @Input() task_list: string[];
  @Input() is_like: boolean;

  constructor() {}

  ngOnInit() {}

  handleClick($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }
}
