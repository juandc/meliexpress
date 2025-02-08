import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

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
        onInputChange={handleChange}
        className="custom_class"
        data-testid="input"
      />
    ));
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toHaveClass("custom_class");
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

  it("applies custom classes to input", () => {
    render(<SearchBar className="custom_class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom_class");
  });
});
