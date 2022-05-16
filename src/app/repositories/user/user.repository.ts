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
import { userConverter } from '~/libs/converter/user.converter';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  userDocRef: DocumentReference<IUser>;
  userColRef: CollectionReference<IUser>;

  constructor(public firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users').withConverter(userConverter);
  }

  // ユーザー情報を取得する
  getUser(uerId: IUser['id']): Promise<IUser> {
    const userDocRef = doc(this.firestore, `users/${uerId}`).withConverter(userConverter);
    return docData<IUser>(userDocRef).pipe(first()).toPromise(Promise);
  }

  // ユーザー情報を保存する
  createUser(userDto: IUser): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userDto.id}`).withConverter(userConverter);
    return setDoc(userDocRef, userDto);
  }

  // ユーザー情報を更新する
  updateUser(userDto: IUser): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userDto.id}`).withConverter(userConverter);
    return setDoc(userDocRef, userDto, { merge: true });
  }

  // ユーザー情報を削除する
  deleteUser(userId: IUser['id']): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
    return deleteDoc(userDocRef);
  }
}
