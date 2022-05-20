import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { ProfileService } from '~/services/profile/profile.service';

type Scene = 'profile' | 'task' | 'like';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  taskList: Observable<ITaskCard[]>;
  likeList: Observable<ILikedTaskCard[]>;
  isDoneTaskCount = 0;
  likeCount = 0;
  scene: Scene;
  user: IUser;

  constructor(private authService: AuthService, private profileService: ProfileService) {}

  async ngOnInit() {
    await this.fetchProfile();
    this.scene = 'profile';
  }

  private async fetchProfile(): Promise<void> {
    this.user = await this.authService.getAuthUserInfo();
    this.likeCount = await this.profileService.getUserLikeCount(this.user.id);
    this.isDoneTaskCount = await this.profileService.getUserIsDoneTaskCount(this.user.id);
  }

  private fetchTaskList(): void {
    this.taskList = this.profileService.getUserTaskListWithLike(this.user.id, this.user.id);
  }

  private fetchLikeList(): void {
    this.likeList = this.profileService.getUserLikedTaskList(this.user.id, this.user.id);
  }

  onSegmentChanged(scene: Scene): void {
    switch (scene) {
      case 'profile':
        if (this.user) {
          break;
        }
        this.fetchProfile();
        break;
      case 'task':
        if (this.taskList) {
          break;
        }
        this.fetchTaskList();
        break;
      case 'like':
        if (this.likeList) {
          break;
        }
        this.fetchLikeList();
        break;
      default:
        break;
    }
  }

  onSignOut(): void {
    this.authService.signOut();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
