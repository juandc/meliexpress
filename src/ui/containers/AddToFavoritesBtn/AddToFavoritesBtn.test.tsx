import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import { AddToFavoritesBtn } from "./AddToFavoritesBtn";
import { itemMock } from "@/mocks/itemMock";
import * as saveService from "@/ui/services/saveFavoriteItem";
import * as removeService from "@/ui/services/removeFavoriteItem";

jest.mock("@/ui/services/saveFavoriteItem", () => ({
  saveFavoriteItem: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("@/ui/services/removeFavoriteItem", () => ({
  removeFavoriteItem: jest.fn(() => Promise.resolve(true)),
}));

describe("AddToFavoritesBtn", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  it("renders add to favorites button", () => {
    render(<AddToFavoritesBtn {...itemMock.item} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("if not favorite, starts adding to favorites", () => {
    render(<AddToFavoritesBtn {...itemMock.item} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Agregar a Favoritos");
  });

  it("changes to saving on click", async () => {
    jest.spyOn(saveService, "saveFavoriteItem").mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve(true), 10))
    );
    render(<AddToFavoritesBtn {...itemMock.item} />);
    const btn = screen.getByRole("button");
    await act(async () => { await fireEvent.click(btn) });
    expect(btn).toHaveTextContent("Agregando...");
  });

  it("changes to delete when saving completes", async () => {
    jest.spyOn(saveService, "saveFavoriteItem").mockImplementationOnce(
      () => Promise.resolve(true)
    );
    render(<AddToFavoritesBtn {...itemMock.item} />);
    const btn = screen.getByRole("button");
    await act(async () => {
      await fireEvent.click(btn);
      await new Promise(resolve => setTimeout(() => resolve(true), 10));
    });
    expect(btn).toHaveTextContent("Eliminar de favoritos");
    const link = screen.getByText("Ver favoritos");
    expect(link).toBeInTheDocument();
  });

  it("if favorite, starts removing from favorites and displaying favorites link", async () => {
    render(<AddToFavoritesBtn {...itemMock.item} favorite={true} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Eliminar de favoritos");
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Ver favoritos");
  });

  it("changes to removing on click", async () => {
    jest.spyOn(removeService, "removeFavoriteItem").mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve(true), 10))
    );
    render(<AddToFavoritesBtn {...itemMock.item} favorite />);
    const btn = screen.getByRole("button");
    await act(async () => { await fireEvent.click(btn); });
    expect(btn).toHaveTextContent("Eliminando...");
    const link = screen.queryByText("Ver favoritos");
    expect(link).toBeNull();
  });

  it("changes to save when removing completes", async () => {
    jest.spyOn(removeService, "removeFavoriteItem").mockImplementationOnce(
      () => Promise.resolve(true)
    );
    render(<AddToFavoritesBtn {...itemMock.item} favorite />);
    const btn = screen.getByRole("button");
    await act(async () => {
      await fireEvent.click(btn);
      await new Promise(resolve => setTimeout(() => resolve(true), 10));
    });
    expect(btn).toHaveTextContent("Agregar a Favoritos");
  });

  it("changes to error on saving error", async () => {
    jest.spyOn(saveService, "saveFavoriteItem").mockImplementationOnce(
      () => Promise.resolve(false)
    );
    render(<AddToFavoritesBtn {...itemMock.item} />);
    const btn = screen.getByRole("button");
    await act(async () => { await fireEvent.click(btn) });
    expect(btn).toHaveTextContent("Error, intentar de nuevo");
    await act(async () => { await fireEvent.click(btn) });
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("changes to error on saving reject", async () => {
    jest.spyOn(saveService, "saveFavoriteItem").mockImplementationOnce(
      () => Promise.reject()
    );
    render(<AddToFavoritesBtn {...itemMock.item} />);
    const btn = screen.getByRole("button");
    await act(async () => { await fireEvent.click(btn); });
    expect(btn).toHaveTextContent("Error, intentar de nuevo");
    await act(async () => { await fireEvent.click(btn) });
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("changes to error on removing error", async () => {
    jest.spyOn(removeService, "removeFavoriteItem").mockImplementationOnce(
      () => Promise.resolve(false)
    );
    render(<AddToFavoritesBtn {...itemMock.item} favorite />);
    const btn = screen.getByRole("button");
    await act(async () => { await fireEvent.click(btn); });
    expect(btn).toHaveTextContent("Error, intentar de nuevo");
    await act(async () => { await fireEvent.click(btn); });
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("changes to error on removing reject", async () => {
    jest.spyOn(removeService, "removeFavoriteItem").mockImplementationOnce(
      () => Promise.reject()
    );
    render(<AddToFavoritesBtn {...itemMock.item} favorite />);
    const btn = screen.getByRole("button");
    await act(async () => { await fireEvent.click(btn) });
    expect(btn).toHaveTextContent("Error, intentar de nuevo");
  });

  it("propagates sm class to button", () => {
    render(<AddToFavoritesBtn {...itemMock.item} size="sm" favorite />);
    const btn = screen.getByRole("button");
    const link = screen.getByRole("link");
    expect(btn).toHaveClass("Button__sm");
    expect(link).toHaveClass("Button__sm");
  });
});
