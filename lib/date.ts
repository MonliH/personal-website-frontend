export const toUnixTimestamp = (date: Date) =>
  Math.floor(date.getTime() / 1000);

export const fromUnixTimestamp = (date: number): Date => {
  const d = new Date(1970, 0, 1);
  d.setUTCSeconds(date);
  return d;
};
