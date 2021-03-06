import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  endAt,
  Firestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { startAt } from '@firebase/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, mergeMap, take } from 'rxjs/operators';

import { ILike } from '~/interfaces/like/ILike';
import { ITag } from '~/interfaces/tag/ITag';
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { ITiedTagTask } from '~/interfaces/timeline/ITiedTagTask';
import { ITimeline } from '~/interfaces/timeline/ITimeline';
import { ITimelineRepository } from '~/interfaces/timeline/ITimelineRepository';
import { IUser } from '~/interfaces/user/IUser';
import { likeConverter } from '~/libs/converter/like.converter';
import { tagConverter } from '~/libs/converter/tag.converter';
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
  private tagDocRef: DocumentReference<ITag>;
  private tagColRef: CollectionReference<ITag>;

  constructor(private firestore: Firestore) {
    this.userColRef = collection(this.firestore, 'users').withConverter(userConverter);
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
    this.tagColRef = collection(this.firestore, 'tags').withConverter(tagConverter);
  }

  // ?????????????????????????????????????????????????????????
  async getTimelineUserTaskList(startDate: number, endDate: number): Promise<ITimeline[]> {
    try {
      const date = limitedTime(startDate, endDate);

      const taskQuery = query(
        this.taskColRef,
        where('isDone', '==', true),
        orderBy('updatedAt', 'desc'),
        startAt(date.startTimestamp),
        endAt(date.endTimestamp),
      );

      const taskList = await collectionData(taskQuery).pipe(first()).toPromise(Promise);

      const taskUserIdList = taskList.reduce<string[]>((all, prev) => {
        if (!all.includes(prev.userId)) {
          return [...all, prev.userId];
        }
        return all;
      }, []);

      const userPromise = taskUserIdList.map(async (userId) => {
        const userQuery = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
        return await docData(userQuery).pipe(first()).toPromise(Promise);
      });

      const promiseAllUserList = await Promise.all(userPromise);
      const userList = promiseAllUserList.reduce((all, current) => [...all, current], []);

      const timelineList = userList.reduce((current, prev) => {
        const userTaskList = taskList.filter((task) => task && task.userId === prev.id);
        return [...current, { user: prev, task: userTaskList }];
      }, []);

      return timelineList;
    } catch (error) {
      console.error(error.message);
      throw new Error('??????????????????????????????????????????');
    }
  }

  // --- MEMO:Observable??? ---
  // getTimelineUserTaskList(agoDate: number): Observable<ITimeline[]> {
  //   try {
  //     const date = limitedTime(agoDate);

  //     // TODO:?????????????????????????????????????????????????????????
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
  //     throw new Error('??????????????????????????????????????????');
  //   }
  // }

  getTimelineDetailTaskListWithLike(
    taskUserId: ITask['userId'],
    currentUserId: IUser['id'],
    startDate: number,
    endDate: number,
  ): Observable<ITaskCard[]> {
    try {
      const date = limitedTime(startDate, endDate);

      const taskQuery = query(
        this.taskColRef,
        where('userId', '==', taskUserId),
        where('isDone', '==', true),
        orderBy('updatedAt', 'desc'),
        startAt(date.startTimestamp),
        endAt(date.endTimestamp),
      );
      const taskDocList = collectionData(taskQuery);

      const tagQuery = query(
        this.tagColRef,
        where('userId', '==', taskUserId),
        where('isActive', '==', true),
      );
      const userTagList = collectionData(tagQuery);

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
            userTagList,
          ]);
        }),
        map(([taskList, likeList, tagList]) =>
          taskList.map((task) => {
            const isLike = likeList.filter((like) => like && like.taskId === task.id)[0];
            const isTag = tagList.filter((tag) => tag && tag.id === task.tagId)[0];
            return { task, like: isLike, tag: isTag };
          }),
        ),
      );

      return taskCardList;
    } catch (error) {
      console.error(error.message);
      throw new Error('??????????????????????????????????????????');
    }
  }

  getTiedTagTaskList(
    tagId: ITask['tagId'],
    currentUserId: IUser['id'],
  ): Observable<ITiedTagTask[]> {
    const taskQuery = query(
      this.taskColRef,
      where('tagId', '==', tagId),
      where('isDone', '==', true),
      orderBy('updatedAt', 'desc'),
    );
    const taskTiedTaskList = collectionData(taskQuery);

    const taskCardList = taskTiedTaskList.pipe(
      mergeMap((taskList) => {
        const taskIdList = taskList.map((task) => task.id);

        return combineLatest([
          of(taskList),
          combineLatest(
            taskIdList.map((taskId) => {
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
  }
}
