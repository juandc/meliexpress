export const clipItemTitle = (
  title: string,
  withElipsis: boolean = true,
  length: number = 56
) => {
  if (title.length < length) return title;
  const clipped = title.slice(0, withElipsis ? length - 3 : length);
  return `${clipped}${withElipsis ? "..." : ""}`;
};
