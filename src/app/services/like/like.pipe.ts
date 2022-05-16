import { Timestamp } from '@angular/fire/firestore';
import { ILike } from '~/interfaces/ILike';

// useCase + Entity
export class LikePipe implements ILike {
  id: ILike['id'];
  userId: ILike['userId'];
  taskId: ILike['taskId'];
  createdAt: ILike['createdAt'];

  constructor() {
    this.createdAt = Timestamp.now();
  }

  create(like: ILike): Required<ILike> {
    // TODO:バリデーション追加
    return {
      ...like,
      createdAt: this.createdAt,
    };
  }
}
