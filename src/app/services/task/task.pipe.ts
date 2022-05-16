import { Timestamp } from '@angular/fire/firestore';
import { ITask } from '~/interfaces/ITask';

export class TaskPipe implements ITask {
  id: ITask['id'];
  taskName: ITask['taskName'];
  description: ITask['description'];
  isDone: ITask['isDone'];
  userId: ITask['userId'];
  tagId: ITask['tagId'];
  createdAt?: ITask['createdAt'];

  constructor() {
    this.isDone = false;
  }

  create(task: ITask): ITask {
    // TODO:バリデーション追加
    return {
      ...task,
      isDone: !!task.isDone,
    };
  }

  update(task: ITask): ITask {
    return task;
  }
}
