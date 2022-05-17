import { Injectable } from '@angular/core';

import { ITag } from '~/interfaces/tag/ITag';
import { ITagRepository } from '~/interfaces/tag/ITagRepository';
import { IUser } from '~/interfaces/user/IUser';
import { TagRepository } from '~/repositories/tag/tag.repository';

@Injectable({
  providedIn: 'root',
})
export class TagService implements ITagRepository {
  constructor(private tagRepository: TagRepository) {}

  getTagList(userId: IUser['id']): Promise<ITag[]> {
    return this.tagRepository.getTagList(userId);
  }

  get(tagId: ITag['id']): Promise<ITag> {
    return this.tagRepository.get(tagId);
  }

  create(tag: ITag): Promise<ITag['id']> {
    return this.tagRepository.create(tag);
  }

  update(tag: ITag): Promise<void> {
    return this.tagRepository.update(tag);
  }

  delete(tagId: ITag['id']): Promise<void> {
    return this.tagRepository.delete(tagId);
  }
}
