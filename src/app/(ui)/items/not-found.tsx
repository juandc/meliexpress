'use client';

import { BaseContent } from "@/ui/components/isomorphic";
import esDictionary from "@/ui/dictionaries/es";

export default function NotFoundSearchPage() {
  return (
    <BaseContent isEmpty>
      {esDictionary.item.notFound}
    </BaseContent>
  );
}

