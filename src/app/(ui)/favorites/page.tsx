import { getFavoriteItems } from "@/ui/services/getFavoriteItems";
import { AddToFavoritesBtn } from "@/ui/containers/AddToFavoritesBtn";
import { BaseContent, SearchResult } from "@/ui/components/isomorphic";
import { getDictionaryFromServer } from "@/ui/dictionaries";

export default async function SearchPage() {
  const dictionary = await getDictionaryFromServer();
  const { empty, title } = dictionary.favorites;

  const { data } = await getFavoriteItems();

  if (!data?.items.length) {
    return (
      <BaseContent isEmpty>
        {empty}
      </BaseContent>
    );
  }

  return (
    <BaseContent>
      <h1>{title}</h1>
      {data.items.map((item, index) => (
        <SearchResult
          key={item.id}
          isFirst={index === 0}
          additionalDataEl={(
            <AddToFavoritesBtn {...item} size="sm" withLink={false} />
          )}
          {...item}
        />
      ))}
    </BaseContent>
  );
}
