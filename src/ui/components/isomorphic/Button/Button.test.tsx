import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Anchor, Button } from "./Button";

describe("Button", () => {
  it("renders a button", () => {
    render(<Button />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("forwards native props", () => {
    const handleClick = jest.fn();
    render((
      <Button
        onClick={handleClick}
        data-testid="button"
        className="custom_class"
      />
    ));
    const btn = screen.getByTestId("button");
    expect(btn).toHaveClass("custom_class");
    btn.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders variant classes button", () => {
    render((
      <>
        <Button variant="primary" data-testid="button-primary" />
        <Button variant="secondary" data-testid="button-secondary" />
        <Button variant="danger" data-testid="button-danger" />
        <Button variant="ghost" data-testid="button-ghost" />
      </>
    ));
    const primaryBtn = screen.getByTestId("button-primary");
    expect(primaryBtn).toHaveClass("Button__primary");
    const secondaryBtn = screen.getByTestId("button-secondary");
    expect(secondaryBtn).toHaveClass("Button__secondary");
    const dangerBtn = screen.getByTestId("button-danger");
    expect(dangerBtn).toHaveClass("Button__danger");
    const ghostBtn = screen.getByTestId("button-ghost");
    expect(ghostBtn).toHaveClass("Button__ghost");
  });
});

describe("Anchor", () => {
  it("renders a Anchor", () => {
    render(<Anchor href="/" />);
    const btn = screen.getByRole("link");
    expect(btn).toBeInTheDocument();
  });
  it("forwards native props", () => {
    const handleClick = jest.fn();
    render((
      <Anchor
        href="/"
        onClick={handleClick}
        data-testid="anchor"
        className="custom_class"
      />
    ));
    const link = screen.getByTestId("anchor");
    expect(link).toHaveClass("custom_class");
    link.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders variant classes", () => {
    render((
      <>
        <Anchor href="/" variant="primary" data-testid="anchor-primary" />
        <Anchor href="/" variant="secondary" data-testid="anchor-secondary" />
        <Anchor href="/" variant="danger" data-testid="anchor-danger" />
        <Anchor href="/" variant="ghost" data-testid="anchor-ghost" />
      </>
    ));
    const primaryBtn = screen.getByTestId("anchor-primary");
    expect(primaryBtn).toHaveClass("Button__primary");
    const secondaryBtn = screen.getByTestId("anchor-secondary");
    expect(secondaryBtn).toHaveClass("Button__secondary");
    const dangerBtn = screen.getByTestId("anchor-danger");
    expect(dangerBtn).toHaveClass("Button__danger");
    const ghostBtn = screen.getByTestId("anchor-ghost");
    expect(ghostBtn).toHaveClass("Button__ghost");
  });
});
