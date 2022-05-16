import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '~/services/task/task.service';
import { Observable } from 'rxjs';
import { IUser } from '~/interfaces/user/IUser';
import { UserService } from '~/services/user/user.service';
import { AuthService } from '~/services/auth/auth.service';
import { ITaskCart } from '~/interfaces/task/ITaskCart';

@Component({
  selector: 'app-timeline-detail',
  templateUrl: './timeline-detail.page.html',
  styleUrls: ['./timeline-detail.page.scss'],
})
export class TimelineDetailPage implements OnInit {
  userId: string;
  taskList: Observable<ITaskCart[]>;
  user: IUser;

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public taskService: TaskService,
    public userService: UserService,
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe((prams: ParamMap) => {
      this.userId = prams.get('userId');
    });

    const user = await this.authService.getAuthUser();

    this.user = await this.userService.get(this.userId);
    this.taskList = this.taskService.getTaskListWithLike(this.userId, user.uid);
  }
}
