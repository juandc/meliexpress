"use client";

import { type MouseEventHandler, useState, type FC, type ComponentProps } from "react";
import type { BaseItem, Dictionary } from "@/types";
import { saveFavoriteItem } from "@/ui/services/saveFavoriteItem";
import { removeFavoriteItem } from "@/ui/services/removeFavoriteItem";
import { Button, Anchor } from "@/ui/components/isomorphic";
import esDictionary from "@/ui/dictionaries/es";

const copys = esDictionary.shared.addToFavorites;

type Status = keyof Dictionary["shared"]["addToFavorites"]["btnCopy"];

type Props = BaseItem & {
  size?: ComponentProps<typeof Button>["size"];
  withLink?: boolean;
};

export const AddToFavoritesBtn: FC<Props> = (props) => {
  const { withLink = true } = props;

  const [status, setStatus] = useState<Status>(
    () => props.favorite ? "saved" : "iddle"
  );

  const save = async () => {
    try {
      setStatus("saving");
      const success = await saveFavoriteItem(props);
      setStatus(success ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  };

  const remove = async () => {
    try {
      setStatus("removing");
      const success = await removeFavoriteItem(props.id);
      setStatus(success ? "iddle" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "error") reload();
    if (status === "iddle") save();
    if (status === "saved") remove();
  };

  const variant = (status === "saved" || status === "error") ? "danger" : "secondary";
  const disabled = status === "removing" || status === "saving";

  return (
    <>
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        size={props.size}
        data-prevent-nprogress={true}
      >
        {copys.btnCopy[status]}
      </Button>

      {(withLink && status === "saved") && (
        <Anchor
          variant="ghost"
          href="/favorites"
          size={props.size}
        >{copys.linkToFavorites}</Anchor>
      )}
    </>
  );
};
