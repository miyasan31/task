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

  create(createTask: IUpsertTask): ITask | Error {
    if (!createTask.taskName) {
      return new Error('タスク名を入力してください');
    }

    if (!createTask.tagId) {
      return new Error('タグを選択してください');
    }

    if (createTask.isDone && !createTask.description) {
      return new Error('完了時にはアウトプットメモが必要です');
    }

    return createTask;
  }

  update(updateTask: IUpsertTask): ITask | Error {
    if (!updateTask.taskName) {
      return new Error('タスク名を入力してください');
    }

    if (!updateTask.tagId) {
      return new Error('タグを選択してください');
    }

    if (updateTask.isDone && !updateTask.description) {
      return new Error('完了時にはアウトプットメモが必要です');
    }

    return updateTask;
  }
}
