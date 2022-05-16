import { ILike } from '~/interfaces/like/ILike';

export class LikePipe implements ILike {
  id: ILike['id'];
  userId: ILike['userId'];
  taskId: ILike['taskId'];
  createdAt?: ILike['createdAt'];

  constructor() {}

  create(like: ILike): ILike {
    // TODO:バリデーション追加
    return like;
  }
}
