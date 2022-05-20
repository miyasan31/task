import { Injectable } from '@angular/core';

import { ITask, IUpsertTask } from '~/interfaces/task/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskPipe implements ITask {
  id: ITask['id'];
  taskName: ITask['taskName'];
  description: ITask['description'];
  isDone: ITask['isDone'];
  likeCount: ITask['likeCount'];
  userId: ITask['userId'];
  tagId: ITask['tagId'];
  createdAt?: ITask['createdAt'];
  updatedAt?: ITask['updatedAt'];

  constructor() {}

  create(createTask: IUpsertTask): ITask {
    // TODO:バリデーション追加
    return {
      ...createTask,
      likeCount: 0,
    };
  }

  update(updateTask: IUpsertTask): ITask {
    return updateTask;
  }
}
