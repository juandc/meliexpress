import { type NextRequest, NextResponse } from "next/server";
import type { NextResponseApi, SearchApi } from "@/types";
import { jsonData, jsonError } from "@/api/jsonApi";
import { ExternalApiRequestItemsService } from "@/api/items/items.service";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function GET(request: NextRequest): Promise<NextResponseApi<SearchApi>> {
  try {
    const query = request.nextUrl.searchParams.get("q");
    if (!query) {
      return NextResponse.json(jsonError("Not query in items search"), { status: 400 });
    }
    const favoritesService = new InMemoryFavoritesService();
    const itemsService = new ExternalApiRequestItemsService(favoritesService);
    const { categories, items } = await itemsService.getBySearch(query);
    if (!items?.length) {
      return NextResponse.json(jsonError("Not Found"), { status: 404 });
    }
    return NextResponse.json(jsonData({ categories, items }));
  } catch(error) {
    return NextResponse.json(jsonError((error as unknown as Error).message), { status: 500 });
  }
}
