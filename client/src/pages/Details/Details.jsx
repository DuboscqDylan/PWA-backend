import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchDetails } from "../../services/api";
import { Star } from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { FavoriteButton } from "../../components/Buttons/FavoriteButton";
import { useTranslation } from "react-i18next";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export const Details = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDetails(id);
        setSong(data);
      } catch (error) {
        setError(error.message || t("error"));
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  const isFav = isFavorite(song?.id);

  if (loading) return <LoadingState text={t("loading")} />;
  if (error) return <ErrorState text={error} />;
  if (!song) return <EmptyState text={t("songNotFound")} />;

  return (
    <div className="p-6 flex justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="flex flex-col md:flex-row items-stretch gap-6 max-w-4xl w-full">
        <div className="w-full md:w-64 h-64 flex-shrink-0">
          <img
            src={song.cover}
            alt={`${song.name} cover`}
            className="h-64 w-64 rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm min-h-64">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold leading-none">{song.name}</h1>
                <FavoriteButton
                  isFav={isFav}
                  onToggle={() => toggleFavorite(song.id)}
                />
              </div>
              <p className="text-[var(--color-text-secondary)] capitalize">
                {song.artist?.name || t("unknownArtist")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
            <p>
              <span className="text-[var(--color-text-muted)]">
                {t("genre")}:{" "}
              </span>
              {song.genre}
            </p>
            <p>
              <span className="text-[var(--color-text-muted)]">
                {t("album")}:{" "}
              </span>
              {song.album}
            </p>
            <p>
              <span className="text-[var(--color-text-muted)]">
                {t("releaseDate")}:{" "}
              </span>
              {new Date(song.releaseDate).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-1">
              <span className="text-[var(--color-text-muted)]">
                {t("rating")}:{" "}
              </span>
              {song.rating}
              <Star className="w-4 h-4 inline" />
            </p>
            <p>
              <span className="text-[var(--color-text-muted)]">
                {t("duration")}:{" "}
              </span>
              {Math.floor(song.duration / 60)}:
              {String(song.duration % 60).padStart(2, "0")} min
            </p>
            <p>
              <span className="text-[var(--color-text-muted)]">
                {t("plays")}:{" "}
              </span>
              {song.plays}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};