import { originalSearchMock } from "@/mocks/originalSearchMock";
import { originalItemMock } from "@/mocks/originalItemMock";
import { originalItemDescriptionMock } from "@/mocks/originalItemDescriptionMock";
import { originalCategoriesMock } from "@/mocks/originalCategoriesMock";

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
