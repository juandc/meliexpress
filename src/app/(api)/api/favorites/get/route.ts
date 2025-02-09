import { NextResponse } from "next/server";
import type { FavoritesApi, NextResponseApi } from "@/types";
import { jsonData, jsonError } from "@/api/jsonApi";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function GET(): Promise<NextResponseApi<FavoritesApi>> {
  try {
    const favoritesService = new InMemoryFavoritesService();
    const favoritesData = favoritesService.getAll();
    return NextResponse.json(jsonData({ items: favoritesData }));
  } catch(error) {
    console.error(error);
    return NextResponse.json(jsonError((error as unknown as Error).message), { status: 500 });
  }
}
