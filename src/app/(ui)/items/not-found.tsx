'use client';

import { BaseContent } from "@/components/isomorphic";

export default function NotFoundSearchPage({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string }
//   reset: () => void
}) {
  return (
    <BaseContent isEmpty>
      No se encontraron resultados para tu búsqueda, intenta de nuevo
    </BaseContent>
  );
}

