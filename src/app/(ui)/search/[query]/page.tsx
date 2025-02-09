import { notFound, redirect } from "next/navigation";
import { getSearchResults } from "@/ui/services/getSearchResults";
import { AddToFavoritesBtn } from "@/ui/containers/AddToFavoritesBtn";
import { BaseContent, Breadcrumb, SearchResult } from "@/ui/components/isomorphic";

type NextProps = {
  params: Promise<{ query: string }>;
};

export default async function SearchPage(props: NextProps) {
  const { query } = await props.params;
  if (!query?.length) redirect("/");

  const { data } = await getSearchResults(query);
  if (!data) notFound();

  return (
    <BaseContent breadcrumb={<Breadcrumb categories={data.categories} />}>
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
