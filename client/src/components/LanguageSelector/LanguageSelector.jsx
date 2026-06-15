import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <button onClick={changeLanguage}>
      <img
        src={i18n.language === "es" ? "/flags/es.png" : "/flags/us.png"}
        alt="language"
        title={
          i18n.language === "es" ? "Cambiar a inglés" : "Switch to Spanish"
        }
        className="w-6 hover:scale-110 transition cursor-pointer"
      />
    </button>
  );
};
