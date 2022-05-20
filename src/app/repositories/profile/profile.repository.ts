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
import { ITask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { IUserRepository } from '~/interfaces/user/IUserRepository';
import { likeConverter } from '~/libs/converter/like.converter';
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

  constructor(private firestore: Firestore) {
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
  }

  getUserTaskListWithLike(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCard[]> {
    const taskQuery = query(
      this.taskColRef,
      where('userId', '==', profileUserId),
      where('isDone', '==', true),
      orderBy('createdAt', 'desc'),
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
  }

  getUserLikedTaskList(
    profileUserId: IUser['id'],
    currentUserId: IUser['id'],
  ): Observable<ILikedTaskCard[]> {
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
          const isLikeDocList = await collectionData(isLikeQuery).pipe(first()).toPromise(Promise);
          const userDocRef = doc(this.firestore, `users/${task.userId}`).withConverter(
            userConverter,
          );
          const user = await docData(userDocRef).pipe(first()).toPromise(Promise);
          return { user, task, like: isLikeDocList[0] };
        });

        return await Promise.all(promise);
      }),
    );

    return taskCardList;
  }
}
