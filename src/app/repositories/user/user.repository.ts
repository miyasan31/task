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
import { userConverter } from '~/libs/converter/user.converter';

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
    const userDocRef = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
    return docData<IUser>(userDocRef).pipe(first()).toPromise(Promise);
  }

  // ユーザー情報を保存する
  create(userDto: IUser): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userDto.id}`).withConverter(userConverter);
    return setDoc(userDocRef, userDto);
  }

  // ユーザー情報を更新する
  update(userDto: IUser): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userDto.id}`).withConverter(userConverter);
    return setDoc(userDocRef, userDto, { merge: true });
  }

  // ユーザー情報を削除する
  delete(userId: IUser['id']): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
    return deleteDoc(userDocRef);
  }
}
