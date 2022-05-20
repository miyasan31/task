import { ITask } from '~/interfaces/task/ITask';

export class TaskPipe implements ITask {
  id: ITask['id'];
  taskName: ITask['taskName'];
  description: ITask['description'];
  isDone: ITask['isDone'];
  likeCount: ITask['likeCount'];
  userId: ITask['userId'];
  tagId: ITask['tagId'];
  createdAt?: ITask['createdAt'];

  constructor() {
    this.isDone = false;
    this.likeCount = 0;
  }

  create(task: ITask): ITask {
    // TODO:バリデーション追加
    return {
      ...task,
      isDone: !!task.isDone,
      likeCount: this.likeCount,
    };
  }

  update(task: ITask): ITask {
    return task;
  }
}
