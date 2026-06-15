import { useState, useEffect } from "react";
import { ListSongs } from "../../components/ListSongs/ListSongs";
import { useFavorites } from "../../contexts/FavoritesContext";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { filterSongs } from "../../services/search";
import { useTranslation } from "react-i18next";
import { fetchSongs } from "../../services/api";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { useMemo } from "react";

export const Favorites = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const getSongs = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchSongs();
        setAllSongs(data);
      } catch (error) {
        setError(error.message || t("error"));
      } finally {
        setLoading(false);
      }
    };
    getSongs();
  }, []);

  const favoriteSongs = useMemo(() => {
    return allSongs.filter((song) => favoriteIds.includes(song.id));
  }, [allSongs, favoriteIds]);

  const filteredFavorites = useMemo(() => {
    return filterSongs(favoriteSongs, search);
  }, [favoriteSongs, search]);

  if (loading) return <LoadingState text={t("loading")} />;
  if (error) return <ErrorState text={error} />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
        {t("yourfavorites")} ❤️
      </h2>

      <SearchBar search={search} setSearch={setSearch} />

      {filteredFavorites.length === 0 ? (
        search !== "" ? (
          <EmptyState text={t("noResults")} />
        ) : (
          <EmptyState text={t("noFavorites")} />
        )
      ) : (
        <ListSongs
          list={filteredFavorites}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};
