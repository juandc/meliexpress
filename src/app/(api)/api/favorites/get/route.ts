import { NextResponse } from "next/server";
import type { FavoritesApi } from "@/types";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";
import { authorMock } from "@/api/mocks/authorMock";

export async function GET(): Promise<NextResponse<FavoritesApi>> {
  try {
    const favoritesService = new InMemoryFavoritesService();
    const favoritesData = favoritesService.getAll();
    return NextResponse.json({
      data: {
        author: authorMock,
        items: favoritesData,
      },
      error: null,
    });
  } catch(error) {
    return NextResponse.json({
      data: null,
      error,
    }, { status: 500 });
  }
}
