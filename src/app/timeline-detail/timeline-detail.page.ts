import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const dummy_data = [
  {
    id: 1,
    taskName: 'Task 1',
    description: 'Task 1の詳細メモ',
  },
  {
    id: 2,
    taskName: 'Task 2',
    description: 'Task 2の詳細メモ',
  },
  {
    id: 3,
    taskName: 'Task 3',
    description: 'Task 3の詳細メモ',
  },
];

@Component({
  selector: 'app-timeline-detail',
  templateUrl: './timeline-detail.page.html',
  styleUrls: ['./timeline-detail.page.scss'],
})
export class TimelineDetailPage implements OnInit {
  userId: string;
  taskList = dummy_data;

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((prams: ParamMap) => {
      this.userId = prams.get('userId');
    });
  }
}
