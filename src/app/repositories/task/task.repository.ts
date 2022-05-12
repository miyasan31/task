import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

import { ITask } from '~/interfaces/ITask';

type TaskDocRef = DocumentReference<ITask>;
type TaskColRef = CollectionReference<ITask>;

@Injectable({
  providedIn: 'root',
})
export class TaskRepository {
  taskDocRef: TaskDocRef;
  taskColRef: TaskColRef;

  constructor(public firestore: Firestore) {
    this.taskColRef = collection(this.firestore, 'tasks') as TaskColRef;
  }

  // タスク情報を取得する
  getTask(taskId: ITask['id']): Promise<ITask> {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`) as TaskDocRef;
    return docData<ITask>(taskDoc).pipe(first()).toPromise(Promise);
  }

  // タスク情報を保存する
  createTask(taskDto: ITask): Promise<void> {
    return setDoc(this.taskDocRef, taskDto);
  }

  // タスク情報を更新する
  updateTask(taskDto: ITask): Promise<void> {
    return setDoc(this.taskDocRef, taskDto, { merge: true });
  }

  // タスク情報を削除する
  deleteTask(taskId: ITask['id']): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`) as TaskDocRef;
    return deleteDoc(taskDoc);
  }
}
