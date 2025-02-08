import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BaseContent } from "./BaseContent";

describe("BaseContent", () => {
  it("renders children", () => {
    render(<BaseContent>Test Content</BaseContent>);
    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
  });

  it("applies custom class", () => {
    render((
      <BaseContent className="custom_class">
        Test Content
      </BaseContent>
    ));
    const content = screen.getByText("Test Content");
    expect(content).toHaveClass("custom_class");
  });

  it("renders breadcrumb", () => {
    render((
      <BaseContent
        breadcrumb={"Breadcrumb"}
      >
        Test Content
      </BaseContent>
    ));
    const breadcrumb = screen.getByText("Breadcrumb");
    expect(breadcrumb).toBeInTheDocument();
  });

  it("applies breadcrumb class", () => {
    render((
      <BaseContent
        breadcrumb={"Breadcrumb"}
        breadcrumbClassName="breadcrumb_class"
      >
        Test Content
      </BaseContent>
    ));
    const breadcrumb = screen.getByText("Breadcrumb");
    expect(breadcrumb).toHaveClass("breadcrumb_class");
  });

  it("applies isEmpty class", () => {
    render(<BaseContent isEmpty>Test Content</BaseContent>);
    const content = screen.getByText("Test Content");
    expect(content).toHaveClass("BaseContent_content__isEmpty");
  });
});
