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
import { ILike } from '~/interfaces/ILike';

import { ITask } from '~/interfaces/ITask';
import { ITaskWithLike } from '~/interfaces/ITaskWithLike';
import { IUser } from '~/interfaces/IUser';

type TaskDocRef = DocumentReference<ITask>;
type TaskColRef = CollectionReference<ITask>;
type LikeDocRef = DocumentReference<ILike>;
type LikeColRef = CollectionReference<ILike>;

@Injectable({
  providedIn: 'root',
})
export class TaskRepository {
  taskDocRef: TaskDocRef;
  taskColRef: TaskColRef;
  likeDocRef: LikeDocRef;
  likeColRef: LikeColRef;

  constructor(public firestore: Firestore) {
    this.taskColRef = collection(this.firestore, 'tasks') as TaskColRef;
    this.likeColRef = collection(this.firestore, 'likes') as LikeColRef;
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
  ): Observable<ITaskWithLike[]> {
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
  getTask(taskId: ITask['id']): Promise<ITask> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`) as TaskDocRef;
    return docData<ITask>(taskDocRef).pipe(first()).toPromise(Promise);
  }

  // タスク情報を保存する
  createTask(taskDto: ITask): Promise<void> {
    const taskId = doc(this.taskColRef).id;
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`) as TaskDocRef;
    return setDoc(taskDocRef, { ...taskDto, id: taskId });
  }

  // タスク情報を更新する
  updateTask(taskDto: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskDto.id}`) as TaskDocRef;
    return setDoc(taskDocRef, taskDto, { merge: true });
  }

  // タスク情報を削除する
  deleteTask(taskId: ITask['id']): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`) as TaskDocRef;
    return deleteDoc(taskDocRef);
  }
}
