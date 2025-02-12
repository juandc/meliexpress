export const clipItemTitle = (
  title: string,
  withElipsis: boolean = true,
  length: number = 56
) => {
  if (title.length < length) return title;
  const clipped = title.slice(0, withElipsis ? length - 3 : length);
  return `${clipped}${withElipsis ? "..." : ""}`;
};

export const getItemHref = (title: string, id: string) => {
  let href = "/items/";
  if (title) {
    const shortTitle = clipItemTitle(title, false, 30).trim();
    const urlTitle = shortTitle.toLowerCase().replaceAll(" ", "-");
    href += encodeURIComponent(urlTitle);
    href += '-';
  }
  href += id;
  return href;
};
