"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ChangeEventHandler,
  type FC,
  type KeyboardEvent,
  useState,
} from "react";
import { NavBar, SearchBar } from "@/ui/components/isomorphic";
import { getQueryFromUrl } from "./utils";
import { usePlaceholder } from "./usePlaceholder";

const placeholders = [
  "Buscar productos...",
  "Encuentra lo que necesitas...",
  "Explora nuestras categorías...",
  "Descubre ofertas increíbles...",
  "Nunca dejes de buscar...",
];

export const NavBarContainer: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState(getQueryFromUrl);
  const placeholder = usePlaceholder({
    placeholders,
    shouldMove: query.length <= 0
  });

  const onReset = () => {
    setQuery("");
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const navigateToSearchResults = () => {
    if (query.length) {
      router.push(`/items?q=${query}`);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearchResults();
    }
  };

  return (
    <NavBar>
      <Link href="/" onClick={onReset}>
        <img src="/Logo_ML@2x.png" />
      </Link>
      <SearchBar
        type="text"
        value={query}
        onInputChange={onChange}
        onKeyDown={onKeyDown}
        onBtnClick={navigateToSearchResults}
        placeholder={placeholder}
      />
      <Link href="/favorites" onClick={onReset}>
        <img src="/MyList.png" />
      </Link>
    </NavBar>
  );
};
