import { type NextRequest, NextResponse } from "next/server";
import { isTest } from "@/utils/isEnv";
import { jsonError } from "@/api/jsonApi";
import { InMemoryFavoritesService } from "@/api/favorites/favorites.service";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<unknown>> {
  try {
    const { id } = await params || {};
    if (!id) {
      return NextResponse.json(jsonError("Invalid Item ID"), { status: 400 });
    }
    const favoritesService = new InMemoryFavoritesService();
    favoritesService.delete(id);
    return NextResponse.json({ data: null, error: null }, { status: 200 });
  } catch(error) {
    if (!isTest) console.error(error);
    // TODO: standard CustomError and CustomErrors dict so any service,
    // model or whatever can dispatch any error messages and http status
    // (instead of always status 500)
    return NextResponse.json(
      jsonError((error as unknown as Error).message),
      { status: (error as unknown as Error).message.endsWith("does not exists in favorites") ? 404 : 500 },
    );
  }
}
