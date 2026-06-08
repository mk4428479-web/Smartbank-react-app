import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { accounts, balanceHistory } from "@/data/mockData";
import { formatCurrency } from "@/utils/format";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { HiOutlineArrowRight, HiOutlineDocumentText } from "react-icons/hi2";

export const Route = createFileRoute("/_app/accounts")({ component: Accounts });

function Accounts() {
  return (
    <PageTransition>
      <PageHeader title="Accounts" subtitle="All your accounts in one place." actions={
        <button className="h-10 px-4 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-elegant">+ New account</button>
      } />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((a) => (
          <div key={a.id} className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{a.type}</div>
                <div className="font-display font-semibold">{a.name}</div>
              </div>
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{a.number}</span>
            </div>
            <div className="font-display text-3xl font-bold mt-4">{formatCurrency(a.balance)}</div>
            <div className="text-xs text-muted-foreground">Available balance</div>
            <div className="flex gap-2 mt-4">
              <Link to="/transactions" className="flex-1 h-9 rounded-lg bg-muted hover:bg-accent grid place-items-center text-sm font-medium">View</Link>
              <button className="flex-1 h-9 rounded-lg gradient-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1">Transfer <HiOutlineArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display text-lg font-semibold mb-4">Balance history</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceHistory}>
                <defs>
                  <linearGradient id="bh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="balance" stroke="var(--color-primary)" strokeWidth={2} fill="url(#bh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display text-lg font-semibold mb-4">Statements</div>
          <div className="space-y-2">
            {["June 2026", "May 2026", "April 2026", "March 2026"].map((m) => (
              <button key={m} className="flex items-center justify-between w-full p-3 rounded-lg bg-muted hover:bg-accent text-sm">
                <span className="flex items-center gap-2"><HiOutlineDocumentText className="h-4 w-4 text-primary" /> {m}</span>
                <span className="text-xs text-primary font-medium">Download</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
