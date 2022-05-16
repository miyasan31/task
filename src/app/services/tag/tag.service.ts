import { Injectable } from '@angular/core';

import { ITag } from '~/interfaces/tag/ITag';
import { ITagRepository } from '~/interfaces/tag/ITagRepository';
import { IUser } from '~/interfaces/user/IUser';
import { TagRepository } from '~/repositories/tag/tag.repository';

@Injectable({
  providedIn: 'root',
})
export class TagService implements ITagRepository {
  constructor(public tagRepository: TagRepository) {}

  getTagList(userId: IUser['id']) {
    return this.tagRepository.getTagList(userId);
  }

  get(tagId: ITag['id']) {
    return this.tagRepository.get(tagId);
  }

  create(tag: ITag) {
    return this.tagRepository.create(tag);
  }

  update(tag: ITag) {
    return this.tagRepository.update(tag);
  }

  delete(tagId: ITag['id']) {
    return this.tagRepository.delete(tagId);
  }
}
