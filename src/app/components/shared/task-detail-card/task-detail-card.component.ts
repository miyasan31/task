import { Component, Input, OnInit } from '@angular/core';

import { ILike } from '~/interfaces/like/ILike';
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { LikeService } from '~/services/like/like.service';

@Component({
  selector: 'app-task-detail-card',
  templateUrl: './task-detail-card.component.html',
  styleUrls: ['./task-detail-card.component.scss'],
})
export class TaskDetailCardComponent implements OnInit {
  @Input() user: IUser;
  @Input() task: ITaskCard;

  constructor(private authService: AuthService, private likeService: LikeService) {}

  ngOnInit() {}

  async onLikeClick(taskId: ITask['id'], like: ILike): Promise<void> {
    if (like) {
      this.likeService.delete(like.id);
      return;
    }

    const authUser = await this.authService.getAuthUserInfo();

    const createLike = {
      userId: authUser.id,
      taskId,
    };

    this.likeService.create(createLike);
  }
}
