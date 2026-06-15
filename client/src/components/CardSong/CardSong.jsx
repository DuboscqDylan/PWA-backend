import { FavoriteButton } from "../Buttons/FavoriteButton";
import { AddToPlaylistButton } from "../Buttons/AddToPlaylistButton";
import { NavLink } from "react-router-dom";

export const CardSong = ({ song, isFav, onToggle }) => {
  return (
    <NavLink to={`/songs/${song.id}`} className="block">
      <div className="flex items-stretch gap-4 bg-[var(--color-card)] rounded-lg p-3 shadow-sm hover:shadow-md hover:bg-[var(--color-card-hover)] transition-all w-full max-w-md cursor-pointer">
        <div className="flex items-stretch gap-4 min-w-0 flex-1">
          <div className="flex-shrink-0">
            <img
              src={song.cover}
              alt={`${song.name} cover`}
              className="h-24 w-24 rounded-md object-cover"
            />
          </div>

          <div className="min-w-0 h-24 flex flex-col justify-between">
            <h3 className="font-semibold text-base text-[var(--color-text)] truncate">
              {song.name}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] truncate capitalize">
              {song.artist?.name || "Unknown Artist"}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {song.genre}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-shrink-0 h-24">
          <div className="flex-1 flex items-center justify-center relative group">
            <FavoriteButton isFav={isFav} onToggle={() => onToggle(song.id)} />
            <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-[var(--color-tooltip-bg)] text-[var(--color-tooltip-text)] text-xs rounded py-1 px-2 whitespace-nowrap shadow">
                {isFav ? "Quitar de Favoritos" : "Agregar a Favoritos"}
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <AddToPlaylistButton />
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </NavLink>
  );
};
