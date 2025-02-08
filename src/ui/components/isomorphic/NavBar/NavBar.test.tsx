import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  it("renders a nav element", () => {
    render(<NavBar>Navbar</NavBar>);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    const navText = screen.getByText("Navbar");
    expect(navText).toBeInTheDocument();
  });

  it("applies custom classes to inner container", () => {
    render(<NavBar innerContainerClassName="inner_custom_class" />);
    const nav = screen.getByRole("navigation");
    const innerContainer = nav.firstChild;
    expect(innerContainer).toHaveClass("inner_custom_class");
  });
});
