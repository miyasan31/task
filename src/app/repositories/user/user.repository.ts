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

type UserDocument = DocumentReference<IUser>;
type UserCollection = CollectionReference<IUser>;

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  userDoc: UserDocument;
  userCol: UserCollection;

  constructor(public firestore: Firestore) {
    this.userDoc = doc(this.firestore, 'users') as UserDocument;
    this.userCol = collection(this.firestore, 'users') as UserCollection;
  }

  // ユーザー情報を取得する
  getUser(uerId: IUser['id']): Promise<IUser> {
    const userDoc = doc(this.firestore, `users/${uerId}`) as UserDocument;
    return docData<IUser>(userDoc).pipe(first()).toPromise(Promise);
  }

  // ユーザー情報を保存する
  createUser(userDto: IUser): Promise<void> {
    return setDoc(this.userDoc, userDto);
  }

  // ユーザー情報を更新する
  updateUser(userDto: IUser): Promise<void> {
    return setDoc(this.userDoc, userDto, { merge: true });
  }

  // ユーザー情報を削除する
  deleteUser(userId: IUser['id']): Promise<void> {
    const userDoc = doc(this.firestore, `users/${userId}`) as UserDocument;
    return deleteDoc(userDoc);
  }
}
