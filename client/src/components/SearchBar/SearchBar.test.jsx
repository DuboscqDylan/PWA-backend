import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";
import { expect } from "vitest";

//al usar useTraslate puede que el test falle si no esta mockeado
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe("SearchBar", () => {
    it("renderiza el input de búsqueda", () => {
        render (
            <SearchBar 
                search=""
                setSearch={() => {}}
            />
        );

        const input = screen.getByRole("textbox");
        
        expect(input).toBeInTheDocument();

    });

    it("muestra el valor recibido en search", () => {
        render(
            <SearchBar
             search= "Queen"
             setSearch={() => {}}
        />
        );

        const input = screen.getByDisplayValue("Queen");

        expect(input).toBeInTheDocument();
    });

    it("llama a setSearch cuando el usuario escribe", async () => {
        const mockSetSearch = vi.fn();

        render(
            <SearchBar
              search=""
              setSearch={mockSetSearch}
            />
        );

        const input = screen.getByRole("textbox");

        await userEvent.type(input, "Rock");

        expect(mockSetSearch).toHaveBeenCalled();
    });
});