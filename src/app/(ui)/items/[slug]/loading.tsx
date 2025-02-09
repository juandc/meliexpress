import { BaseContent } from "@/ui/components/isomorphic";

export default async function LoadingSearchPage() {
  return (
    <BaseContent
      breadcrumb={(
        <p>
          {[0,1,2].map((c) => (
            <span key={c} style={{
              backgroundColor: '#999',
              borderRadius: '4px',
              display: 'inline-block',
              marginRight: '4px',
              height: '14px',
              width: '70px',
            }} />
          ))}
        </p>
      )}
    >
      <div style={{ padding: '1rem' }}>
        <p style={{
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          display: 'inline-block',
          marginRight: '4px',
          // height: '100px',
          height: '440px',
          width: '100%',
          maxWidth: '685px',
          marginBottom: '8px',
        }} />
      </div>
    </BaseContent>
  );
}
