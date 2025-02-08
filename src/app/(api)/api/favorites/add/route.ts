import { NextResponse } from "next/server";
import { jsonError } from "@/api/jsonApi";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function POST(request: Request): Promise<NextResponse<unknown>> {
  try {
    const body = await request.json();
    const favoritesService = new InMemoryFavoritesService();
    favoritesService.save(body);
    return NextResponse.json({
      data: null,
      error: null,
    }, { status: 200 });
  } catch(error) {
    return NextResponse.json(jsonError((error as unknown as Error).message), { status: 500 });
  }
}
