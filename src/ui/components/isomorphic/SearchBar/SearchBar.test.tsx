import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";
import { itemMock } from "@/mocks/itemMock";

describe("SearchBar", () => {
  it("renders an input and a button", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("forwards props to input", () => {
    const handleChange = jest.fn();
    render((
      <SearchBar
        id="sid"
        data-testid="input"
        onInputChange={handleChange}
      />
    ));
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toHaveAttribute("id", "sid");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards props to button", () => {
    const handleClick = jest.fn();
    render(<SearchBar onBtnClick={handleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies custom classes to container", () => {
    render(<SearchBar className="custom" data-testid="input" />);
    const input = screen.getByTestId("input");
    const parent = input.parentElement;
    expect(parent).toHaveClass("custom");
  });

  it("displays suggestions when typing in the input", () => {
    render(<SearchBar suggestions={{ options: ["test-1", "test-2", "test-3"] }} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTitle("test-1")).toBeInTheDocument();
    expect(screen.getByTitle("test-2")).toBeInTheDocument();
    expect(screen.getByTitle("test-3")).toBeInTheDocument();
  });

  it("selects a suggestion when clicking on it", () => {
    const handleSelect = jest.fn();
    render(<SearchBar suggestions={{ options: ["test-1", "test-2", "test-3"], onSelect: handleSelect }} />);
    fireEvent.click(screen.getByTitle("test-1"));
    expect(handleSelect).toHaveBeenCalledWith("test-1");
  });

  it("displays preview items when typing in the input", () => {
    render(<SearchBar preview={{ items: [itemMock.item] }} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTitle(itemMock.item.title)).toBeInTheDocument();
  });
});
