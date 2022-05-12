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

import { IUser } from '~/interfaces/IUser';

type UserDocRef = DocumentReference<IUser>;
type UserColRef = CollectionReference<IUser>;

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  userDocRef: UserDocRef;
  userColRef: UserColRef;

  constructor(public firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users') as UserColRef;
  }

  // ユーザー情報を取得する
  getUser(uerId: IUser['id']): Promise<IUser> {
    const userDoc = doc(this.firestore, `users/${uerId}`) as UserDocRef;
    return docData<IUser>(userDoc).pipe(first()).toPromise(Promise);
  }

  // ユーザー情報を保存する
  createUser(userDto: IUser): Promise<void> {
    return setDoc(this.userDocRef, userDto);
  }

  // ユーザー情報を更新する
  updateUser(userDto: IUser): Promise<void> {
    return setDoc(this.userDocRef, userDto, { merge: true });
  }

  // ユーザー情報を削除する
  deleteUser(userId: IUser['id']): Promise<void> {
    const userDoc = doc(this.firestore, `users/${userId}`) as UserDocRef;
    return deleteDoc(userDoc);
  }
}
