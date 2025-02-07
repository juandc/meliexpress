import { notFound, redirect } from "next/navigation";
import { BaseContent, Breadcrumb, SearchResult } from "@/ui/components/isomorphic";
import { getSearchResults } from "@/ui/services/getSearchResults";

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
          {...item}
        />
      ))}
    </BaseContent>
  );
}
