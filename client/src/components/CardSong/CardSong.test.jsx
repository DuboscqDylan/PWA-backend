import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { CardSong } from "./CardSong";

describe("CardSong", () => {
  const mockSong = {
    id: "123",
    name: "Bohemian Rhapsody",
    artistId: "queen",
    genre: "rock",
    cover: "https://example.com/cover.jpg",
  };

  test("renderiza la información de la canción", () => {
    render(
      <MemoryRouter>
        <CardSong song={mockSong} isFav={false} onToggle={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/bohemian rhapsody/i)).toBeInTheDocument();
    expect(screen.getByText(/queen/i)).toBeInTheDocument();
    expect(screen.getByText(/rock/i)).toBeInTheDocument();
  });

  test("genera el link correcto hacia details", () => {
    render(
      <MemoryRouter>
        <CardSong song={mockSong} isFav={false} onToggle={() => {}} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/songs/123");
  });

  test("llama onToggle con el id correcto", async () => {
    const user = userEvent.setup();
    const onToggleMock = vi.fn();

    render(
      <MemoryRouter>
        <CardSong song={mockSong} isFav={false} onToggle={onToggleMock} />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: /agregar a favoritos/i,
    });

    await user.click(button);

    expect(onToggleMock).toHaveBeenCalledWith("123");
  });

  test("muestra Unknown Artist si no hay artistId", () => {
    const songWithoutArtist = {
      ...mockSong,
      artistId: null,
    };

    render(
      <MemoryRouter>
        <CardSong song={songWithoutArtist} isFav={false} onToggle={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/unknown artist/i)).toBeInTheDocument();
  });
});
