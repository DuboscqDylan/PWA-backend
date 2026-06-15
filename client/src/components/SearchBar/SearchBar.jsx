import { useTranslation } from "react-i18next";

export const SearchBar = ({ search, setSearch }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      placeholder={t("search")}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 rounded-full transition
                       bg-white text-black border
                       dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  );
};
