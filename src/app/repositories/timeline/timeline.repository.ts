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
import { ITask } from '~/interfaces/ITask';
import { ITimeline } from '~/interfaces/ITimeline';
import { IUser } from '~/interfaces/IUser';

type UserDocRef = DocumentReference<IUser>;
type UserColRef = CollectionReference<IUser>;
type TaskDocRef = DocumentReference<ITask>;
type TaskColRef = CollectionReference<ITask>;

@Injectable({
  providedIn: 'root',
})
export class TimelineRepository {
  userDocRef: UserDocRef;
  userColRef: UserColRef;
  taskDocRef: TaskDocRef;
  taskColRef: TaskColRef;

  constructor(public firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users') as UserColRef;
    this.taskColRef = collection(this.firestore, 'tasks') as TaskColRef;
  }

  getTimelineInfo(): Observable<ITimeline[]> {
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
}
