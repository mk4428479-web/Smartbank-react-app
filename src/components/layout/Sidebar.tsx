import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  HiOutlineHome, HiOutlineCreditCard, HiOutlineBanknotes, HiOutlineArrowsRightLeft,
  HiOutlineChartBar, HiOutlineUser, HiOutlineBell, HiOutlineCog6Tooth, HiOutlineWallet,
} from "react-icons/hi2";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineHome },
  { to: "/accounts", label: "Accounts", icon: HiOutlineWallet },
  { to: "/transactions", label: "Transactions", icon: HiOutlineArrowsRightLeft },
  { to: "/cards", label: "Cards", icon: HiOutlineCreditCard },
  { to: "/loans", label: "Loans", icon: HiOutlineBanknotes },
  { to: "/analytics", label: "Analytics", icon: HiOutlineChartBar },
  { to: "/profile", label: "Profile", icon: HiOutlineUser },
  { to: "/notifications", label: "Notifications", icon: HiOutlineBell },
  { to: "/settings", label: "Settings", icon: HiOutlineCog6Tooth },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold">S</div>
          <div>
            <div className="font-display font-bold text-lg leading-tight">SmartBank</div>
            <div className="text-xs text-muted-foreground">Banking suite</div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {items.map((it) => {
            const active = pathname === it.to || pathname.startsWith(it.to + "/");
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={onClose}
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "text-primary-foreground" : "hover:bg-sidebar-accent"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg gradient-primary shadow-elegant"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative h-5 w-5" />
                <span className="relative">{it.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4 gradient-card text-white">
          <div className="text-xs opacity-80">Upgrade plan</div>
          <div className="font-display font-semibold">SmartBank Plus</div>
          <div className="text-xs opacity-80 mt-1">Zero fees · Priority support</div>
        </div>
      </aside>
    </>
  );
}
