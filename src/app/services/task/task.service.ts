import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/ITask';
import { ITaskWithLike } from '~/interfaces/ITaskWithLike';
import { IUser } from '~/interfaces/IUser';
import { TaskRepository } from '~/repositories/task/task.repository';
import { TaskPipe } from '~/services/task/task.pipe';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(public taskRepository: TaskRepository) {}

  getTaskList(userId: ITask['userId']): Observable<ITask[]> {
    return this.taskRepository.getTaskList(userId);
  }

  getTaskListWithLike(
    userId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskWithLike[]> {
    return this.taskRepository.getTaskListWithLike(userId, currentUserId);
  }

  getTask(taskId: ITask['id']): Promise<ITask> {
    return this.taskRepository.getTask(taskId);
  }

  createTask(task: ITask): Promise<void> {
    const taskDto = new TaskPipe().create(task);
    return this.taskRepository.createTask(taskDto);
  }

  updateTask(task: ITask): Promise<void> {
    const taskDto = new TaskPipe().update(task);
    return this.taskRepository.updateTask(taskDto);
  }

  deleteTask(taskId: ITask['id']): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }
}
