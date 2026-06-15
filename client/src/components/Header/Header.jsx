import { useEffect, useState } from "react";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import { NavBar } from "../NavBar/NavBar";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { useTheme } from "../../hooks/useTheme";

export const Header = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-7 py-6 border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]">
      <NavBar />
      <div className="flex items-center gap-3">
        <LanguageSelector />
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
};
