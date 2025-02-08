import { type NextRequest, NextResponse } from "next/server";
import type { SearchApi } from "@/types";
import { authorMock } from "@/api/mocks/authorMock";
import { ExternalApiRequestItemsService } from "@/api/items/items.service";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function GET(request: NextRequest): Promise<NextResponse<SearchApi>> {
  try {
    const query = request.nextUrl.searchParams.get("q");
    if (!query) {
      return NextResponse.json({
        data: null,
        error: "Not query in items search",
      }, { status: 400 });
    }
    const favoritesService = new InMemoryFavoritesService();
    const itemsService = new ExternalApiRequestItemsService(favoritesService);
    const { categories, items } = await itemsService.getBySearch(query);
    if (!items?.length) {
      return NextResponse.json({
        data: null,
        error: "Not Found",
      }, { status: 404 });
    }
    return NextResponse.json({
      data: {
        author: authorMock,
        categories,
        items,
      },
      error: null,
    });
  } catch(error) {
    return NextResponse.json({
      data: null,
      error: (error as unknown as Error).message,
    }, { status: 500 });
  }
}
