export const timeFormatter = (time) => {
  if (!time) return "0";
  const formattedTime = time / 1000;
  return Math.round(formattedTime);
};
