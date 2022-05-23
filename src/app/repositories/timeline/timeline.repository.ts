import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
  endAt,
  Firestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { startAt } from '@firebase/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { ILike } from '~/interfaces/like/ILike';
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { ITimelineRepository } from '~/interfaces/timeline/ITimelineRepository';
import { IUser } from '~/interfaces/user/IUser';
import { likeConverter } from '~/libs/converter/like.converter';
import { taskConverter } from '~/libs/converter/task.converter';
import { userConverter } from '~/libs/converter/user.converter';
import { limitedTime } from '~/utils/limitedTime';

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
  async getTimelineUserTaskList(startDate: number, endDate: number): Promise<ITimeline[]> {
    try {
      const date = limitedTime(startDate, endDate);

      // TODO:昨日アクティブだったユーザーを取得する
      const userQuery = query(this.userColRef);
      const userList = await collectionData(userQuery).pipe(take(1)).toPromise(Promise);

      const timelineUserIdList = userList.map((user) => user.id);

      const taskQuery = query(
        this.taskColRef,
        where('userId', 'in', timelineUserIdList),
        where('isDone', '==', true),
        orderBy('createdAt', 'desc'),
        startAt(date.startTimestamp),
        endAt(date.endTimestamp),
      );
      const taskList = await collectionData(taskQuery).pipe(take(1)).toPromise(Promise);

      const timelineList = userList.reduce((current, prev) => {
        const userTaskList = taskList.filter((task) => task && task.userId === prev.id);
        return userTaskList.length > 0 ? [...current, { user: prev, task: userTaskList }] : current;
      }, []);

      return timelineList;
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  // --- MEMO:Observable用 ---
  // getTimelineUserTaskList(agoDate: number): Observable<ITimeline[]> {
  //   try {
  //     const date = limitedTime(agoDate);

  //     // TODO:昨日アクティブだったユーザーを取得する
  //     const userQuery = query(this.userColRef);

  //     const userDocList = collectionData(userQuery);

  //     const timelineList = userDocList.pipe(
  //       mergeMap((userList) => {
  //         const userIdList = userList.map((user) => user.id);

  //         const taskQuery = query(
  //           this.taskColRef,
  //           where('userId', 'in', userIdList),
  //           where('isDone', '==', true),
  //           orderBy('createdAt', 'desc'),
  //           startAt(date.startTimestamp),
  //           endAt(date.endTimestamp),
  //         );

  //         return combineLatest([of(userList), collectionData(taskQuery)]);
  //       }),
  //       map(([userList, taskList]) =>
  //         userList.reduce((current, prev) => {
  //           const userTaskList = taskList.filter((task) => task && task.userId === prev.id);
  //           return userTaskList.length > 0
  //             ? [...current, { user: prev, task: userTaskList }]
  //             : current;
  //         }, []),
  //       ),
  //     );

  //     return timelineList;
  //   } catch (error) {
  //     console.error(error.message);
  //     throw new Error('サーバーエラーが発生しました');
  //   }
  // }

  getTimelineDetailTaskListWithLike(
    taskUserId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    try {
      const date = limitedTime();

      const taskQuery = query(
        this.taskColRef,
        where('userId', '==', taskUserId),
        where('isDone', '==', true),
        orderBy('createdAt', 'desc'),
        startAt(date.startTimestamp),
        endAt(date.endTimestamp),
      );
      const taskDocList = collectionData(taskQuery);

      const taskCardList = taskDocList.pipe(
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
        map(([taskList, likeList]) =>
          taskList.map((task) => {
            const isLike = likeList.filter((like) => like && like.taskId === task.id)[0];
            return { task, like: isLike };
          }),
        ),
      );

      return taskCardList;
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }
}
