import { Fragment } from "react";
import { BaseContent, SearchResult } from "@/components/isomorphic";
import { getSearchResults } from "@/services/getSearchResults";
import { redirect } from "next/navigation";

type NextProps = {
  searchParams: Promise<{ q: string }>;
};

export default async function SearchPage(props: NextProps) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;
  if (!query?.length) redirect("/");

  const searchData = await getSearchResults(query);

  return (
    <BaseContent
      breadcrumb={(
        <p>
          {searchData.data?.categories.map((c, i) => (
            <Fragment key={c}>
              {i !== 0 && " > "}
              {i === searchData.data.categories.length - 1 ? (
                <b>{c}</b>
              ) : <span>{c}</span>}
            </Fragment>
          ))}
        </p>
      )}
    >
      {searchData.data?.items.map((item, index) => (
        <SearchResult
          key={item.id}
          isFirst={index === 0}
          {...item}
        />
      ))}
    </BaseContent>
  );
}
