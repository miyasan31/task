import { Injectable } from '@angular/core';

import { ITask } from '~/interfaces/ITask';
import { TaskRepository } from '~/repositories/task/task.repository';
import { TaskPipe } from '~/services/task/task.pipe';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(public taskRepository: TaskRepository) {}

  getTask(taskId: ITask['id']): Promise<ITask> {
    return this.taskRepository.getTask(taskId);
  }

  createTask(task: ITask): Promise<void> {
    const taskDto = new TaskPipe().create(task);
    return this.taskRepository.createTask(taskDto);
  }

  updateTask(task: ITask): Promise<void> {
    return this.taskRepository.updateTask(task);
  }

  deleteTask(taskId: ITask['id']): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }
}
