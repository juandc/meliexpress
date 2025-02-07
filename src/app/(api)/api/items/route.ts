/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest, NextResponse } from "next/server";
import type { BaseItem, SearchApi } from "@/types";
import { authorMock } from "../mocks/authorMock";
// import { searchMock } from "../mocks/searchMock";

export async function originalSearchResults(q: string) {
  const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=5`);
  const data = await res.json();
  return data;
  // return searchMock;
}

export function transformSearchResults(data: any): SearchApi {
  /* TODO: not sure this is the correct way to breadcrumb categories,
   * "camas" returns well
   * but "camaras" returns empty array
  */
  const categories = data.filters
    .find((filter: any) => filter.id === "category")
    ?.values[0]
    .path_from_root
    .map((filter: any) => filter.name)
    ?? [];
  console.log(data.results.map((result: any) => ({
    free_shipping: result.shipping,
  })));

  const items: BaseItem[] = data.results.map((result: any) => ({
    id: result.id,
    title: result.title,
    price: {
      currency: result.currency_id,
      amount: result.price,
      decimals: result.price, // TODO: ??
    },
    picture: result.thumbnail,
    condition: result.condition,
    free_shipping: result.shipping.free_shipping,
  }));

  return {
    data: {
      author: authorMock,
      categories,
      items,
    },
    error: null,
  };
}


export async function GET(request: NextRequest): Promise<NextResponse<SearchApi>> {
  try {
    const query = request.nextUrl.searchParams.get("q");
    if (!query) {
      return NextResponse.json({
        data: null,
        error: "Not query in items search",
      }, { status: 400 });
    }
    const data = await originalSearchResults(query);
    if (!data?.results?.length) {
      return NextResponse.json({
        data: null,
        error: "Not Found",
      }, { status: 404 });
    }
    const searchData = transformSearchResults(data);
    return NextResponse.json(searchData);
  } catch(error) {
    return NextResponse.json({
      data: null,
      error: (error as unknown as Error).message,
    }, { status: 500 });
  }
}
