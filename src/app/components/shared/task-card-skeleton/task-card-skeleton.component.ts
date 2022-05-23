import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card-skeleton',
  templateUrl: './task-card-skeleton.component.html',
  styleUrls: ['./task-card-skeleton.component.scss'],
})
export class TaskCardSkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onClickEvent($event): void {
    $event.stopPropagation();
    $event.preventDefault();
  }
}
