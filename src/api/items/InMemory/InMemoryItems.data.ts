import { searchMock } from "@/api/mocks/searchMock";
import { itemMock } from "@/api/mocks/itemMock";
import { itemDescriptionMock } from "@/api/mocks/itemDescriptionMock";
import { categoriesMock } from "@/api/mocks/categoriesMock";

export class InMemoryItemsData {
  public static async mockSearchResults(q: string) {
    console.log(q);
    return searchMock;
  }

  public static async mockItem(id: string) {
    console.log(id);
    return {
      data: itemMock,
      dataDesc: itemDescriptionMock,
      dataCategory: categoriesMock,
    };
  }
}
