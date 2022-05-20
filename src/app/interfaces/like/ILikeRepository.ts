import { ICreateLike, ILike } from '~/interfaces/like/ILike';

export interface ILikeRepository {
  create(like: ICreateLike): Promise<void>;
  delete(likeId: ILike['id']): Promise<void>;
}
