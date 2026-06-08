import { Link } from "@tanstack/react-router";
import { transactions } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/format";
import { HiArrowUpRight, HiArrowDownLeft } from "react-icons/hi2";

export function TransactionList({ limit }: { limit?: number }) {
  const items = limit ? transactions.slice(0, limit) : transactions;
  return (
    <div className="divide-y divide-border">
      {items.map((t) => (
        <Link
          to="/transactions/$id"
          params={{ id: t.id }}
          key={t.id}
          className="flex items-center gap-4 py-3 hover:bg-muted/50 px-2 -mx-2 rounded-lg transition"
        >
          <div className={`h-10 w-10 rounded-full grid place-items-center ${t.type === "credit" ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}`}>
            {t.type === "credit" ? <HiArrowDownLeft className="h-5 w-5" /> : <HiArrowUpRight className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.category} · {formatDate(t.date)}</div>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${t.type === "credit" ? "text-success" : ""}`}>
              {t.type === "credit" ? "+" : ""}{formatCurrency(t.amount)}
            </div>
            <div className={`text-xs capitalize ${t.status === "pending" ? "text-warning" : t.status === "failed" ? "text-destructive" : "text-muted-foreground"}`}>{t.status}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
