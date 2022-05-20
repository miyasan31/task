/* eslint-disable no-underscore-dangle */
import { Timestamp } from '@angular/fire/firestore';

interface Range {
  startTimestamp: Timestamp;
  endTimestamp: Timestamp;
}

// TODO:偏差を可変にできるようにする
export const todayRange = (positiveDeviation?: number, minusDeviation?: number): Range => {
  // const date = new Date().setDate(new Date().getDate() - 1);

  // TODO:一旦当日のタスクを取得
  const startDate = new Date(new Date().setHours(0, 0, 0, 0));
  const startTimestamp = Timestamp.fromDate(startDate);

  const endDate = new Date(new Date().setHours(23, 59, 59, 99));
  const endTimestamp = Timestamp.fromDate(endDate);

  return {
    startTimestamp,
    endTimestamp,
  };
};
