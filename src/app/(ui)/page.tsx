import { BaseContent } from "@/ui/components/isomorphic";
import esDictionary from "@/ui/dictionaries/es";

export default function HomePage() {
  return (
    <BaseContent isEmpty>
      {esDictionary.home.title}
    </BaseContent>
  );
}
