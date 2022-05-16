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
import { first, concatMap } from 'rxjs/operators';
import { ILike } from '~/interfaces/like/ILike';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskCart } from '~/interfaces/task/ITaskCart';
import { ITaskRepository } from '~/interfaces/task/ITaskRepository';
import { IUser } from '~/interfaces/user/IUser';
import { likeConverter } from '~/libs/converter/like.converter';
import { taskConverter } from '~/libs/converter/task.converter';

@Injectable({
  providedIn: 'root',
})
export class TaskRepository implements ITaskRepository {
  private taskDocRef: DocumentReference<ITask>;
  private taskColRef: CollectionReference<ITask>;
  private likeDocRef: DocumentReference<ILike>;
  private likeColRef: CollectionReference<ILike>;

  constructor(private firestore: Firestore) {
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
    this.likeColRef = collection(this.firestore, 'likes').withConverter(likeConverter);
  }

  getTaskList(userId: ITask['userId']): Observable<ITask[]> {
    // TODO:当日のタスクのみ取得する
    const taskQuery = query(this.taskColRef, where('userId', '==', userId));
    return collectionData<ITask>(taskQuery);
  }

  // タスク情報を取得する
  getTaskListWithLike(
    userId: ITask['userId'],
    currentUserId: IUser['id'],
  ): Observable<ITaskCart[]> {
    // TODO:当日のタスクのみ取得する
    const taskQuery = query(this.taskColRef, where('userId', '==', userId));
    return collectionData(taskQuery).pipe(
      concatMap(async (taskList) => {
        const taskUserIdList = taskList.map((task) => task.id);
        const likeQuery = query(
          this.likeColRef,
          where('userId', '==', currentUserId),
          where('taskId', 'in', taskUserIdList),
        );
        const isLikeList = await collectionData(likeQuery).pipe(first()).toPromise(Promise);

        return taskList.map((task) => {
          const like = isLikeList.filter((l) => l.taskId === task.id);
          return { task, like };
        });
      }),
    );
  }

  // タスク情報を取得する
  get(taskId: ITask['id']): Promise<ITask> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
    return docData<ITask>(taskDocRef).pipe(first()).toPromise(Promise);
  }

  // タスク情報を保存する
  create(taskDto: ITask): Promise<void> {
    const taskId = doc(this.taskColRef).id;
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
    return setDoc(taskDocRef, { ...taskDto, id: taskId });
  }

  // タスク情報を更新する
  update(taskDto: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskDto.id}`).withConverter(taskConverter);
    return setDoc(taskDocRef, taskDto, { merge: true });
  }

  // タスク情報を削除する
  delete(taskId: ITask['id']): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
    return deleteDoc(taskDocRef);
  }
}
