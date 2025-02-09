import { type NextRequest, NextResponse } from "next/server";
import type { NextResponseApi, ItemApi, ItemApiData } from "@/types";
import { jsonData, jsonError } from "@/api/jsonApi";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";
import { ExternalApiRequestItemsService } from "@/api/items/items.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponseApi<ItemApi>> {
  try {
    const id = (await params).id;
    console.log("GET /api/items/[id]", {id});
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    if (!id) {
      return NextResponse.json(jsonError("Invalid Item ID"), { status: 400 });
    }
    const favoritesService = new InMemoryFavoritesService();
    const itemsService = new ExternalApiRequestItemsService(favoritesService);
    const { categories, item } = await itemsService.getById(id);
    if (!item.id) {
      return NextResponse.json(jsonError("Item Not Found"), { status: 404 });
    }
    return NextResponse.json(jsonData<ItemApiData>({
      categories,
      item,
    }));
  } catch(error) {
    console.error(error);
    return NextResponse.json(
      jsonError((error as unknown as Error).message),
      { status: 500 },
    );
  }
}
