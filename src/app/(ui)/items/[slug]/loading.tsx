/* Actually this loader isnt shown because layout makes the same request
 * as the page, so when the streaming could start all the required data
 * for the final render is already available.
*/

import { BaseContent, BreadcrumbSkeleton, ProductDetailsSkeleton } from "@/ui/components/isomorphic";

export default async function LoadingSearchPage() {
  return (
    <BaseContent breadcrumb={<BreadcrumbSkeleton count={3} />}>
      <ProductDetailsSkeleton />
    </BaseContent>
  );
}
