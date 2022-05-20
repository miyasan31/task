import { ITag } from '~/interfaces/tag/ITag';

export class TagPipe implements ITag {
  id: ITag['id'];
  tagName: ITag['tagName'];
  color: ITag['color'];
  isActive: ITag['isActive'];
  userId: ITag['userId'];
  createdAt?: ITag['createdAt'];

  constructor() {}

  create(tag: ITag): ITag {
    // TODO:バリデーション追加
    return tag;
  }
}
