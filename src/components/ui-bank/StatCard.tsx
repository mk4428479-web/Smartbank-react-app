import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StatCard({ label, value, delta, icon, accent }: { label: string; value: string; delta?: string; icon: ReactNode; accent?: "primary" | "success" | "warning" | "destructive" }) {
  const color = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    destructive: "text-destructive bg-destructive/10",
  }[accent ?? "primary"];
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-card border border-border p-5 shadow-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="font-display text-2xl lg:text-3xl font-bold mt-1">{value}</div>
        </div>
        <div className={`h-10 w-10 rounded-xl grid place-items-center ${color}`}>{icon}</div>
      </div>
      {delta && <div className="text-xs mt-3 text-muted-foreground">{delta}</div>}
    </motion.div>
  );
}
