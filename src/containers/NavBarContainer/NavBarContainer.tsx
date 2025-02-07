"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEventHandler, useState, type FC } from "react";
import { InputBar, NavBar } from "@/components/isomorphic";
import { getQueryFromUrl } from "./utils";

export const NavBarContainer: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState(getQueryFromUrl);

  const onReset = () => {
    setQuery("");
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.length) {
      router.push(`/items?q=${query}`);
    }
  };

  return (
    <NavBar>
      <Link href="/" onClick={onReset}>
        <img src="/Logo_ML@2x.png" />
      </Link>
      <InputBar
        type="text"
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Nunca pares de buscar"
      />
    </NavBar>
  );
};
