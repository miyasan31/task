import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

import type { ILike } from '~/interfaces/like/ILike';

/**
 * FirestoreのドキュメントとTaskオブジェクトの型変換
 */
export const likeConverter: FirestoreDataConverter<ILike> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ILike => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      userId: data.userId,
      taskId: data.taskId,
      createdAt: data.createdAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (like: PartialWithFieldValue<ILike>): DocumentData => ({
    userId: like.userId,
    taskId: like.taskId,
    createdAt: serverTimestamp(),
  }),
};
