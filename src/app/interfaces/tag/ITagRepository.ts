import type { ITag } from '~/interfaces/tag/ITag';
import { IUser } from '~/interfaces/user/IUser';

export interface ITagRepository {
  get(tagId: ITag['id']): Promise<ITag>;
  getTagList(userId: IUser['id']): Promise<ITag[]>;
  create(tag: ITag): Promise<void>;
  update(tag: ITag): Promise<void>;
  delete(tagId: ITag['id']): Promise<void>;
}
