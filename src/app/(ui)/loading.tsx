import { BaseContent, BreadcrumbSkeleton, SearchResultsSkeleton } from "@/ui/components/isomorphic";

export default async function LoadingSearchPage() {
  return (
    <BaseContent breadcrumb={<BreadcrumbSkeleton count={3} />}>
      <SearchResultsSkeleton count={4} />
    </BaseContent>
  );
}
