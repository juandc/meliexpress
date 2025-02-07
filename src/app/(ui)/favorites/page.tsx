import { getFavoriteItems } from "@/ui/services/getFavoriteItems";
import { BaseContent, SearchResult } from "@/ui/components/isomorphic";

export default async function SearchPage() {
  const { data } = await getFavoriteItems();

  if (!data?.items.length) {
    return (
      <BaseContent isEmpty>
        Aquí aparecerán los items que guardes como favoritos
      </BaseContent>
    );
  }

  return (
    <BaseContent>
      <h1>Tus favoritos</h1>
      {data.items.map((item, index) => (
        <SearchResult
          key={item.id}
          isFirst={index === 0}
          {...item}
        />
      ))}
    </BaseContent>
  );
}
