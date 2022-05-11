import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '~/interface/IUser';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() user: Pick<IUser, 'id' | 'user_name' | 'avatar'>;
  @Input() updated_at: number;
  @Input() task_list: string[];
  @Input() is_like: boolean;

  constructor() {}

  ngOnInit() {}
}
