import { Injectable } from '@angular/core';

import { ILike } from '~/interfaces/like/ILike';
import { LikeRepository } from '~/repositories/like/like.repository';
import { TaskRepository } from '~/repositories/task/task.repository';
import { LikePipe } from '~/services/like/like.pipe';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private likeRepository: LikeRepository, private taskRepository: TaskRepository) {}

  async create(like: ILike): Promise<void> {
    const likeDto = new LikePipe().create(like);
    await this.likeRepository.create(likeDto);

    const taskData = await this.taskRepository.get(likeDto.taskId);
    await this.taskRepository.likeCountUp(taskData);
    return;
  }

  async delete(likeId: ILike['id']): Promise<void> {
    const likeData = await this.likeRepository.get(likeId);
    const taskData = await this.taskRepository.get(likeData.taskId);
    await this.taskRepository.likeCountDown(taskData);

    await this.likeRepository.delete(likeId);
    return;
  }
}
