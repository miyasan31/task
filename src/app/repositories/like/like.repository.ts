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

import { ILike } from '~/interfaces/like/ILike';
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

  // いいね情報を保存する
  create(likeDto: ILike): Promise<void> {
    const likeId = doc(this.likeColRef).id;
    const likeDocRef = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
    return setDoc(likeDocRef, { ...likeDto, id: likeId });
  }

  // いいね情報を削除する
  delete(likeId: ILike['id']): Promise<void> {
    const likeDoc = doc(this.firestore, `likes/${likeId}`).withConverter(likeConverter);
    return deleteDoc(likeDoc);
  }
}
