import { Heart } from "lucide-react";

export const FavoriteButton = ({ isFav, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="transition-transform duration-200 hover:scale-110"
      aria-label={isFav ? "Quitar de Favoritos" : "Agregar a Favoritos"}
    >
      <Heart
        size={20}
        className={`transition-all hover:text-[var(--color-accent)] ${
          isFav
            ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
            : "text-gray-400"
        }`}
      />
    </button>
  );
};
