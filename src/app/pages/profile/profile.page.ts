import { Component, OnInit } from '@angular/core';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';

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
    is_like: true,
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
    is_like: true,
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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  timeline_data = dummy_data;
  scene: string;
  user: IUser;

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    this.user = await this.authService.getAuthUserInfo();

    this.scene = 'profile';
  }

  onSegmentChanged(ev: any): void {
    console.log('Segment changed', ev);
  }

  onSignOut(): void {
    this.authService.signOut();
  }
}
