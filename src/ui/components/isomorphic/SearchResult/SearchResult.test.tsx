import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SearchResult } from "./SearchResult";
import { itemMock } from "@/api/mocks/itemMock";
import { getItemShortTitle, getItemHref } from "./utils";

describe("SearchResult getItemShortTitle", () => {
  it("should return full title if shorter than specified", () => {
    const title = "Short title";
    const result = getItemShortTitle(title, true, 20);
    expect(result).toBe(title);
  });

  it("should return truncated title with ellipsis if longer than specified", () => {
    const title = "This is a very long title that needs to be shortened";
    const result = getItemShortTitle(title, true, 20);
    expect(result).toBe("This is a very long ...");
  });

  it("should return truncated title without ellipsis if specified", () => {
    const title = "This is a very long title that needs to be shortened";
    const result = getItemShortTitle(title, false, 20);
    expect(result).toBe("This is a very long ");
  });
});

describe("SearchResult getItemHref", () => {
  it("should return the correct href for an item with a title", () => {
    const title = "Sample Item";
    const id = "12345";
    const result = getItemHref(title, id);
    expect(result).toBe("/items/sample-item-12345");
  });

  it("should return the correct href for an item with a very long title", () => {
    const title = "This is a very long title that needs to be shortened";
    const id = "12345";
    const result = getItemHref(title, id);
    expect(result).toBe("/items/this-is-a-very-long-title-that-12345");
  });

  it("should return the correct href for an item without a title", () => {
    const title = "";
    const id = "12345";
    const result = getItemHref(title, id);
    expect(result).toBe("/items/12345");
  });
});

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
});
