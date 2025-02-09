"use client";

import { useState, type FC } from "react";
import type { DetailedItem } from "@/types";
import { saveFavoriteItem } from "@/ui/services/saveFavoriteItem";
import { removeFavoriteItem } from "@/ui/services/removeFavoriteItem";
import { Button, Anchor } from "@/ui/components/isomorphic";

type Status = "iddle" | "saving" | "removing" | "saved" | "error";

export const AddToFavoritesBtn: FC<DetailedItem> = (props) => {
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

  const onClick = () => {
    if (status === "error") reload();
    if (status === "iddle") save();
    if (status === "saved") remove();
  };

  const variant = (status === "saved" || status === "error") ? "danger" : "secondary";
  const disabled = status === "removing" || status === "saving";

  return (
    <>
      <Button variant={variant} onClick={onClick} disabled={disabled}>
        {status === "iddle" && "Agregar a Favoritos"}
        {status === "saving" && "Agregando..."}
        {status === "saved" && "Eliminar de favoritos"}
        {status === "removing" && "Eliminando..."}
        {status === "error" && "Error, intentar de nuevo"}
      </Button>

      {status === "saved" && (
        <Anchor variant="ghost" href="/favorites">Ver favoritos</Anchor>
      )}
    </>
  );
};
