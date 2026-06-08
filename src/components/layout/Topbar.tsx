import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { HiOutlineSun, HiOutlineMoon, HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineBars3, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border glass">
      <div className="flex h-full items-center gap-3 px-4 lg:px-8">
        <button onClick={onMenu} className="lg:hidden p-2 rounded-md hover:bg-muted">
          <HiOutlineBars3 className="h-5 w-5" />
        </button>
        <div className="relative flex-1 max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search transactions, cards…"
            className="w-full h-10 rounded-lg bg-muted/60 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted" aria-label="Toggle theme">
            {theme === "dark" ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
          </button>
          <button onClick={() => navigate({ to: "/notifications" })} className="relative p-2 rounded-lg hover:bg-muted">
            <HiOutlineBell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-border">
            <div className="text-right">
              <div className="text-sm font-medium leading-tight">{user?.name ?? "Guest"}</div>
              <div className="text-xs text-muted-foreground">{user?.email ?? ""}</div>
            </div>
            <div className="h-9 w-9 rounded-full gradient-primary grid place-items-center text-primary-foreground text-sm font-semibold">
              {(user?.name ?? "A").charAt(0).toUpperCase()}
            </div>
            <button onClick={() => { logout(); navigate({ to: "/login" }); }} className="p-2 rounded-lg hover:bg-muted" title="Log out">
              <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
