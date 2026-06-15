import { NavItem } from "../NavItem/NavItem";
import { useTranslation } from "react-i18next";

export const NavBar = () => {
  const { t } = useTranslation();
  const links = [
    { to: "/", label: "Spoofify", isLogo: true },
    { to: "/Favorites", label: t("favorites") },
    { to: "/About", label: t("about") },
  ];

  return (
    <nav className="flex items-center gap-4 text-sm">
      {links.map((link, i) => (
        <div key={link.to} className="flex items-center gap-4">
          <NavItem {...link} />
          {i < links.length - 1 && <span className="opacity-40">|</span>}
        </div>
      ))}
    </nav>
  );
};
