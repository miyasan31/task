import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

import { ITag } from '~/interfaces/ITag';

type TagDocRef = DocumentReference<ITag>;
type TagColRef = CollectionReference<ITag>;

@Injectable({
  providedIn: 'root',
})
export class TagRepository {
  tagDocRef: TagDocRef;
  tagColRef: TagColRef;

  constructor(public firestore: Firestore) {
    this.tagColRef = collection(this.firestore, 'tags') as TagColRef;
  }

  // タグ情報を取得する
  getTag(tagId: ITag['id']): Promise<ITag> {
    const tagDoc = doc(this.firestore, `tags/${tagId}`) as TagDocRef;
    return docData<ITag>(tagDoc).pipe(first()).toPromise(Promise);
  }

  // タグ情報を保存する
  createTag(tagDto: ITag): Promise<void> {
    return setDoc(this.tagDocRef, tagDto);
  }

  // タグ情報を更新する
  updateTag(tagDto: ITag): Promise<void> {
    return setDoc(this.tagDocRef, tagDto, { merge: true });
  }

  // タグ情報を削除する
  deleteTag(tagId: ITag['id']): Promise<void> {
    const tagDoc = doc(this.firestore, `tags/${tagId}`) as TagDocRef;
    return deleteDoc(tagDoc);
  }
}
