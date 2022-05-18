import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskRepository } from '~/interfaces/task/ITaskRepository';
import { TaskRepository } from '~/repositories/task/task.repository';
import { TaskPipe } from '~/services/task/task.pipe';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskRepository {
  constructor(private taskRepository: TaskRepository) {}

  getTaskList(userId: ITask['userId']): Observable<ITask[]> {
    return this.taskRepository.getTaskList(userId);
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
