import { render, screen } from "@testing-library/react";
import { ErrorState } from "./ErrorState";
import { expect } from "vitest";

describe("ErrorState", () => {
    it("muestra el mensaje de error recibido", () => {
        render(
            <ErrorState message="No se pudieron cargar las canciones" />

        );

        expect(
            screen.getByText(/no se pudieron cargar las canciones/i)
        ).toBeInTheDocument();
    });

    it("muestra la palabra Error", () => {
        render(
            <ErrorState message="Fallo de conexión" />
        );

        expect (
            screen.getByText(/error:/i)

        ).toBeInTheDocument();
    });
});