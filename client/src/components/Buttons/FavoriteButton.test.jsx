import { describe, expect, test, vi } from "vitest";
import { FavoriteButton } from "./FavoriteButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FavoriteButton", () => {
  test("renderiza button con isFav=false", () => {
    render(<FavoriteButton isFav={false} onToggle={() => {}} />);
    const button = screen.getByRole("button", {
      name: /agregar a favoritos/i,
    });
    expect(button).toBeInTheDocument();
  });

  test("renderiza button con isFav=true", () => {
    render(<FavoriteButton isFav={true} onToggle={() => {}} />);
    const button = screen.getByRole("button", {
      name: /quitar de favoritos/i,
    });
    expect(button).toBeInTheDocument();
  });

  test("funciona onToggle al hacer click", async () => {
    const user = userEvent.setup();
    const onToggleMock = vi.fn();

    render(<FavoriteButton isFav={false} onToggle={onToggleMock} />);
    const button = screen.getByRole("button", {
      name: /agregar a favoritos/i,
    });

    await user.click(button);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  test("detiene la propagación del evento en parent", async () => {
    const user = userEvent.setup();

    const onToggleMock = vi.fn();
    const parentClickMock = vi.fn();

    render(
      <div onClick={parentClickMock}>
        <FavoriteButton isFav={false} onToggle={onToggleMock} />
      </div>,
    );

    const button = screen.getByRole("button", {
      name: /agregar a favoritos/i,
    });

    await user.click(button);

    expect(onToggleMock).toHaveBeenCalledTimes(1);

    expect(parentClickMock).not.toHaveBeenCalled();
  });
});
