import { NextResponse } from "next/server";
import type { DetailedItem } from "@/types";
import { isTest } from "@/utils/isEnv";
import { jsonError } from "@/api/jsonApi";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function POST(request: Request): Promise<NextResponse<unknown>> {
  try {
    const body = await request.json() as DetailedItem;
    if (!body.id) {
      return NextResponse.json(jsonError("Invalid Item ID"), { status: 400 });
    }
    const favoritesService = new InMemoryFavoritesService();
    favoritesService.save(body);
    return NextResponse.json({
      data: null,
      error: null,
    }, { status: 200 });
  } catch (error) {
    if (!isTest) console.error(error);
    return NextResponse.json(jsonError((error as unknown as Error).message), { status: 500 });
  }
}
