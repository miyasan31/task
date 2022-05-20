import { Injectable } from '@angular/core';

import { ICreateTag, ITag } from '~/interfaces/tag/ITag';

@Injectable({
  providedIn: 'root',
})
export class TagPipe implements ITag {
  id: ITag['id'];
  tagName: ITag['tagName'];
  color: ITag['color'];
  isActive: ITag['isActive'];
  userId: ITag['userId'];
  createdAt?: ITag['createdAt'];

  constructor() {}

  create(tag: ICreateTag): ITag {
    // TODO:バリデーション追加
    return {
      ...tag,
      id: '',
      isActive: true,
    };
  }
}
