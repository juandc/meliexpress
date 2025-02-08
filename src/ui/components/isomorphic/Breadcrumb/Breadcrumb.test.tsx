import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  const mockCategories = ["Home", "Electronics", "Laptops"];

  it("renders breadcrumb categories", () => {
    render(<Breadcrumb categories={mockCategories} />);
    mockCategories.forEach((category, index) => {
      const categoryElement = screen.getByText(category);
      expect(categoryElement).toBeInTheDocument();
      if (index === mockCategories.length - 1) {
        expect(categoryElement.tagName).toBe("B");
      } else {
        expect(categoryElement.tagName).toBe("SPAN");
      }
    });
  });

  it("renders separators correctly", () => {
    render(<Breadcrumb categories={mockCategories} />);
    const breadcrumb = screen.getByTestId("breadcrumb");
    const separators = breadcrumb.innerHTML.match(/&gt;/g);
    expect(separators?.length).toBe(mockCategories.length - 1);
  });
});
