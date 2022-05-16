import { Timestamp } from '@angular/fire/firestore';
import { ITask } from '~/interfaces/ITask';

// useCase + Entity
export class TaskPipe implements ITask {
  id: ITask['id'];
  taskName: ITask['taskName'];
  description: ITask['description'];
  isDone: ITask['isDone'];
  userId: ITask['userId'];
  tagId: ITask['tagId'];
  createdAt: ITask['createdAt'];
  updatedAt: ITask['updatedAt'];

  constructor() {
    this.isDone = false;
    this.createdAt = Timestamp.now();
    this.updatedAt = Timestamp.now();
  }

  create(task: ITask): Required<ITask> {
    // TODO:バリデーション追加
    return {
      ...task,
      isDone: !!task.isDone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update(task: ITask): ITask {
    return {
      ...task,
      updatedAt: this.updatedAt,
    };
  }
}
