import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { itemMock } from "@/mocks/itemMock";
import { NavBarContainer } from "./NavBarContainer";
import esDictionary from "@/ui/dictionaries/es";

const navCopys = esDictionary.shared.navbar;

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
    const homeLink = screen.getByRole("link", {
      name: navCopys.homeLinkTitle,
    });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders search input", () => {
    render(<NavBarContainer />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<NavBarContainer />);
    expect(screen.getByTitle(navCopys.searchBtnTitle)).toBeInTheDocument();
  });

  it("renders favorites link", () => {
    render(<NavBarContainer />);
    const favoritesLink = screen.getByRole("link", {
      name: navCopys.favoritesLinkTitle,
    });
    expect(favoritesLink).toHaveAttribute("href", "/favorites");
  });

  it("clicking the button does nothing if input value is empty", () => {
    render(<NavBarContainer />);
    fireEvent.click(screen.getByTitle(navCopys.searchBtnTitle));
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
    fireEvent.click(screen.getByTitle(navCopys.searchBtnTitle));
    expect(mockPush).toHaveBeenCalledWith("/items?search=test");
  });

  it("pressing Enter key navigates to search url if input value has content", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockPush).toHaveBeenCalledWith("/items?search=test");
  });

  it("clicking home link resets input value", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getAllByRole("link")[0]);
    expect(input).toHaveValue("");
  });

  it("displays suggestions when typing in the search input", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const suggestion = screen.getByTitle("test-1");
    expect(suggestion).toBeInTheDocument();
  });

  it("selects a suggestion when clicking on it", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByTitle("test-1"));
    expect(input).toHaveValue("test-1");
  });

  it("displays preview items when typing in the search input", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTitle(itemMock.item.title)).toBeInTheDocument();
  });

  it("focuses input when a suggestion is selected", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByTitle("test-1"));
    expect(input).toHaveFocus();
  });

  it("blurs input when Escape key is pressed", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).not.toHaveFocus();
  });

  it("keeps suggestions box open when focusing on a suggestion", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const suggestion = screen.getByTitle("test-1");
    fireEvent.focus(suggestion);
    expect(suggestion).toBeInTheDocument();
  });

  it("closes suggestions box when blurring from input", () => {
    render(<NavBarContainer />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.blur(input);
    expect(screen.queryByTitle("test-1")).not.toBeInTheDocument();
  });
});
