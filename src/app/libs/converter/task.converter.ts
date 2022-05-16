import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  PartialWithFieldValue,
} from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

import type { ITask } from '~/interfaces/task/ITask';

/**
 * FirestoreのドキュメントとTaskオブジェクトの型変換
 */
export const taskConverter: FirestoreDataConverter<ITask> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITask => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      taskName: data.taskName,
      description: data.description,
      isDone: data.isDone,
      tagId: data.tagId,
      userId: data.userId,
      createdAt: data.createdAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (task: PartialWithFieldValue<ITask>): DocumentData => {
    const data = {
      taskName: task.taskName,
      description: task.description,
      isDone: task.isDone,
      tagId: task.tagId,
      userId: task.userId,
      createdAt: Timestamp.now(),
    };

    return data;
  },
};
