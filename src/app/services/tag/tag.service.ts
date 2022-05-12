import { Injectable } from '@angular/core';

import { ITag } from '~/interfaces/ITag';
import { TagRepository } from '~/repositories/tag/tag.repository';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(public tagRepository: TagRepository) {}

  getTag(tagId: ITag['id']): Promise<ITag> {
    return this.tagRepository.getTag(tagId);
  }

  createTag(tag: ITag): Promise<void> {
    return this.tagRepository.createTag(tag);
  }

  updateTag(tag: ITag): Promise<void> {
    return this.tagRepository.updateTag(tag);
  }

  deleteTag(tagId: ITag['id']): Promise<void> {
    return this.tagRepository.deleteTag(tagId);
  }
}
