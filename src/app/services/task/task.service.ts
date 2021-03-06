import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask, IUpsertTask } from '~/interfaces/task/ITask';
import { ITaskRepository } from '~/interfaces/task/ITaskRepository';
import { TaskRepository } from '~/repositories/task/task.repository';
import { TaskPipe } from '~/services/task/task.pipe';
import { isError } from '~/utils/isError';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskRepository {
  constructor(private taskPipe: TaskPipe, private taskRepository: TaskRepository) {}

  get(taskId: ITask['id']): Promise<ITask> {
    return this.taskRepository.get(taskId);
  }

  getTaskList(userId: ITask['userId']): Observable<ITask[]> {
    return this.taskRepository.getTaskList(userId);
  }

  create(task: IUpsertTask): Promise<void> {
    const createTask = this.taskPipe.create(task);
    if (isError(createTask)) {
      throw new Error(createTask.message);
    }
    return this.taskRepository.create(createTask);
  }

  update(task: IUpsertTask): Promise<void> {
    const updateTask = this.taskPipe.update(task);
    if (isError(updateTask)) {
      throw new Error(updateTask.message);
    }
    return this.taskRepository.update(updateTask);
  }

  delete(taskId: ITask['id']): Promise<void> {
    return this.taskRepository.delete(taskId);
  }
}
