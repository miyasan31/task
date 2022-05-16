import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

import { ILike } from '~/interfaces/ILike';
import { likeConverter } from '~/libs/converter/like.converter';

@Injectable({
  providedIn: 'root',
})
export class LikeRepository {
  likeDocRef: DocumentReference<ILike>;
  likeColRef: CollectionReference<ILike>;

  constructor(public firestore: Firestore) {
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
  }

  // いいね情報を保存する
  createLike(likeDto: ILike): Promise<void> {
    const likeId = doc(this.likeColRef).id;
    const likeDocRef = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
    return setDoc(likeDocRef, { ...likeDto, id: likeId });
  }

  // いいね情報を削除する
  deleteLike(likeId: ILike['id']): Promise<void> {
    const likeDoc = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
    return deleteDoc(likeDoc);
  }
}
