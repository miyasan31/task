import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from '@angular/fire/firestore';

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
      likeCount: data.likeCount,
      tagId: data.tagId,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (task: PartialWithFieldValue<ITask>): DocumentData => {
    const data = {
      taskName: task.taskName,
      description: task.description,
      isDone: task.isDone,
      likeCount: task.likeCount,
      tagId: task.tagId,
      userId: task.userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    return data;
  },
};

export const updateTaskConverter: FirestoreDataConverter<ITask> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITask => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      taskName: data.taskName,
      description: data.description,
      isDone: data.isDone,
      likeCount: data.likeCount,
      tagId: data.tagId,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (task: PartialWithFieldValue<ITask>): DocumentData => {
    const data = {
      taskName: task.taskName,
      description: task.description,
      isDone: task.isDone,
      likeCount: task.likeCount,
      tagId: task.tagId,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: serverTimestamp(),
    };

    return data;
  },
};

export const notTimeUpdatedTaskConverter: FirestoreDataConverter<ITask> = {
  // FireStore取得時の変換
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ITask => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      taskName: data.taskName,
      description: data.description,
      isDone: data.isDone,
      likeCount: data.likeCount,
      tagId: data.tagId,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  // FireStore保存時の変換
  toFirestore: (task: PartialWithFieldValue<ITask>): DocumentData => {
    const data = {
      taskName: task.taskName,
      description: task.description,
      isDone: task.isDone,
      likeCount: task.likeCount,
      tagId: task.tagId,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.createdAt,
    };

    return data;
  },
};
