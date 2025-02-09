import { BaseContent, BreadcrumbSkeleton, ProductDetailsSkeleton } from "@/ui/components/isomorphic";

export default async function LoadingSearchPage() {
  return (
    <BaseContent breadcrumb={<BreadcrumbSkeleton count={3} />}>
      <ProductDetailsSkeleton />
    </BaseContent>
  );
}
