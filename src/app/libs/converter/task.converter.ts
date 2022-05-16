import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  PartialWithFieldValue,
} from '@angular/fire/firestore';

import type { ITask } from '~/interfaces/ITask';

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
      updatedAt: data.updatedAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (task: PartialWithFieldValue<ITask>): DocumentData => {
    return {
      taskName: task.taskName,
      description: task.description,
      isDone: task.isDone,
      tagId: task.tagId,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  },
};
