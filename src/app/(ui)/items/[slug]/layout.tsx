import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { getIdFromSlug } from "@/ui/utils/pathUtils";
import { clipItemTitle } from "@/ui/utils/format";
import { getItem } from "@/ui/services/getItem";

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

  return {
    title: `${clipItemTitle(data.item.title, true, 46)} | MeliExpress`,
    description: data.item.description,
  };
}

export default async function ItemPageLayout(props: PropsWithChildren) {
  return props.children;
};
