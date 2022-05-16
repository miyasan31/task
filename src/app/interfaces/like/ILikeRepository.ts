import type { ILike } from './ILike';

export interface ILikeRepository {
  create(like: ILike): Promise<void>;
  delete(likeId: ILike['id']): Promise<void>;
}
