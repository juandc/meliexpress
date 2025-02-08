import { NextResponse } from "next/server";
import type { FavoritesApi } from "@/types";
import { FavoritesService } from "@/api/services/favorites.service";
import { authorMock } from "@/api/mocks/authorMock";

export async function GET(): Promise<NextResponse<FavoritesApi>> {
  try {
    const favoritesData = FavoritesService.getAll();
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
