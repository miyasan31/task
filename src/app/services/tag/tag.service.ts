import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITag } from '~/interfaces/tag/ITag';
import { ITagRepository } from '~/interfaces/tag/ITagRepository';
import { IUser } from '~/interfaces/user/IUser';
import { TagRepository } from '~/repositories/tag/tag.repository';

@Injectable({
  providedIn: 'root',
})
export class TagService implements ITagRepository {
  constructor(private tagRepository: TagRepository) {}

  checkInactiveTag(userId: ITag['userId'], tagName: ITag['tagName']): Promise<ITag[]> {
    return this.tagRepository.checkInactiveTag(userId, tagName);
  }

  getTagList(userId: IUser['id']): Observable<ITag[]> {
    return this.tagRepository.getTagList(userId);
  }

  get(tagId: ITag['id']): Promise<ITag> {
    return this.tagRepository.get(tagId);
  }

  async create(tag: ITag): Promise<ITag['id']> {
    const checkTagList = await this.checkInactiveTag(tag.userId, tag.tagName);

    // 非アクティブな同じタグ名のデータが存在しなければ新規作成
    if (!checkTagList.length) {
      return this.tagRepository.create(tag);
    }

    // 非アクティブな同じタグ名のデータが存在すればアクティブ状態に変更
    const activedTag = {
      ...checkTagList[0],
      isActive: true,
    };
    return this.tagRepository.update(activedTag);
  }

  update(tag: ITag): Promise<ITag['id']> {
    return this.tagRepository.update(tag);
  }

  delete(tagId: ITag['id']): Promise<void> {
    return this.tagRepository.delete(tagId);
  }
}
