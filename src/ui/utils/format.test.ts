import { clipItemTitle, getItemHref } from "@/ui/utils/format";

describe("clipItemTitle", () => {
  it("should return full title if shorter than specified", () => {
    const title = "Short title";
    const result = clipItemTitle(title, true, 20);
    expect(result).toBe(title);
  });

  it("should return truncated title with ellipsis if longer than specified", () => {
    const title = "This is a very long title that needs to be shortened";
    const result = clipItemTitle(title, true, 20);
    expect(result).toBe("This is a very lo...");
  });

  it("should return truncated title without ellipsis if specified", () => {
    const title = "This is a very long title that needs to be shortened";
    const result = clipItemTitle(title, false, 20);
    expect(result).toBe("This is a very long ");
  });
});

describe("getItemHref", () => {
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