import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { getDictionaryFromServer } from "@/ui/dictionaries";

type NextProps = {
  params: Promise<{ query: string }>
};

export async function generateMetadata(props: NextProps): Promise<Metadata> {
  const { query } = await props.params;
  const dictionary = await getDictionaryFromServer();
  const title = dictionary.meta.search.title(query);
  return { title };
}

export default async function SearchPageLayout(props: PropsWithChildren) {
  return props.children;
};
