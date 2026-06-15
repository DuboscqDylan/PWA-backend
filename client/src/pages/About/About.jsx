import { useTranslation } from "react-i18next";
import { Music, Heart, Globe, Moon, Info } from "lucide-react";

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-5xl mx-auto text-[var(--color-text)]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🎧 {t("SPOOFIFY")}</h1>
        <p className="text-[var(--color-text-secondary)]">
          {t("aboutDescription")}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">{t("features")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--color-card)] p-4 rounded-xl flex gap-3 items-center">
          <Music className="text-green-500" />
          <span>{t("featureSearch")}</span>
        </div>

        <div className="bg-[var(--color-card)] p-4 rounded-xl flex gap-3 items-center">
          <Heart className="text-red-500" />
          <span>{t("featureFavorites")}</span>
        </div>

        <div className="bg-[var(--color-card)] p-4 rounded-xl flex gap-3 items-center">
          <Globe className="text-blue-500" />
          <span>{t("featureLanguage")}</span>
        </div>

        <div className="bg-[var(--color-card)] p-4 rounded-xl flex gap-3 items-center">
          <Moon className="text-purple-400" />
          <span>{t("featureDarkMode")}</span>
        </div>

        <div className="bg-[var(--color-card)] p-4 rounded-xl flex gap-3 items-center">
          <Info className="text-yellow-400" />
          <span>{t("featureDetails")}</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">{t("technologies")}</h2>

      <div className="flex flex-wrap gap-3">
        {["React", "Tailwind", "MockAPI", "React Router", "i18next"].map(
          (tech) => (
            <span
              key={tech}
              className="bg-[var(--color-card)] px-4 py-2 rounded-full text-sm shadow-sm"
            >
              {tech}
            </span>
          ),
        )}
      </div>
    </div>
  );
};
