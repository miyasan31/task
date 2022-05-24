import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  Firestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';

import { ILike } from '~/interfaces/like/ILike';
import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { IProfileRepository } from '~/interfaces/profile/IProfileRepository';
import { ITag } from '~/interfaces/tag/ITag';
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { likeConverter } from '~/libs/converter/like.converter';
import { tagConverter } from '~/libs/converter/tag.converter';
import { taskConverter } from '~/libs/converter/task.converter';
import { userConverter } from '~/libs/converter/user.converter';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository implements IProfileRepository {
  private userDocRef: DocumentReference<IUserRepository>;
  private userColRef: CollectionReference<IUserRepository>;
  private taskDocRef: DocumentReference<ITask>;
  private taskColRef: CollectionReference<ITask>;
  private likeDocRef: DocumentReference<ILike>;
  private likeColRef: CollectionReference<ILike>;
  private tagDocRef: DocumentReference<ITag>;
  private tagColRef: CollectionReference<ITag>;

  constructor(private firestore: Firestore) {
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
    this.tagColRef = collection(this.firestore, 'tags').withConverter(tagConverter);
  }

  getUserTaskListWithLike(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    try {
      const taskQuery = query(
        this.taskColRef,
        where('userId', '==', profileUserId),
        where('isDone', '==', true),
        orderBy('createdAt', 'desc'),
      );
      const taskDocList = collectionData(taskQuery);

      const tagQuery = query(
        this.tagColRef,
        where('userId', '==', profileUserId),
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
      throw new Error('サーバーエラーが発生しました');
    }
  }

  getUserLikedTaskList(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ILikedTaskCard[]> {
    try {
      const likeQuery = query(
        this.likeColRef,
        where('userId', '==', profileUserId),
        orderBy('createdAt', 'desc'),
      );
      const likeDocList = collectionData(likeQuery);

      const taskCardList = likeDocList.pipe(
        mergeMap(async (likeList) => {
          const userLikedTaskIdList = likeList.map((like) => like.taskId);

          const promise = userLikedTaskIdList.map(async (taskId, index) => {
            const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
            const task = await docData(taskDocRef).pipe(first()).toPromise(Promise);

            const isLikeQuery = query(
              this.likeColRef,
              where('userId', '==', currentUserId),
              where('taskId', '==', task.id),
            );
            const isLikeDocList = await collectionData(isLikeQuery)
              .pipe(first())
              .toPromise(Promise);

            const userDocRef = doc(this.firestore, `users/${task.userId}`).withConverter(
              userConverter,
            );
            const user = await docData(userDocRef).pipe(first()).toPromise(Promise);

            const tagDocRef = doc(this.firestore, `tags/${task.tagId}`).withConverter(tagConverter);
            const tag = await docData(tagDocRef).pipe(first()).toPromise(Promise);

            return { user, task, like: isLikeDocList[0], tag };
          });

          return await Promise.all(promise);
        }),
      );

      return taskCardList;
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  async getUserIsDoneTaskCount(profileUserId: IUser['id']): Promise<number> {
    try {
      const taskQuery = query(
        this.taskColRef,
        where('userId', '==', profileUserId),
        where('isDone', '==', true),
      );
      const taskList = await collectionData(taskQuery).pipe(first()).toPromise(Promise);
      return taskList.length;
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }

  async getUserLikeCount(profileUserId: IUser['id']): Promise<number> {
    try {
      const taskQuery = query(this.taskColRef, where('userId', '==', profileUserId));
      const taskDocList = await collectionData(taskQuery).pipe(first()).toPromise(Promise);

      if (taskDocList.length === 0) {
        return 0;
      }
      const taskIdList = taskDocList.map((task) => task.id);

      const likeQuery = query(this.likeColRef, where('taskId', 'in', taskIdList));
      const likeDocList = await collectionData(likeQuery).pipe(first()).toPromise(Promise);
      return likeDocList.length;
    } catch (error) {
      console.error(error.message);
      throw new Error('サーバーエラーが発生しました');
    }
  }
}
