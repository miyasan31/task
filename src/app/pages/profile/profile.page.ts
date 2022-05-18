import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { ProfileService } from '~/services/profile/profile.service';
import { TimelineService } from '~/services/timeline/timeline.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  taskList: Observable<ITaskCard[]>;
  likeList: Observable<ILikedTaskCard[]>;
  scene: string;
  user: IUser;

  constructor(
    private authService: AuthService,
    private timelineService: TimelineService,
    private profileService: ProfileService,
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getAuthUserInfo();
    this.scene = 'profile';
    this.taskList = await this.timelineService.getTaskListWithLike(this.user.id, this.user.id);
    this.likeList = await this.profileService.getMyLikedTaskList(this.user.id);
  }

  onSegmentChanged(ev: any): void {
    console.log(ev);
  }

  onSignOut(): void {
    this.authService.signOut();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
