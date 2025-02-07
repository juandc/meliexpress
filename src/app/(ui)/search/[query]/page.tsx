import { Fragment } from "react";
import { BaseContent, SearchResult } from "@/components/isomorphic";
import { getSearchResults } from "@/services/getSearchResults";
import { notFound, redirect } from "next/navigation";

type NextProps = {
  params: Promise<{ query: string }>;
};

export default async function SearchPage(props: NextProps) {
  const { query } = await props.params;
  if (!query?.length) redirect("/");

  const { data } = await getSearchResults(query);
  if (!data) notFound();

  return (
    <BaseContent
      breadcrumb={(
        <p>
          {data.categories.map((c, i) => (
            <Fragment key={c}>
              {i !== 0 && " > "}
              {i === data.categories.length - 1 ? (
                <b>{c}</b>
              ) : <span>{c}</span>}
            </Fragment>
          ))}
        </p>
      )}
    >
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
