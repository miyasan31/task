import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '~/services/task/task.service';
import { Observable } from 'rxjs';
import { IUser } from '~/interfaces/user/IUser';
import { UserService } from '~/services/user/user.service';
import { AuthService } from '~/services/auth/auth.service';
import { ITaskCard } from '~/interfaces/task/ITaskCard';

@Component({
  selector: 'app-timeline-detail',
  templateUrl: './timeline-detail.page.html',
  styleUrls: ['./timeline-detail.page.scss'],
})
export class TimelineDetailPage implements OnInit {
  userId: string;
  taskList: Observable<ITaskCard[]>;
  user: IUser;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    const subscribe = this.route.paramMap.subscribe((prams: ParamMap) => {
      this.userId = prams.get('userId');
    });
    subscribe.unsubscribe();

    const user = await this.authService.getAuthUser();

    this.user = await this.userService.get(this.userId);
    this.taskList = this.taskService.getTaskListWithLike(this.userId, user.uid);
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
