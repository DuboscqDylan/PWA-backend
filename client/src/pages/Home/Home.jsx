import { useState, useMemo } from "react";
import { ListSongs } from "../../components/ListSongs/ListSongs";
import { useFavorites } from "../../contexts/FavoritesContext";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { filterSongs } from "../../services/search";
import { useSongsPagination } from "../../hooks/useSongsPagination";
import { Sentinel } from "../../components/Sentinel/Sentinel";
import { useTranslation } from "react-i18next";
import { ErrorState } from "../../components/ErrorState/ErrorState";
import { LoadingState } from "../../components/LoadingState/LoadingState";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export const Home = () => {
  const { songs, loading, error, hasMore, loadMore } = useSongsPagination();
  const [search, setSearch] = useState("");
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();
  const filteredSongs = useMemo(() => {
    return filterSongs(songs, search);
  }, [songs, search]);

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />

      {filteredSongs.length === 0 ? (
        <p className="text-gray-400 mt-4 text-center">{t("noResults")}</p>
      ) : (
        <ListSongs
          list={filteredSongs}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {loading && <LoadingState text={t("loadingMore")} />}
      {!hasMore && songs.length > 0 && !loading && (
        <EmptyState text={t("noMoreSongs")} />
      )}

      {search === "" && (
        <Sentinel onIntersect={loadMore} loading={loading} hasMore={hasMore} />
      )}
    </div>
  );
};
