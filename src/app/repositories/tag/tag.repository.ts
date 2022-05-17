import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

import { ITag } from '~/interfaces/tag/ITag';
import { ITagRepository } from '~/interfaces/tag/ITagRepository';
import { IUser } from '~/interfaces/user/IUser';
import { tagConverter } from '~/libs/converter/tag.converter';

@Injectable({
  providedIn: 'root',
})
export class TagRepository implements ITagRepository {
  private tagDocRef: DocumentReference<ITag>;
  private tagColRef: CollectionReference<ITag>;

  constructor(private firestore: Firestore) {
    this.tagColRef = collection(this.firestore, 'tags').withConverter(tagConverter);
  }

  checkInactiveTag(userId: ITag['userId'], tagName: ITag['tagName']): Promise<ITag[]> {
    const tagDoc = query(
      this.tagColRef,
      where('userId', '==', userId),
      where('tagName', '==', tagName),
      where('isActive', '==', false),
    ).withConverter(tagConverter);
    return collectionData<ITag>(tagDoc).pipe(first()).toPromise(Promise);
  }

  // ユーザー定義のタグ情報を取得する
  getTagList(userId: IUser['id']): Promise<ITag[]> {
    const tagDoc = query(
      this.tagColRef,
      where('userId', '==', userId),
      where('isActive', '==', true),
    ).withConverter(tagConverter);
    return collectionData<ITag>(tagDoc).pipe(first()).toPromise(Promise);
  }

  // タグ情報を取得する
  get(tagId: ITag['id']): Promise<ITag> {
    const tagDoc = doc(this.firestore, `tags/${tagId}`).withConverter(tagConverter);
    return docData<ITag>(tagDoc).pipe(first()).toPromise(Promise);
  }

  // タグ情報を保存する
  async create(tagDto: ITag): Promise<ITag['id']> {
    const tagId = doc(this.tagColRef).id;
    const tagDocRef = doc(this.firestore, `tags/${tagId}`).withConverter(tagConverter);
    await setDoc(tagDocRef, { ...tagDto, id: tagId });
    return tagId;
  }

  // タグ情報を更新する
  async update(tagDto: ITag): Promise<ITag['id']> {
    const tagDocRef = doc(this.firestore, `tags/${tagDto.id}`).withConverter(tagConverter);
    await setDoc(tagDocRef, tagDto, { merge: true });
    return tagDto.id;
  }

  // タグ情報を削除する
  delete(tagId: ITag['id']): Promise<void> {
    const tagDoc = doc(this.firestore, `tags/${tagId}`).withConverter(tagConverter);
    return deleteDoc(tagDoc);
  }
}
