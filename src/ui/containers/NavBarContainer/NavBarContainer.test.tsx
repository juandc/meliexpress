import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { NavBarContainer } from "./NavBarContainer";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NavBarContainer", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders navbar", () => {
    render(<NavBarContainer />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders home link", () => {
    render(<NavBarContainer />);
    const homeLink = screen.getAllByRole("link")[0];
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders search input", () => {
    render(<NavBarContainer />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<NavBarContainer />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders favorites link", () => {
    render(<NavBarContainer />);
    const favoritesLink = screen.getAllByRole("link")[1];
    expect(favoritesLink).toHaveAttribute("href", "/favorites");
  });

  it("clicking the button does nothing if input value is empty", () => {
    render(<NavBarContainer />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("pressing Enter key does nothing if input value is empty", () => {
    render(<NavBarContainer />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("clicking the button navigates to search url if input value has content", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/items?q=test");
  });

  it("pressing Enter key navigates to search url if input value has content", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockPush).toHaveBeenCalledWith("/items?q=test");
  });

  it("clicking home link resets input value", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getAllByRole("link")[0]);
    expect(input).toHaveValue("");
  });
});
