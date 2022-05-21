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

import { ICreateLike, ILike } from '~/interfaces/like/ILike';
import { ILikeRepository } from '~/interfaces/like/ILikeRepository';
import { likeConverter } from '~/libs/converter/like.converter';

@Injectable({
  providedIn: 'root',
})
export class LikeRepository implements ILikeRepository {
  private likeDocRef: DocumentReference<ILike>;
  private likeColRef: CollectionReference<ILike>;

  constructor(private firestore: Firestore) {
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
  }

  get(likeId: ILike['id']): Promise<ILike> {
    try {
      const likeDocRef = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
      return docData<ILike>(likeDocRef).pipe(first()).toPromise(Promise);
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  // いいね情報を保存する
  create(like: ICreateLike): Promise<void> {
    try {
      const likeId = doc(this.likeColRef).id;
      const likeDocRef = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
      return setDoc(likeDocRef, { ...like, id: likeId });
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  // いいね情報を削除する
  delete(likeId: ILike['id']): Promise<void> {
    try {
      const likeDoc = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
      return deleteDoc(likeDoc);
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }
}
