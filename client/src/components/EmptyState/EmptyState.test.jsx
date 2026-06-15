import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  test("renderiza el texto recibido", () => {
    render(<EmptyState text="No hay canciones" />);

    expect(screen.getByText(/no hay canciones/i)).toBeInTheDocument();
  });
});
