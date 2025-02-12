/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ChangeEventHandler,
  type FC,
  type FocusEventHandler,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";
import { NavBar, SearchBar } from "@/ui/components/isomorphic";
import { itemMock } from "@/mocks/itemMock";
import esDictionary from "@/ui/dictionaries/es";
import { getQueryFromUrl } from "./utils";
import { usePlaceholder } from "./usePlaceholder";

export const NavBarContainer: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState(getQueryFromUrl);
  const [isOpenBox, setIsOpenBox] = useState(false);
  const placeholder = usePlaceholder({
    placeholders: esDictionary.shared.navbar.placeholders,
    shouldMove: query.length <= 0,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const reset = () => {
    setQuery("");
  };

  const navigateToSearchResults = () => {
    if (query.length) {
      setIsOpenBox(false);
      router.push(`/items?search=${query}`);
      btnRef.current?.focus();
      btnRef.current?.blur();
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigateToSearchResults();
    } else if (event.key === "Escape") {
      // TODO: replicate Escape key behavior to all SearchBar components
      setIsOpenBox(false);
      inputRef.current?.blur();
    } else {
      setIsOpenBox(true);
    }
  };

  const onFocus = () => {
    setIsOpenBox(true);
  };

  const onBlur: FocusEventHandler<HTMLElement> = (e) => {
    const { preventDefault, relatedTarget } = e;
    if (
      relatedTarget?.getAttribute?.("data-suggestionopt") === "true"
      || relatedTarget?.getAttribute?.("data-previewitem") === "true"
    ) {
      preventDefault();
    } else {
      setIsOpenBox(false);
    }
  };

  const boxProps = {
    suggestions: {
      options: `${query}-1, ${query}-2, ${query}-3`.split(", "),
      onSelect: (option: string) => {
        setQuery(option)
        if (typeof window !== "undefined") {
          inputRef.current?.focus();
        }
      },
    },
    preview: {
      items: [itemMock.item],
      onClick: () => {
        setIsOpenBox(false);
      },
    },
  };

  return (
    <NavBar>
      <Link href="/" onClick={reset} title={esDictionary.shared.navbar.homeLinkTitle}>
        <img
          src="/Logo_ML@2x.png"
          alt={esDictionary.shared.navbar.homeLinkTitle}
        />
      </Link>
      <SearchBar
        id="search_bar_input"
        type="text"
        onBlur={onBlur}
        inputRef={inputRef}
        value={query}
        placeholder={placeholder}
        onInputChange={onChange}
        onKeyDown={onKeyDown}
        onInputClick={onFocus}
        onFocus={onFocus}
        autoFocus
        btnRef={btnRef}
        onBtnClick={navigateToSearchResults}
        {...(isOpenBox ? boxProps : {})}
      />
      <Link href="/favorites" title={esDictionary.shared.navbar.favoritesLinkTitle}>
        <img
          src="/MyList.png"
          alt={esDictionary.shared.navbar.favoritesLinkTitle}
        />
      </Link>
    </NavBar>
  );
};
