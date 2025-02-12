/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type ChangeEventHandler,
  type FC,
  type FocusEventHandler,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavBar, SearchBar } from "@/ui/components/isomorphic";
// import { itemMock } from "@/mocks/itemMock";
import esDictionary from "@/ui/dictionaries/es";
import { getLsSuggestions, saveLsSuggestions } from "@/ui/services/client-only/suggestions";
import { useDebounce } from "@/ui/hooks/useDebounce";
import { useWritingPlaceholder } from "@/ui/hooks/useWritingPlaceholder";
import { getQueryFromUrl } from "./utils";

export const NavBarContainer: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(getQueryFromUrl);
  const debouncedQuery = useDebounce(query.trim(), 300);
  const realQuery = debouncedQuery.trim();
  const [isOpenBox, setIsOpenBox] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const placeholder = useWritingPlaceholder({
    placeholders: esDictionary.shared.navbar.placeholders,
    shouldMove: query.trim().length <= 0,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const reset = () => {
    setQuery("");
  };

  const getSuggestions = async () => {
    const storedSuggestions = await getLsSuggestions(realQuery);
    setSuggestions(storedSuggestions);
  };

  const saveSuggestions = async (suggestion: string) => {
    await saveLsSuggestions(suggestion);
  };

  const navigateToSearchResults = () => {
    if (query.length) {
      saveSuggestions(query);
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

  const boxProps = useMemo(() => {
    const options = query.trim().length ? suggestions.filter((sug) => sug.includes(query.trim())) : suggestions;
    return {
      suggestions: {
        options,
        onSelect: (option: string) => {
          setQuery(option);
          if (typeof window !== "undefined") {
            inputRef.current?.focus();
          }
        },
      },
      preview: {
        items: [], // TODO: fetch 2 items from API to preview
        onClick: () => {
          setIsOpenBox(false);
        },
      },
    };
  }, [suggestions, query.trim()]);

  useEffect(() => {
    if (isOpenBox) {
      getSuggestions();
    }
  }, [isOpenBox, realQuery, pathname]);

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
