import { Injectable } from '@angular/core';

import { ILike } from '~/interfaces/ILike';
import { LikeRepository } from '~/repositories/like/like.repository';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(public likeRepository: LikeRepository) {}

  createLike(like: ILike): Promise<void> {
    return this.likeRepository.createLike(like);
  }

  deleteLike(likeId: ILike['id']): Promise<void> {
    return this.likeRepository.deleteLike(likeId);
  }
}
