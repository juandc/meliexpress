"use client";

import { useState, type FC } from "react";
import type { DetailedItem } from "@/types";
import { Button } from "../components/isomorphic";
import { saveFavoriteItem } from "../services/saveFavoriteItem";

type Status = "iddle" | "loading" | "success" | "error";

export const AddToFavoritesBtn: FC<DetailedItem> = (props) => {
  const [status, setStatus] = useState<Status>("iddle");

  const save = async () => {
    try {
      setStatus("loading");
      const success = await saveFavoriteItem(props);
      setStatus(success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const onClick = () => {
    if (status === "iddle" || status === "error") {
      save();
    }
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      {status === "iddle" && "Agregar a Favoritos"}
      {status === "loading" && "Agregando a favoritos..."}
      {status === "success" && "Agregado a Favoritos"}
      {status === "error" && "Intentar de nuevo"}
    </Button>
  );
};
