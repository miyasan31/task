import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  PartialWithFieldValue,
} from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

import type { ITag } from '~/interfaces/ITag';

/**
 * FirestoreのドキュメントとTagオブジェクトの型変換
 */
export const tagConverter: FirestoreDataConverter<ITag> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITag => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      tagName: data.tagName,
      color: data.color,
      isActive: data.isActive,
      userId: data.userId,
      createdAt: data.createdAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (tag: PartialWithFieldValue<ITag>): DocumentData => {
    return {
      tagName: tag.tagName,
      color: tag.color,
      isActive: tag.isActive,
      userId: tag.userId,
      createdAt: Timestamp.now(),
    };
  },
};
