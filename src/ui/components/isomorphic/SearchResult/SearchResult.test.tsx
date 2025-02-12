import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SearchResult } from "./SearchResult";
import { itemMock } from "@/mocks/itemMock";

describe("SearchResult", () => {
  it("renders item details", () => {
    render(<SearchResult {...itemMock.item} />);
    const titles = screen.getAllByText(itemMock.item.title);
    const price = screen.getByText(`$ ${itemMock.item.price.amount}`);
    const freeShipping = screen.getByAltText("Free Shipping");
    const image = screen.getByAltText(itemMock.item.title);

    expect(titles.length).toBe(2);
    expect(titles[0]).toHaveClass("SearchResult_title__mobile");
    expect(titles[1]).toHaveClass("SearchResult_title__desktop");
    expect(price).toBeInTheDocument();
    expect(freeShipping).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", itemMock.item.picture);
  });

  it("renders link with correct href", () => {
    render(<SearchResult {...itemMock.item} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/items/item-1-1`);
  });

  it("applies custom classes for first item", () => {
    render(<SearchResult {...itemMock.item} isFirst={true} />);
    const article = screen.getByRole("article");
    expect(article).toHaveClass("SearchResult__first");
  });

  it("renders additional data element", () => {
    render((
      <SearchResult
        {...itemMock.item}
        additionalDataEl={<p>Additional data</p>}
      />
    ));
    const additionalData = screen.getByText("Additional data");
    expect(additionalData).toBeInTheDocument();
  });
});
