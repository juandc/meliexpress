import { originalSearchMock } from "@/api/mocks/originalSearchMock";
import { originalItemMock } from "@/api/mocks/originalItemMock";
import { originalItemDescriptionMock } from "@/api/mocks/originalItemDescriptionMock";
import { originalCategoriesMock } from "@/api/mocks/originalCategoriesMock";

export class InMemoryItemsData {
  public static async mockSearchResults(q: string) {
    console.log(q);
    return originalSearchMock;
  }

  public static async mockItem(id: string) {
    console.log(id);
    return {
      data: originalItemMock,
      dataDesc: originalItemDescriptionMock,
      dataCategory: originalCategoriesMock,
    };
  }
}
