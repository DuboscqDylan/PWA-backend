import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DarkModeToggle } from "./DarkModeToggle";

describe("DarkModeToggle", () => {
  test("renderiza correctamente", () => {
    render(<DarkModeToggle darkMode={false} setDarkMode={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  test("llama setDarkMode con true cuando darkMode=false", async () => {
    const user = userEvent.setup();

    const setDarkModeMock = vi.fn();

    render(<DarkModeToggle darkMode={false} setDarkMode={setDarkModeMock} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(setDarkModeMock).toHaveBeenCalledWith(true);
  });

  test("llama setDarkMode con false cuando darkMode=true", async () => {
    const user = userEvent.setup();

    const setDarkModeMock = vi.fn();

    render(<DarkModeToggle darkMode={true} setDarkMode={setDarkModeMock} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(setDarkModeMock).toHaveBeenCalledWith(false);
  });

  test("muestra clases de dark mode cuando darkMode=true", () => {
    render(<DarkModeToggle darkMode={true} setDarkMode={() => {}} />);

    const movingCircle = document.querySelector("span");

    expect(movingCircle).toHaveClass("translate-x-6");
    expect(movingCircle).toHaveClass("border-blue-950");
  });

  test("muestra clases de light mode cuando darkMode=false", () => {
    render(<DarkModeToggle darkMode={false} setDarkMode={() => {}} />);

    const movingCircle = document.querySelector("span");

    expect(movingCircle).toHaveClass("translate-x-0");
    expect(movingCircle).toHaveClass("border-yellow-600");
  });
});
