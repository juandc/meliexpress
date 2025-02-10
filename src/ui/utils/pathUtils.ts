export const getIdFromSlug = (slug: string) => {
  const split = slug.split('-');
  const id = split[split.length - 1];
  return id;
};
