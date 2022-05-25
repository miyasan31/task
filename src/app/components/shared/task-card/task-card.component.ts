import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  @Input() profilePath?: string;

  constructor(private navController: NavController) {}

  ngOnInit() {}

  navigatePush($event, path?: string): void {
    $event.stopPropagation();
    $event.preventDefault();

    console.log(path);
    if (!path) {
      return;
    }
    this.navController.navigateForward(path);
  }
}
