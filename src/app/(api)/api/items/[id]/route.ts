import { type NextRequest, NextResponse } from "next/server";
import type { ItemApi } from "@/types";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";
import { ExternalApiRequestItemsService } from "@/api/items/items.service";
import { authorMock } from "@/api/mocks/authorMock";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ItemApi>> {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json({
        data: null,
        error: "Invalid Item ID",
      }, { status: 400 });
    }
    const favoritesService = new InMemoryFavoritesService();
    const itemsService = new ExternalApiRequestItemsService(favoritesService);
    const { categories, item } = await itemsService.getById(id);
    if (!item.id) {
      return NextResponse.json({
        data: null,
        error: "Item Not Found",
      }, { status: 404 });
    }
    return NextResponse.json({
      data: {
        author: authorMock,
        categories,
        item,
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
