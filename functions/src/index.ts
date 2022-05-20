/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable indent */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const taskRef = db.collection('tasks');
const likeRef = db.collection('likes');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const likeCountEvent = functions
//   .region('asia-northeast1')
//   .firestore.document('likes/{likeId}')
//   .onWrite(async (change, context) => {
//     const likeId = context.params.likeId;
//     console.log('context:', context);
//     console.log('1:', likeId);

//     const FieldValue = admin.firestore.FieldValue;
//     const likeData = (await likeRef.doc(likeId).get()) as any;
//     const taskCountRef = await taskRef.doc(likeData.taskId);
//     console.log('2:', likeData);

//     if (!change.before.exists) {
//       // 登録時に件数をインクリメント
//       console.log('登録 + 1');
//       return taskCountRef.set({ likeCount: FieldValue.increment(1) }, { merge: true });
//     } else if (change.before.exists && !change.after.exists) {
//       console.log('削除 - 1');
//       // 削除時に件数をデクリメント
//       return taskCountRef.set({ likeCount: FieldValue.increment(-1) }, { merge: true });
//     }
//     return;
//   });

export const likeCountUp = functions
  .region('asia-northeast1')
  .firestore.document('likes/{likeId}')
  .onCreate(async (change, context) => {
    const likeId = context.params.likeId;
    console.log('likeId:', likeId);
    const likeData = (await likeRef.doc(`${likeId}`).get()).data() as any;
    console.log('likeData:', likeData);
    const taskCountRef = await taskRef.doc(`${likeData.taskId}`);
    const FieldValue = admin.firestore.FieldValue;
    return taskCountRef.set({ likeCount: FieldValue.increment(1) }, { merge: true });
  });

export const likeCountDown = functions
  .region('asia-northeast1')
  .firestore.document('likes/{likeId}')
  .onDelete(async (change, context) => {
    const likeId = context.params.likeId;
    console.log('likeId:', likeId);
    const likeData = (await likeRef.doc(`${likeId}`).get()).data() as any;
    console.log('likeData:', likeData);
    const taskCountRef = await taskRef.doc(`${likeData.taskId}`);
    const FieldValue = admin.firestore.FieldValue;
    return taskCountRef.set({ likeCount: FieldValue.increment(-1) }, { merge: true });
  });
