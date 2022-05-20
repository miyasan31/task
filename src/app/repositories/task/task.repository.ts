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
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
    const date = limitedTime(0, 3);

    const taskQuery = query(
      this.taskColRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      startAt(date.startTimestamp),
      endAt(date.endTimestamp),
    );
    return collectionData<ITask>(taskQuery);
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

  // いいね数をカウントアップする
  likeCountUp(taskDto: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskDto.id}`).withConverter(
      updateTaskConverter,
    );
    return setDoc(taskDocRef, { ...taskDto, likeCount: taskDto.likeCount + 1 }, { merge: true });
  }

  // いいね数をカウントダウンする
  likeCountDown(taskDto: ITask): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskDto.id}`).withConverter(
      updateTaskConverter,
    );
    return setDoc(taskDocRef, { ...taskDto, likeCount: taskDto.likeCount - 1 }, { merge: true });
  }
}
