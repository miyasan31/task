import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskCart } from '~/interfaces/task/ITaskCart';
import { ITaskRepository } from '~/interfaces/task/ITaskRepository';
import { IUser } from '~/interfaces/user/IUser';
import { TaskRepository } from '~/repositories/task/task.repository';
import { TaskPipe } from '~/services/task/task.pipe';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskRepository {
  constructor(public taskRepository: TaskRepository) {}

  getTaskList(userId: ITask['userId']): Observable<ITask[]> {
    return this.taskRepository.getTaskList(userId);
  }

  getTaskListWithLike(
    userId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCart[]> {
    return this.taskRepository.getTaskListWithLike(userId, currentUserId);
  }

  get(taskId: ITask['id']): Promise<ITask> {
    return this.taskRepository.get(taskId);
  }

  create(task: ITask): Promise<void> {
    const taskDto = new TaskPipe().create(task);
    return this.taskRepository.create(taskDto);
  }

  update(task: ITask): Promise<void> {
    const taskDto = new TaskPipe().update(task);
    return this.taskRepository.update(taskDto);
  }

  delete(taskId: ITask['id']): Promise<void> {
    return this.taskRepository.delete(taskId);
  }
}
