import { Injectable } from '@angular/core';

import { ILike } from '~/interfaces/like/ILike';
import { LikeRepository } from '~/repositories/like/like.repository';
import { LikePipe } from '~/services/like/like.pipe';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(public likeRepository: LikeRepository) {}

  create(like: ILike) {
    const likeDto = new LikePipe().create(like);
    return this.likeRepository.create(likeDto);
  }

  delete(likeId: ILike['id']) {
    return this.likeRepository.delete(likeId);
  }
}
