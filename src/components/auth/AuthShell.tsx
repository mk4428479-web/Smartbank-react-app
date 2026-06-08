import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden gradient-card text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur grid place-items-center font-bold">S</div>
          <div className="font-display text-xl font-bold">SmartBank</div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-5xl font-bold leading-tight">Banking,<br />redefined.</h1>
          <p className="mt-4 text-white/80 max-w-md">Manage accounts, cards, transfers and loans from one elegant, secure dashboard built for modern life.</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-4">
          {[["$2.4B", "moved"], ["180k", "members"], ["4.9★", "rating"]].map(([v, l]) => (
            <div key={l}><div className="font-display text-2xl font-bold">{v}</div><div className="text-xs text-white/70 uppercase tracking-wider">{l}</div></div>
          ))}
        </div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center text-primary-foreground font-bold">S</div>
            <span className="font-display font-bold text-lg">SmartBank</span>
          </Link>
          <h2 className="font-display text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground text-center">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}

export function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring transition"
      />
    </label>
  );
}

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full h-11 rounded-lg gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60"
    >
      {children}
    </button>
  );
}
