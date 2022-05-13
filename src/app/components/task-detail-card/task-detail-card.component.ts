import { Component, Input, OnInit } from '@angular/core';
import { ILike } from '~/interfaces/ILike';
import { ITask } from '~/interfaces/ITask';
import { ITaskWithLike } from '~/interfaces/ITaskWithLike';
import { IUser } from '~/interfaces/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { LikeService } from '~/services/like/like.service';

@Component({
  selector: 'app-task-detail-card',
  templateUrl: './task-detail-card.component.html',
  styleUrls: ['./task-detail-card.component.scss'],
})
export class TaskDetailCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() task: ITaskWithLike;
  @Input() like: ILike;

  constructor(public authService: AuthService, public likeService: LikeService) {}

  ngOnInit() {}

  async onLikeClick($event, taskId: ITask['id'], like: ILike) {
    $event.stopPropagation();
    $event.preventDefault();

    if (like) {
      this.likeService.deleteLike(like.id);
    } else {
      const authUser = await this.authService.getAuthUserInfo();

      const createLike = {
        id: '',
        userId: authUser.id,
        taskId: taskId,
      };

      this.likeService.createLike(createLike);
    }
  }
}
