import { BaseContent } from "@/components/isomorphic";

export default async function LoadingSearchPage() {
  return (
    <BaseContent
      breadcrumb={(
        <p>
          {[0,1,2].map((c, i) => (
            <span key={c}>X</span>
          ))}
        </p>
      )}
    >
      {[0,1,2,3].map(x => <p key={x}>Loading...</p>)}
    </BaseContent>
  );
}
