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

import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { updateUserConverter, userConverter } from '~/libs/converter/user.converter';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements IUserRepository {
  private userDocRef: DocumentReference<IUser>;
  private userColRef: CollectionReference<IUser>;

  constructor(private firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users').withConverter(userConverter);
  }

  // ユーザー情報を取得する
  get(userId: IUser['id']): Promise<IUser> {
    try {
      const userDocRef = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
      return docData<IUser>(userDocRef).pipe(first()).toPromise(Promise);
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  // ユーザー情報を保存する
  create(user: IUser): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${user.id}`).withConverter(userConverter);
      return setDoc(userDocRef, user);
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  // ユーザー情報を更新する
  update(user: IUser): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${user.id}`).withConverter(updateUserConverter);
      return setDoc(userDocRef, user, { merge: true });
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  // ユーザー情報を削除する
  delete(userId: IUser['id']): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
      return deleteDoc(userDocRef);
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }
}
