import { ArrowUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const contributors = [
  {
    name: "Lucas Gabriel Cerda FAI-2748",
    href: "https://github.com/LucasGabrielCerda",
  },
  {
    name: "Cyntia Nasabun 119774",
    href: "https://github.com/Nasabunc09",
  },
  {
    name: "Dylan Duboscq FAI-1967",
    href: "https://github.com/DuboscqDylan",
  },
];

const FooterLink = ({ href, children, strong = false }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center gap-2 transition hover:text-[var(--color-text)]
      ${strong ? "font-medium" : ""}
    `}
  >
    {children}
    <FaGithub size={16} aria-hidden="true" />
  </a>
);

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="mt-10 border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-10">
        
        <div className="flex flex-col items-center gap-4 text-sm text-[var(--color-text-secondary)]">
          
          {contributors.map((contributor) => (
            <FooterLink
              key={contributor.href}
              href={contributor.href}
            >
              {contributor.name}
            </FooterLink>
          ))}

          <FooterLink
            href="https://github.com/DuboscqDylan/react_tp2_grupo16"
            strong
          >
            {t("repository")}
          </FooterLink>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 rounded-md bg-[var(--color-card)] px-4 py-2 transition hover:bg-[var(--color-card-hover)]"
        >
          <ArrowUp size={16} />
          {t("scrollTop")}
        </button>
      </div>
    </footer>
  );
};