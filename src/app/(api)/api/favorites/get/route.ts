import { NextResponse } from "next/server";
import { FavoritesService } from "@/api/services/favorites.service";

export async function GET(): Promise<NextResponse<unknown>> {
  try {
    const favoritesData = FavoritesService.getAll();
    return NextResponse.json({
      data: {
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
