import { Observable } from 'rxjs';
import type { ITag } from '~/interfaces/tag/ITag';
import { IUser } from '~/interfaces/user/IUser';

export interface ITagRepository {
  get(tagId: ITag['id']): Promise<ITag>;
  getTagList(userId: IUser['id']): Observable<ITag[]>;
  checkInactiveTag(userId: ITag['userId'], tagName: ITag['tagName']): Promise<ITag[]>;
  create(tag: ITag): Promise<ITag['id']>;
  update(tag: ITag): Promise<ITag['id']>;
  delete(tagId: ITag['id']): Promise<void>;
}
