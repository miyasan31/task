import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { IProfileRepository } from '~/interfaces/profile/IProfileRepository';
import { ITagChart } from '~/interfaces/profile/ITagChart';
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { ProfileRepository } from '~/repositories/profile/profile.repository';
import { TaskPipe } from '~/services/task/task.pipe';
import { isError } from '~/utils/isError';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements IProfileRepository {
  constructor(private taskPipe: TaskPipe, private profileRepository: ProfileRepository) {}

  getUserTaskListWithLike(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    return this.profileRepository.getUserTaskListWithLike(profileUserId, currentUserId);
  }

  getUserLikedTaskList(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ILikedTaskCard[]> {
    return this.profileRepository.getUserLikedTaskList(profileUserId, currentUserId);
  }

  getUserIsDoneTaskCount(profileUserId: IUser['id']): Promise<number> {
    return this.profileRepository.getUserIsDoneTaskCount(profileUserId);
  }

  getUserLikeCount(profileUserId: IUser['id']): Promise<number> {
    return this.profileRepository.getUserLikeCount(profileUserId);
  }

  getTagChartData(userId: IUser['id']): Promise<ITagChart[]> {
    return this.profileRepository.getTagChartData(userId);
  }

  afterTaskUpdate(task: ITask): Promise<void> {
    const updateTask = this.taskPipe.update(task);
    if (isError(updateTask)) {
      throw new Error(updateTask.message);
    }
    return this.profileRepository.afterTaskUpdate(updateTask);
  }

  afterTaskDelete(taskId: ITask['id']): Promise<void> {
    return this.profileRepository.afterTaskDelete(taskId);
  }
}
