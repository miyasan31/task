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

import { ILike } from '~/interfaces/ILike';

type LikeDocRef = DocumentReference<ILike>;
type LikeColRef = CollectionReference<ILike>;

@Injectable({
  providedIn: 'root',
})
export class LikeRepository {
  likeDocRef: LikeDocRef;
  likeColRef: LikeColRef;

  constructor(public firestore: Firestore) {
    this.likeColRef = collection(this.firestore, 'likes') as LikeColRef;
  }

  // いいね情報を取得する
  getLike(likeId: ILike['id']): Promise<ILike> {
    const likeDoc = doc(this.firestore, `likes/${likeId}`) as LikeDocRef;
    return docData<ILike>(likeDoc).pipe(first()).toPromise(Promise);
  }

  // いいね情報を保存する
  createLike(likeDto: ILike): Promise<void> {
    return setDoc(this.likeDocRef, likeDto);
  }

  // いいね情報を更新する
  updateLike(likeDto: ILike): Promise<void> {
    return setDoc(this.likeDocRef, likeDto, { merge: true });
  }

  // いいね情報を削除する
  deleteLike(likeId: ILike['id']): Promise<void> {
    const likeDoc = doc(this.firestore, `likes/${likeId}`) as LikeDocRef;
    return deleteDoc(likeDoc);
  }
}
