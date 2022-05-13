import { Injectable } from '@angular/core';

import { ILike } from '~/interfaces/ILike';
import { LikeRepository } from '~/repositories/like/like.repository';
import { LikePipe } from '~/services/like/like.pipe';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(public likeRepository: LikeRepository) {}

  createLike(like: ILike): Promise<void> {
    const likeDto = new LikePipe().create(like);
    return this.likeRepository.createLike(likeDto);
  }

  deleteLike(likeId: ILike['id']): Promise<void> {
    return this.likeRepository.deleteLike(likeId);
  }
}
