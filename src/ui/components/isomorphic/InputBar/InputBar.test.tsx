import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InputBar } from "./InputBar";

describe("InputBar", () => {
  it("renders an input", () => {
    render(<InputBar />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("forwards native props", () => {
    const handleClick = jest.fn();
    render((
      <InputBar
        onClick={handleClick}
        data-testid="input"
        className="custom_class"
      />
    ));
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toHaveClass("custom_class");
    input.value = "test";
    input.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies custom classes", () => {
    render(<InputBar className="custom_class" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom_class");
  });
});
