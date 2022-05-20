import { Injectable } from '@angular/core';

import { ICreateLike, ILike } from '~/interfaces/like/ILike';

@Injectable({
  providedIn: 'root',
})
export class LikePipe implements ILike {
  id: ILike['id'];
  userId: ILike['userId'];
  taskId: ILike['taskId'];
  createdAt?: ILike['createdAt'];

  constructor() {}

  create(like: ICreateLike): ICreateLike {
    // TODO:バリデーション追加
    return like;
  }
}
