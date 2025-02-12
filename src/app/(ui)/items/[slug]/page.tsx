import { notFound } from "next/navigation";
import { getIdFromSlug } from "@/ui/utils/pathUtils";
import { getItem } from "@/ui/services/getItem";
import { AddToFavoritesBtn } from "@/ui/containers/AddToFavoritesBtn";
import { BaseContent, Breadcrumb, ProductDetail } from "@/ui/components/isomorphic";

type NextProps = {
  params: Promise<{ slug: string }>
};

export default async function ItemPage(props: NextProps) {
  const { slug } = await props.params;
  const id = getIdFromSlug(slug);
  const { data } = await getItem(id);
  if (!data) notFound();

  return (
    <BaseContent breadcrumb={<Breadcrumb categories={data.categories} />}>
      <ProductDetail
        {...data.item}
        additionalDataEl={<AddToFavoritesBtn {...data.item} />}
      />
    </BaseContent>
  );
}
