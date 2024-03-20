export const numberLabel = (count: number, label: string, suffix: string = "s") => {
  return `${label}${count === 1 ? "" : suffix}`;
};
