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
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map, mergeMap } from 'rxjs/operators';

import { IUser } from '~/interfaces/user/IUser';
import { ILike } from '~/interfaces/like/ILike';
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { ITimelineRepository } from '~/interfaces/timeline/ITimelineRepository';
import { likeConverter } from '~/libs/converter/like.converter';
import { taskConverter } from '~/libs/converter/task.converter';
import { userConverter } from '~/libs/converter/user.converter';

@Injectable({
  providedIn: 'root',
})
export class TimelineRepository implements ITimelineRepository {
  private userDocRef: DocumentReference<IUser>;
  private userColRef: CollectionReference<IUser>;
  private taskDocRef: DocumentReference<ITask>;
  private taskColRef: CollectionReference<ITask>;
  private likeDocRef: DocumentReference<ILike>;
  private likeColRef: CollectionReference<ILike>;

  constructor(private firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users').withConverter(userConverter);
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
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

  getTaskListWithLike(
    userId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    // TODO:当日のタスクのみ取得する
    const taskQuery = query(this.taskColRef, where('userId', '==', userId));
    const taskList = collectionData(taskQuery);

    const taskCardList = taskList.pipe(
      mergeMap((taskList) => {
        const taskUserIdList = taskList.map((task) => task.id);

        return combineLatest([
          of(taskList),
          combineLatest(
            taskUserIdList.map((taskId) => {
              const likeQuery = query(
                this.likeColRef,
                where('userId', '==', currentUserId),
                where('taskId', '==', taskId),
              );

              return collectionData(likeQuery).pipe(map((like) => like[0]));
            }),
          ),
        ]);
      }),
      map(([taskList, likeList]) => {
        return taskList.map((task) => {
          const isLike = likeList.filter((like) => like && like.taskId === task.id);
          return { task, like: isLike };
        });
      }),
    );

    return taskCardList;
  }
}
