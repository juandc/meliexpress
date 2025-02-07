import { NextResponse } from "next/server";
import { FavoritesService } from "@/api/services/favorites.service";

export async function POST(request: Request): Promise<NextResponse<unknown>> {
  try {
    const body = await request.json();
    FavoritesService.save(body);
    return NextResponse.json({
      data: {
        created: true,
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
