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
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

import { ILike } from '~/interfaces/like/ILike';
import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { IProfileRepository } from '~/interfaces/profile/IProfileRepository';
import { ITask } from '~/interfaces/task/ITask';
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

  getMyLikedTaskList(currentUserId: IUser['id']): Observable<ILikedTaskCard[]> {
    // TODO:当日のタスクのみ取得する
    const likeQuery = query(
      this.likeColRef,
      where('userId', '==', currentUserId),
      orderBy('createdAt', 'desc'),
    );
    const likeList = collectionData(likeQuery);

    const taskCardList = likeList.pipe(
      mergeMap(async (likeList) => {
        const userLikedTaskIdList = likeList.map((like) => like.taskId);

        const promise = userLikedTaskIdList.map(async (taskId, index) => {
          const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
          const task = await docData(taskDocRef).pipe(first()).toPromise(Promise);
          const userDocRef = doc(this.firestore, `users/${task.userId}`).withConverter(
            userConverter,
          );
          const user = await docData(userDocRef).pipe(first()).toPromise(Promise);
          return { user, task, like: likeList[index] };
        });

        return await Promise.all(promise);
      }),
    );

    return taskCardList;
  }
}

// getTaskListWithLike(
//   userId: ITask['userId'],
//   currentUserId: IUser['id'],
// ): Observable<ITaskCard[]> {
//   // TODO:当日のタスクのみ取得する
//   const taskQuery = query(this.taskColRef, where('userId', '==', userId));
//   return collectionData(taskQuery).pipe(
//     concatMap(async (taskList) => {
//       const taskUserIdList = taskList.map((task) => task.id);
//       const likeQuery = query(
//         this.likeColRef,
//         where('userId', '==', currentUserId),
//         where('taskId', 'in', taskUserIdList),
//       );
//       const isLikeList = await collectionData(likeQuery).pipe(first()).toPromise(Promise);

//       return taskList.map((task) => {
//         const like = isLikeList.filter((l) => l.taskId === task.id);
//         return { task, like };
//       });
//     }),
//   );
// }
