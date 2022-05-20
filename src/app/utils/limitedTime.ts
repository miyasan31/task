import { Timestamp } from '@angular/fire/firestore';

interface Range {
  startTimestamp: Timestamp;
  endTimestamp: Timestamp;
}

export const limitedTime = (startPositiveDeviation = 1, endMinusDeviation = 1): Range => {
  const startDate = new Date(
    new Date(new Date().setDate(new Date().getDate() - startPositiveDeviation)).setHours(
      23,
      59,
      59,
      99,
    ),
  );

  const endDate = new Date(
    new Date(new Date().setDate(new Date().getDate() - endMinusDeviation)).setHours(0, 0, 0, 0),
  );

  const startTimestamp = Timestamp.fromDate(startDate);
  const endTimestamp = Timestamp.fromDate(endDate);
  console.log(
    `\u001b[32m${endDate} から
    ${startDate} の期間の情報を取得\u001b[0m`,
  );

  return {
    startTimestamp,
    endTimestamp,
  };
};
