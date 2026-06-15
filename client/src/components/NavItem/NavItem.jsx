import { NavLink } from "react-router-dom";

export const NavItem = ({ to, label, isLogo }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <span
          className={`group relative px-3 py-1 transition-colors cursor-pointer
          ${
            isActive
              ? "text-[var(--color-text)] "
              : "opacity-70 hover:opacity-100 hover:text-[var(--color-text)]"
          }
                    active:text-[#1db954] active:drop-shadow-[0_0_6px_rgba(29,185,84,0.5)]
                    
                    ${isLogo ? "text-lg font-semibold tracking-tight" : ""}
                    `}
        >
          {label}
          <span
            className={`
                            absolute left-1/2 bottom-0 h-[2px]
                            bg-[#1db954]
                            transition-all duration-300
                            origin-center
                            ${
                              isActive
                                ? "w-1/2 left-1/4"
                                : "w-0 group-hover:w-1/2 group-hover:left-1/4 "
                            }
                        `}
          />
        </span>
      )}
    </NavLink>
  );
};
