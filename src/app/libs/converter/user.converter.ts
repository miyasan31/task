import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';

import type { IUser } from '~/interfaces/user/IUser';

/**
 * FirestoreのドキュメントとUserオブジェクトの型変換
 */
export const userConverter: FirestoreDataConverter<IUser> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IUser => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      userName: data.userName,
      email: data.email,
      avatar: data.avatar,
      createdAt: data.createdAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (user: PartialWithFieldValue<IUser>): DocumentData => ({
    userName: user.userName,
    email: user.email,
    avatar: user.avatar,
    createdAt: serverTimestamp(),
  }),
};
