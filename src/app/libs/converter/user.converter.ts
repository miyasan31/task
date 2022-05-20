import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
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
      profile: data.profile,
      email: data.email,
      avatar: data.avatar,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (user: PartialWithFieldValue<IUser>): DocumentData => ({
    userName: user.userName,
    email: user.email,
    profile: user.profile,
    avatar: user.avatar,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }),
};

/**
 * FirestoreのドキュメントとUserオブジェクトの型変換
 */
export const updateUserConverter: FirestoreDataConverter<IUser> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IUser => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      userName: data.userName,
      email: data.email,
      profile: data.profile,
      avatar: data.avatar,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (user: PartialWithFieldValue<IUser>): DocumentData => ({
    userName: user.userName,
    email: user.email,
    profile: user.profile,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: serverTimestamp(),
  }),
};
