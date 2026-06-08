import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { transactions } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/format";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export const Route = createFileRoute("/_app/transactions/$id")({ component: TxDetail });

function TxDetail() {
  const { id } = useParams({ from: "/_app/transactions/$id" });
  const t = transactions.find((x) => x.id === id);
  if (!t) return <div className="p-8">Transaction not found. <Link to="/transactions" className="text-primary">Back</Link></div>;
  return (
    <PageTransition>
      <Link to="/transactions" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"><HiOutlineArrowLeft /> Back to transactions</Link>
      <div className="max-w-2xl">
        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="gradient-primary p-8 text-primary-foreground">
            <div className="text-xs uppercase opacity-80">{t.type === "credit" ? "Received" : "Paid"}</div>
            <div className="font-display text-4xl font-bold mt-1">{t.type === "credit" ? "+" : ""}{formatCurrency(t.amount)}</div>
            <div className="mt-2 opacity-90">{t.name}</div>
          </div>
          <div className="p-6 space-y-3 text-sm">
            {[
              ["Reference", t.id],
              ["Category", t.category],
              ["Date", formatDate(t.date)],
              ["Status", t.status],
              ["Type", t.type],
              ["Account", "•••• 4892 — Primary Savings"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium capitalize">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
