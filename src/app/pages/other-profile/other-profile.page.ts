import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { ProfileService } from '~/services/profile/profile.service';
import { ToastService } from '~/services/toast/toast.service';
import { UserService } from '~/services/user/user.service';
import { sleep } from '~/utils/sleep';

type Scene = 'profile' | 'task' | 'like';

@Component({
  selector: 'app-other-profile-page',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
})
export class OtherProfilePage implements OnInit {
  profileUserId: string;
  taskList: Observable<ITaskCard[]>;
  likeList: Observable<ILikedTaskCard[]>;
  isDoneTaskCount = 0;
  likeCount = 0;
  scene: Scene = 'profile';
  profileUser: IUser | null = null;
  currentUser: IUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private navController: NavController,
  ) {}

  async ngOnInit() {
    const subscribe = this.route.paramMap.subscribe((prams: ParamMap) => {
      this.profileUserId = prams.get('userId');
    });
    subscribe.unsubscribe();

    this.currentUser = await this.authService.getAuthUserInfo();
    await this.fetchProfile();
  }

  private async fetchProfile(): Promise<void> {
    await this.fetchUserProfile(400);
  }

  private async fetchUserProfile(delay: number): Promise<void> {
    await sleep(delay);
    this.profileUser = await this.userService.get(this.profileUserId);
    this.likeCount = await this.profileService.getUserLikeCount(this.profileUserId);
    this.isDoneTaskCount = await this.profileService.getUserIsDoneTaskCount(this.profileUserId);
  }

  private fetchTaskList(): void {
    setTimeout(() => {
      this.taskList = this.profileService.getUserTaskListWithLike(
        this.profileUserId,
        this.currentUser.id,
      );
    }, 300);
  }

  private fetchLikeList(): void {
    setTimeout(() => {
      this.likeList = this.profileService.getUserLikedTaskList(
        this.profileUserId,
        this.currentUser.id,
      );
    }, 300);
  }

  async onProfileRefresh($event): Promise<void> {
    await this.fetchUserProfile(600);
    await $event.target.complete();
  }

  onSegmentChanged($event): void {
    const scene = $event.detail.value;
    switch (scene) {
      case 'profile':
        if (this.profileUser) {
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

  async onSignOut(): Promise<void> {
    await this.authService.signOut();
    await this.toastService.presentToast('サインアウトしました', 'success');
  }

  navigateBack(): void {
    this.navController.back();
  }

  trackByFnTaskList(_, item: ITaskCard): string {
    return item.task.id;
  }

  trackByFnLikeList(_, item: ILikedTaskCard): string {
    return item.like.id;
  }
}
