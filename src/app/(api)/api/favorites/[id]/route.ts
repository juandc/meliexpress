import { type NextRequest, NextResponse } from "next/server";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<unknown>> {
  try {
    const id = (await params).id;
    const favoritesService = new InMemoryFavoritesService();
    favoritesService.delete(id);
    return NextResponse.json({
      data: null,
      error: null,
    }, { status: 200 });
  } catch(error) {
    return NextResponse.json({
      data: null,
      error,
    }, { status: 500 });
  }
}
