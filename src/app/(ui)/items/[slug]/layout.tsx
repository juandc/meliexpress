import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { getIdFromSlug } from "@/ui/utils/pathUtils";
import { clipItemTitle } from "@/ui/utils/format";
import { getItem } from "@/ui/services/getItem";
import { getDictionaryFromServer } from "@/ui/dictionaries";

type NextProps = {
  params: Promise<{ slug: string }>
};

export async function generateMetadata(props: NextProps): Promise<Metadata> {
  const { slug } = await props.params;
  const id = getIdFromSlug(slug);
  const { data } = await getItem(id);

  if (!data) {
    notFound();
  }

  const dictionary = await getDictionaryFromServer();
  const shortTitle = clipItemTitle(data.item.title, false, 60);
  const title = dictionary.meta.item.title(shortTitle);

  return {
    title,
    description: data.item.description,
  };
}

export default async function ItemPageLayout(props: PropsWithChildren) {
  return props.children;
};
