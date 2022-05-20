import { ILike } from '~/interfaces/like/ILike';

export interface ILikeRepository {
  create(like: ILike): Promise<void>;
  delete(likeId: ILike['id']): Promise<void>;
}
