import { Sun, Moon } from "lucide-react";

export const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700"
    >
      <span
        className={`absolute top-[-1px] left-[-1px]
                        w-[26px] h-[26px] rounded-full bg-white
                        flex items-center justify-center
                        transition-transform duration-300 border
                        ${darkMode ? "translate-x-6 border-blue-950" : "translate-x-0 border-yellow-600"}`}
      >
        <Sun
          size={14}
          className={`absolute transition-opacity duration-200 text-yellow-600
                            ${darkMode ? "opacity-0" : "opacity-100"}`}
        />

        <Moon
          size={14}
          className={`absolute transition-opacity duration-200 text-blue-950
                            ${darkMode ? "opacity-100" : "opacity-0"}`}
        />
      </span>
    </button>
  );
};
