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
import esDictionary from "@/ui/dictionaries/es";
import { getQueryFromUrl } from "./utils";
import { usePlaceholder } from "./usePlaceholder";

export const NavBarContainer: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState(getQueryFromUrl);
  const placeholder = usePlaceholder({
    placeholders: esDictionary.navbar.placeholders,
    shouldMove: query.length <= 0,
  });

  const onReset = () => {
    setQuery("");
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const navigateToSearchResults = () => {
    if (query.length) {
      router.push(`/items?search=${query}`);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearchResults();
    }
  };

  return (
    <NavBar>
      <Link href="/" onClick={onReset} title={esDictionary.navbar.homeLinkTitle}>
        <img src="/Logo_ML@2x.png" />
      </Link>
      <SearchBar
        id="search_bar_input"
        type="text"
        value={query}
        onInputChange={onChange}
        onKeyDown={onKeyDown}
        onBtnClick={navigateToSearchResults}
        placeholder={placeholder}
        autoFocus
      />
      <Link href="/favorites" title={esDictionary.navbar.favoritesLinkTitle}>
        <img src="/MyList.png" />
      </Link>
    </NavBar>
  );
};
