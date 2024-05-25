export const calculateRemaingDays = (expiryDateStr: string): number => {
  const expiryDate: Date = new Date(expiryDateStr);
  const currentDate: Date = new Date();

  const differenceInMilliseconds: number =
    expiryDate.getTime() - currentDate.getTime();

  const millisecondsInADay: number = 24 * 60 * 60 * 1000;
  const remainingDays: number = Math.floor(
    differenceInMilliseconds / millisecondsInADay
  );

  return remainingDays;
};
