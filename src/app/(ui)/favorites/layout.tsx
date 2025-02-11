import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { getDictionaryFromServer } from "@/ui/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionaryFromServer();
  const { title } = dictionary.meta.favorites;
  return { title };
}

export default async function ItemPageLayout(props: PropsWithChildren) {
  return props.children;
};
