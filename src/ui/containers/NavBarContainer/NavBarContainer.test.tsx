import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { act } from "react";
import { searchMock } from "@/mocks/searchMock";
import esDictionary from "@/ui/dictionaries/es";
import { NavBarContainer } from "./NavBarContainer";
import { getItemHref } from "@/ui/utils/format";

const navCopys = esDictionary.shared.navbar;

jest.useFakeTimers();

const open = jest.fn()
Object.defineProperty(window, 'open', open);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/ui/services/getSearchResults", () => ({
  getSearchResults: jest.fn(() => Promise.resolve({ data: searchMock })),
}));

describe("NavBarContainer", () => {
  const mockPush = jest.fn();
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn()
      },
    });
  });

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    localStorage.setItem = setItemMock;
    localStorage.getItem = getItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
    jest.clearAllMocks();
  });

  describe("renders everything", () => {
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
  });

  describe("navigates correctly", () => {
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
  });

  describe("suggestions", () => {
    it("saves query in localstorage after searching btn click", async () => {
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      fireEvent.click(screen.getByTitle(navCopys.searchBtnTitle));
      await act(async () => jest.advanceTimersByTime(2000));
      expect(localStorage.getItem).toHaveBeenCalledWith("suggestions");
      expect(localStorage.setItem).toHaveBeenCalledWith("suggestions", expect.stringContaining(query));
    });

    it("doesnt displays suggestions when focus (first time)", async () => {
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestionsContainer = screen.queryByTestId("searchbar-suggestions");
      expect(suggestionsContainer?.children).toHaveLength(0);
    });

    it("displays default suggestions when focus (not first time)", async () => {
      getItemMock.mockImplementation(() => "first test");
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestionsContainer = screen.getByTestId("searchbar-suggestions");
      expect(suggestionsContainer).toBeInTheDocument();
      const suggestion = screen.getByTitle("first test");
      expect(suggestion).toBeInTheDocument();
    });

    it("displays suggestions when typing (not first time)", async () => {
      getItemMock.mockImplementation(() => "first test");
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestionsContainer = screen.getByTestId("searchbar-suggestions");
      expect(suggestionsContainer).toBeInTheDocument();
      const suggestion = screen.getByTitle("first test");
      expect(suggestion).toBeInTheDocument();
    });

    it("doesnt displays suggestions when not matching previously saved", async () => {
      getItemMock.mockImplementation(() => "otra cosa");
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestionsContainer = screen.getByTestId("searchbar-suggestions");
      expect(suggestionsContainer).toBeInTheDocument();
      expect(suggestionsContainer?.children).toHaveLength(0);
    });

    it("selects a suggestion when clicking on it", async () => {
      getItemMock.mockImplementation(() => "first test");
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestion = screen.getByTitle("first test");
      fireEvent.click(suggestion);
      expect(input).toHaveValue("first test");
    });

    it("focuses input when a suggestion is selected", async () => {
      getItemMock.mockImplementation(() => "first test");
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestion = screen.getByTitle("first test");
      fireEvent.click(suggestion);
      expect(input).toHaveFocus();
    });

    it("blurs input when Escape key is pressed", async () => {
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      fireEvent.keyDown(input, { key: "Escape" });
      expect(input).not.toHaveFocus();
    });

    it("keeps suggestions box open when focusing on a suggestion", async () => {
      getItemMock.mockImplementation(() => "first test");
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      const suggestion = screen.getByTitle("first test");
      fireEvent.focus(suggestion);
      const suggestionsContainer = screen.getByTestId("searchbar-suggestions");
      expect(suggestionsContainer).toBeInTheDocument();
    });

    it("closes suggestions box when blurring from input", async () => {
      getItemMock.mockImplementation(() => "first test");
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      await act(async () => jest.advanceTimersByTime(2000));
      fireEvent.blur(input);
      const suggestionsContainer = screen.queryByTestId("searchbar-suggestions");
      expect(suggestionsContainer).not.toBeInTheDocument();
    });
  });

  describe("preview items", () => {
    it("fetches and displays preview items when typing", async () => {
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      await act(async () => jest.advanceTimersByTime(2000));
      const previewContainer = screen.getByTestId("searchbar-preview");
      expect(previewContainer).toBeInTheDocument();
      const previewItem = screen.getByTitle(searchMock.items[0].title);
      expect(previewItem).toBeInTheDocument();
    });

    it("does not fetch preview items if query is empty", async () => {
      render(<NavBarContainer />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "" } });
      await act(async () => jest.advanceTimersByTime(2000));
      const previewContainer = screen.queryByTestId("searchbar-preview");
      expect(previewContainer?.children).toHaveLength(0);
    });

    it("correct href to item details page on preview item link", async () => {
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      await act(async () => jest.advanceTimersByTime(2000));
      const previewItem = screen.getByTitle(searchMock.items[0].title);
      const href = previewItem.getAttribute("data-previewlink");
      const expectedHref = getItemHref(searchMock.items[0].title, searchMock.items[0].id);
      expect(href).toBe(expectedHref);
    });

    it("keeps preview box open when focusing on a preview item", async () => {
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      await act(async () => jest.advanceTimersByTime(2000));
      const previewItem = screen.getByTitle(searchMock.items[0].title);
      fireEvent.focus(previewItem);
      const previewContainer = screen.getByTestId("searchbar-preview");
      expect(previewContainer).toBeInTheDocument();
    });

    it("closes preview box when blurring from input", async () => {
      render(<NavBarContainer />);
      const query = "test";
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: query } });
      await act(async () => jest.advanceTimersByTime(2000));
      fireEvent.blur(input);
      const previewContainer = screen.queryByTestId("searchbar-preview");
      expect(previewContainer).not.toBeInTheDocument();
    });
  });
});
