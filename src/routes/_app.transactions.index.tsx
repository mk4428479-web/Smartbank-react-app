import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { transactions } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/format";
import { HiOutlineMagnifyingGlass, HiArrowUpRight, HiArrowDownLeft, HiOutlinePaperAirplane, HiOutlineArrowDownTray } from "react-icons/hi2";

export const Route = createFileRoute("/_app/transactions/")({ component: TransactionsIndex });

function TransactionsIndex() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const list = useMemo(() =>
    transactions.filter((t) =>
      (filter === "all" || t.type === filter) &&
      (t.name.toLowerCase().includes(q.toLowerCase()) || t.category.toLowerCase().includes(q.toLowerCase()))
    ), [q, filter]);

  return (
    <PageTransition>
      <PageHeader title="Transactions" subtitle="Search, filter, and review your activity." actions={
        <>
          <Link to="/transactions/receive" className="h-10 px-4 rounded-lg bg-muted hover:bg-accent text-sm font-medium flex items-center gap-1"><HiOutlineArrowDownTray className="h-4 w-4" /> Receive</Link>
          <Link to="/transactions/send" className="h-10 px-4 rounded-lg gradient-primary text-primary-foreground text-sm font-medium flex items-center gap-1 shadow-elegant"><HiOutlinePaperAirplane className="h-4 w-4" /> Send</Link>
        </>
      } />
      <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or category" className="w-full h-10 rounded-lg bg-muted pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            {(["all", "credit", "debit"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 h-8 rounded-md text-sm capitalize ${filter === f ? "bg-card shadow-card font-medium" : "text-muted-foreground"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground border-b border-border">
              <tr><th className="py-3">Transaction</th><th>Category</th><th>Date</th><th>Status</th><th className="text-right">Amount</th></tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-3">
                    <Link to="/transactions/$id" params={{ id: t.id }} className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-full grid place-items-center ${t.type === "credit" ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}`}>
                        {t.type === "credit" ? <HiArrowDownLeft className="h-4 w-4" /> : <HiArrowUpRight className="h-4 w-4" />}
                      </div>
                      <span className="font-medium">{t.name}</span>
                    </Link>
                  </td>
                  <td className="text-muted-foreground">{t.category}</td>
                  <td className="text-muted-foreground">{formatDate(t.date)}</td>
                  <td><span className={`px-2 py-0.5 rounded-full text-xs capitalize ${t.status === "completed" ? "bg-success/15 text-success" : t.status === "pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>{t.status}</span></td>
                  <td className={`text-right font-semibold ${t.type === "credit" ? "text-success" : ""}`}>{t.type === "credit" ? "+" : ""}{formatCurrency(t.amount)}</td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">No transactions match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </PageTransition>
  );
}
