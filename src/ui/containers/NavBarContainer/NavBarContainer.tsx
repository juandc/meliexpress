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
import esDictionary from "@/ui/dictionaries/es";
import { useWritingPlaceholder } from "@/ui/hooks/useWritingPlaceholder";
import { useDebouncedQuery } from "./useDebouncedQuery";
import { useSuggestions } from "./useSuggestions";
import { usePreviewItems } from "./usePreviewItems";

export const NavBarContainer: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { query, debouncedQuery, setQuery } = useDebouncedQuery(300);
  const placeholder = useWritingPlaceholder({
    placeholders: esDictionary.shared.navbar.placeholders,
    shouldMove: query.length <= 0,
  });

  const [isOpenBox, setIsOpenBox] = useState(false);
  const {
    suggestions,
    getSuggestions,
    saveSuggestions,
  } = useSuggestions(debouncedQuery);
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  const { previewItems, getPreviewItems } = usePreviewItems(debouncedQuery);
  // const [previewItems, setPreviewItems] = useState<BaseItem[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const reset = () => {
    setQuery("");
  };

  // const getSuggestions = async () => {
  //   const storedSuggestions = await getLsSuggestions(debouncedQuery);
  //   setSuggestions(storedSuggestions);
  // };

  // const saveSuggestions = async (suggestion: string) => {
  //   await saveLsSuggestions(suggestion);
  // };

  // const getPreview = async () => {
  //   if (!query.length) return;
  //   const res = await getSearchResults(debouncedQuery);
  //   setPreviewItems(res.data.items.slice(0, 2));
  // };

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
    const options = query.length ? suggestions.filter((sug) => sug.includes(query)) : suggestions;
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
        items: previewItems, // TODO: fetch 2 items from API to preview
        onClick: () => {
          setIsOpenBox(false);
        },
      },
    };
  }, [suggestions, previewItems, query]);

  useEffect(() => {
    if (isOpenBox) {
      Promise.all([getSuggestions(), getPreviewItems()]);
    }
  }, [isOpenBox, debouncedQuery, pathname]);

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
        // onBlur={onBlur}
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
