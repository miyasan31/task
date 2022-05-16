import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';
import { ITask } from '~/interfaces/task/ITask';
import { ITimeline } from '~/interfaces/ITimeline';
import { IUser } from '~/interfaces/user/IUser';
import { taskConverter } from '~/libs/converter/task.converter';
import { userConverter } from '~/libs/converter/user.converter';

@Injectable({
  providedIn: 'root',
})
export class TimelineRepository {
  userDocRef: DocumentReference<IUser>;
  userColRef: CollectionReference<IUser>;
  taskDocRef: DocumentReference<ITask>;
  taskColRef: CollectionReference<ITask>;

  constructor(public firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users').withConverter(userConverter);
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
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
