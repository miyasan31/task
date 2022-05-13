import { ILike } from '~/interfaces/ILike';

export class LikePipe implements ILike {
  id: ILike['id'];
  userId: ILike['userId'];
  taskId: ILike['taskId'];
  createdAt: ILike['createdAt'];

  constructor() {
    this.createdAt = new Date();
  }

  create(like: ILike): Required<ILike> {
    // TODO:バリデーション追加
    return {
      ...like,
      createdAt: this.createdAt,
    };
  }
}
