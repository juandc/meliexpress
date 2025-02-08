/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest, NextResponse } from "next/server";
import type { DetailedItem, ItemApi } from "@/types";
import { authorMock } from "@/api/mocks/authorMock";
import { FavoritesService } from "@/api/services/favorites.service";
// import { itemMock } from "@/mocks/itemMock";
// import { itemDescriptionMock } from "@/mocks/itemDescriptionMock";

export async function originalItem(id: string) {
  const [data, dataDesc] = await Promise.all([
    fetch(`https://api.mercadolibre.com/items/${id}`).then(res => res.json()),
    fetch(`https://api.mercadolibre.com/items/${id}/description`).then(res => res.json()),
  ]);
  const dataCategory = await fetch(`https://api.mercadolibre.com/categories/${data.category_id}`).then(res => res.json());
  return { data, dataDesc, dataCategory };
  // return { data: itemMock, dataDesc: itemDescriptionMock };
}

export function transformItem(
  data: any,
  dataDesc: any,
  dataCategory: any,
  isFavorite: boolean,
): ItemApi {
  const item: DetailedItem = {
    id: data.id,
    title: data.title,
    price: {
      currency: data.currency_id,
      amount: data.price,
      decimals: data.price, // TODO: ??
    },
    picture: data.pictures[0].url, // TODO: ??
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
    sold_quantity: data.initial_quantity, // TODO: ??
    description: dataDesc.plain_text,
    favorite: isFavorite,
  };
  const categories = dataCategory.path_from_root.map((c: any) => c.name) ?? [];
  return {
    data: {
      author: authorMock,
      categories,
      item,
    },
    error: null,
  };
}

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
    const { data, dataDesc, dataCategory } = await originalItem(id);
    if (!data || !dataDesc) {
      return NextResponse.json({
        data: null,
        error: "Item Not Found",
      }, { status: 404 });
    }
    let isFavorite = false;
    try {
      isFavorite = !!FavoritesService.getById(id);
    } catch {
      isFavorite = false;
    }
    const itemData = transformItem(data, dataDesc, dataCategory, isFavorite);
    return NextResponse.json(itemData);
  } catch(error) {
    return NextResponse.json({
      data: null,
      error: (error as unknown as Error).message,
    }, { status: 500 });
  }
}
