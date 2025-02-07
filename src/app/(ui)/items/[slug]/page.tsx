import { BaseContent, ProductDetail } from "@/components/isomorphic";
import { getItem } from "@/services/getItem";
import { notFound } from "next/navigation";

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
  const { data } = await getItem(id);
  if (!data) notFound();

  return (
    <BaseContent
      breadcrumb={(
        "breadcrumb"
      )}
    >
      <ProductDetail {...data.item} />
    </BaseContent>
  );
}
