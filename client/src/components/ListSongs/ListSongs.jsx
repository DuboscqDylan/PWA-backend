import { CardSong } from "../CardSong/CardSong";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../EmptyState/EmptyState";

export const ListSongs = ({ list, isFavorite, onToggleFavorite }) => {
  const { t } = useTranslation();

  if (list.length === 0) {
    return (
      <>
        return <EmptyState text={t("emptyList")} />;
      </>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
        {list.map((element) => (
          <CardSong
            key={element.id}
            song={element}
            isFav={isFavorite(element.id)}
            onToggle={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
