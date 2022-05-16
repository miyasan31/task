import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';
import { ITask } from '~/interfaces/task/ITask';
import { ITimeline } from '~/interfaces/user/ITimeline';

import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { taskConverter } from '~/libs/converter/task.converter';
import { userConverter } from '~/libs/converter/user.converter';

@Injectable({
  providedIn: 'root',
})
export class UserRepository implements IUserRepository {
  private userDocRef: DocumentReference<IUser>;
  private userColRef: CollectionReference<IUser>;
  private taskDocRef: DocumentReference<ITask>;
  private taskColRef: CollectionReference<ITask>;

  constructor(private firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users').withConverter(userConverter);
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
  }

  // ユーザーに作成したタスクを紐づけて取得
  getUserTaskList(): Observable<ITimeline[]> {
    const userQuery = query(this.userColRef);
    return collectionData(userQuery).pipe(
      concatMap(async (userList) => {
        const userIdList = userList.map((user) => user.id);
        const taskQuery = query(this.taskColRef, where('userId', 'in', userIdList));
        const taskList = await collectionData(taskQuery).pipe(first()).toPromise(Promise);
        return userList
          .map((user) => {
            const task = taskList.filter((t) => t.userId === user.id);
            return { user, task };
          })
          .filter((data) => data.task.length);
      }),
    );
  }

  // ユーザー情報を取得する
  get(uerId: IUser['id']): Promise<IUser> {
    const userDocRef = doc(this.firestore, `users/${uerId}`).withConverter(userConverter);
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
