import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  endAt,
  Firestore,
  query,
  setDoc,
  startAt,
  where,
} from '@angular/fire/firestore';
import { orderBy } from '@firebase/firestore';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ITask } from '~/interfaces/task/ITask';
import { ITaskRepository } from '~/interfaces/task/ITaskRepository';
import { taskConverter, updateTaskConverter } from '~/libs/converter/task.converter';
import { limitedTime } from '~/utils/limitedTime';

@Injectable({
  providedIn: 'root',
})
export class TaskRepository implements ITaskRepository {
  private taskDocRef: DocumentReference<ITask>;
  private taskColRef: CollectionReference<ITask>;

  constructor(private firestore: Firestore) {
    this.taskColRef = collection(this.firestore, 'tasks').withConverter(taskConverter);
  }

  // タスク情報を取得する
  get(taskId: ITask['id']): Promise<ITask> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
    return docData<ITask>(taskDocRef).pipe(first()).toPromise(Promise);
  }

  getTaskList(userId: ITask['userId']): Observable<ITask[]> {
    const today = limitedTime(0, 0);
    const previousDay = limitedTime(1, 7);

    // 当日の全てのタスクを取得する
    const todayTaskQuery = query(
      this.taskColRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      startAt(today.startTimestamp),
      endAt(today.endTimestamp),
    );

    // 当日以前（１週間分）の未完了のタスクを取得する
    const isNotDonePreviousDayTaskQuery = query(
      this.taskColRef,
      where('userId', '==', userId),
      where('isDone', '==', false),
      orderBy('createdAt', 'desc'),
      startAt(previousDay.startTimestamp),
      endAt(previousDay.endTimestamp),
    );
    return combineLatest([
      collectionData(todayTaskQuery),
      collectionData(isNotDonePreviousDayTaskQuery),
    ]).pipe(
      map(([todayTaskList, isNotDonePreviousDayTaskList]) => [
        ...todayTaskList,
        ...isNotDonePreviousDayTaskList,
      ]),
    );
  }

  // タスク情報を保存する
  create(task: ITask): Promise<void> {
    const taskId = doc(this.taskColRef).id;
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
    return setDoc(taskDocRef, { ...task, id: taskId });
  }

  // タスク情報を更新する
  update(task: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`).withConverter(updateTaskConverter);
    return setDoc(taskDocRef, task, { merge: true });
  }

  // タスク情報を削除する
  delete(taskId: ITask['id']): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`).withConverter(taskConverter);
    return deleteDoc(taskDocRef);
  }

  // いいね数をカウントアップする
  likeCountUp(task: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`).withConverter(updateTaskConverter);
    return setDoc(taskDocRef, { ...task, likeCount: task.likeCount + 1 }, { merge: true });
  }

  // いいね数をカウントダウンする
  likeCountDown(task: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`).withConverter(updateTaskConverter);
    return setDoc(taskDocRef, { ...task, likeCount: task.likeCount - 1 }, { merge: true });
  }
}
