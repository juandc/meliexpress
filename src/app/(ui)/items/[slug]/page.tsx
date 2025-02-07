import { notFound } from "next/navigation";
import { getItem } from "@/ui/services/getItem";
import { AddToFavoritesBtn } from "@/ui/containers/AddToFavoritesBtn";
import { BaseContent, Breadcrumb, ProductDetail } from "@/ui/components/isomorphic";

type NextProps = {
  params: Promise<{ slug: string }>
};

const getIdFromSlug = (slug: string) => {
  const split = slug.split('-');
  const id = split[split.length - 1];
  return id;
};

export default async function ItemPage(props: NextProps) {
  const { slug } = await props.params;
  const id = getIdFromSlug(slug);
  // TODO: different flows for server and client side
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
