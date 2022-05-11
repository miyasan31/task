import { Component, OnInit } from '@angular/core';

const dummy_avatar =
  'https://pbs.twimg.com/profile_images/1511856577942552576/ML2kSp4E_400x400.jpg';

const dummy_data = [
  {
    id: 1,
    user: {
      id: 'user_1',
      userName: 'ユーザー1',
      avatar: dummy_avatar,
    },
    updatedAt: 1588888888,
    task_list: ['Task 1', 'Task 2', 'Task 3'],
    is_like: false,
  },
  {
    id: 2,
    user: {
      id: 'user_2',
      userName: 'ユーザー2',
      avatar: dummy_avatar,
    },
    updatedAt: 1588888888,
    task_list: ['Task 1', 'Task 2', 'Task 3'],
    is_like: false,
  },
  {
    id: 3,
    user: {
      id: 'user_3',
      userName: 'ユーザー3',
      avatar: dummy_avatar,
    },
    updatedAt: 1588888888,
    task_list: ['Task 1', 'Task 2', 'Task 3'],
    is_like: false,
  },
];

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  timeline_data = dummy_data;

  constructor() {}

  ngOnInit() {}
}