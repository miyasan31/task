import { Injectable } from '@angular/core';

import { ILike } from '~/interfaces/ILike';
import { LikeRepository } from '~/repositories/like/like.repository';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(public likeRepository: LikeRepository) {}

  getLike(likeId: ILike['id']): Promise<ILike> {
    return this.likeRepository.getLike(likeId);
  }

  createLike(like: ILike): Promise<void> {
    return this.likeRepository.createLike(like);
  }

  updateLike(like: ILike): Promise<void> {
    return this.likeRepository.updateLike(like);
  }

  deleteLike(likeId: ILike['id']): Promise<void> {
    return this.likeRepository.deleteLike(likeId);
  }
}
