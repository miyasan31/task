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
  tagDocRef: DocumentReference<ITag>;
  tagColRef: CollectionReference<ITag>;

  constructor(public firestore: Firestore) {
    this.tagColRef = collection(this.firestore, 'tags').withConverter(tagConverter);
  }

  // ユーザー定義のタグ情報を取得する
  getTagList(userId: IUser['id']) {
    const tagDoc = query(this.tagColRef, where('userId', '==', userId)).withConverter(tagConverter);
    return collectionData<ITag>(tagDoc).pipe(first()).toPromise(Promise);
  }

  // タグ情報を取得する
  get(tagId: ITag['id']) {
    const tagDoc = doc(this.firestore, `tags/${tagId}`).withConverter(tagConverter);
    return docData<ITag>(tagDoc).pipe(first()).toPromise(Promise);
  }

  // タグ情報を保存する
  create(tagDto: ITag) {
    return setDoc(this.tagDocRef, tagDto);
  }

  // タグ情報を更新する
  update(tagDto: ITag) {
    return setDoc(this.tagDocRef, tagDto, { merge: true });
  }

  // タグ情報を削除する
  delete(tagId: ITag['id']) {
    const tagDoc = doc(this.firestore, `tags/${tagId}`).withConverter(tagConverter);
    return deleteDoc(tagDoc);
  }
}
