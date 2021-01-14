export const toUnixTimestamp = (date: Date) =>
  Math.floor(date.getTime() / 1000);

export const fromUnixTimestamp = (date: number): Date => {
  const d = new Date(1970, 0, 1);
  d.setUTCSeconds(date);
  return d;
};

export const formatDate = (d: Date): string => {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${ye}-${mo}-${da}`;
};
