import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { TimelineService } from '~/services/timeline/timeline.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  taskList: Observable<ITaskCard[]>;
  scene: string;
  user: IUser;

  constructor(private authService: AuthService, private timelineService: TimelineService) {}

  async ngOnInit() {
    this.user = await this.authService.getAuthUserInfo();
    this.taskList = await this.timelineService.getTaskListWithLike(this.user.id, this.user.id);
    this.scene = 'profile';
  }

  onSignOut(): void {
    this.authService.signOut();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
