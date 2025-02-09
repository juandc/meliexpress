import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductDetail } from "./ProductDetail";
import { itemMock } from "@/mocks/itemMock";

describe("ProductDetail", () => {
  it("renders product details", () => {
    render(<ProductDetail {...itemMock.item} />);
    const title = screen.getByRole("heading", { level: 1 });
    const price = screen.getByText(`$ ${itemMock.item.price.amount}`);
    const condition = screen.getByText(`Nuevo`);
    const soldQuantity = screen.getByText(`${itemMock.item.sold_quantity} vendidos`);
    const description = screen.getByText(itemMock.item.description.split("\n")[0]);
    const image = screen.getByRole("img");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(itemMock.item.title);
    expect(price).toBeInTheDocument();
    expect(condition).toBeInTheDocument();
    expect(soldQuantity).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", itemMock.item.picture);
  });

  it("renders additional data element", () => {
    render(<ProductDetail {...itemMock.item} additionalDataEl={<div data-testid="additional-data">Additional Data</div>} />);
    const additionalData = screen.getByTestId("additional-data");
    expect(additionalData).toBeInTheDocument();
  });

  it("renders buy button", () => {
    render(<ProductDetail {...itemMock.item} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Comprar");
  });

  it("doesn't render description if no length", () => {
    render(<ProductDetail {...itemMock.item} description="" />);
    const description = screen.queryByText("Descripción del Producto");
    expect(description).not.toBeInTheDocument();
  });
});
