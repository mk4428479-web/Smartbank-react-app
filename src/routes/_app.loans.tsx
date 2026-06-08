import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { Field, PrimaryButton } from "@/components/auth/AuthShell";
import { loans } from "@/data/mockData";
import { formatCurrency } from "@/utils/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/loans")({ component: Loans });

function calcEmi(p: number, r: number, n: number) {
  const i = r / 12 / 100;
  if (i === 0) return p / n;
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

function Loans() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(8);
  const [tenure, setTenure] = useState(36);
  const emi = calcEmi(amount, rate, tenure);

  return (
    <PageTransition>
      <PageHeader title="Loans" subtitle="Apply, track and plan repayments." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {loans.map((l) => {
            const pct = ((l.amount - l.remaining) / l.amount) * 100;
            return (
              <div key={l.id} className="rounded-2xl bg-card border border-border p-5 shadow-card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-display font-semibold text-lg">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.tenure} months · {l.rate}% APR</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${l.status === "active" ? "bg-success/15 text-success" : l.status === "pending" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}>{l.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                  <div><div className="text-muted-foreground">Principal</div><div className="font-semibold">{formatCurrency(l.amount)}</div></div>
                  <div><div className="text-muted-foreground">Remaining</div><div className="font-semibold">{formatCurrency(l.remaining)}</div></div>
                  <div><div className="text-muted-foreground">EMI</div><div className="font-semibold">{formatCurrency(l.emi)}</div></div>
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full gradient-primary" style={{ width: pct + "%" }} /></div>
                  <div className="text-xs text-muted-foreground mt-1">{pct.toFixed(1)}% repaid</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="font-display font-semibold text-lg mb-4">EMI calculator</div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-muted-foreground">Amount: <span className="font-semibold text-foreground">{formatCurrency(amount)}</span></label>
                <input type="range" min={1000} max={500000} step={1000} value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Rate: <span className="font-semibold text-foreground">{rate}%</span></label>
                <input type="range" min={1} max={20} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Tenure: <span className="font-semibold text-foreground">{tenure} mo</span></label>
                <input type="range" min={6} max={240} step={1} value={tenure} onChange={(e) => setTenure(+e.target.value)} className="w-full accent-primary" />
              </div>
              <div className="mt-4 p-4 rounded-xl gradient-primary text-primary-foreground">
                <div className="text-xs opacity-80">Monthly EMI</div>
                <div className="font-display text-2xl font-bold">{formatCurrency(emi)}</div>
                <div className="text-xs opacity-80 mt-1">Total: {formatCurrency(emi * tenure)}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="font-display font-semibold text-lg mb-4">Apply for a loan</div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Application submitted"); }} className="space-y-3">
              <Field label="Purpose" placeholder="Home renovation" />
              <Field label="Amount" type="number" placeholder="10000" />
              <PrimaryButton>Submit application</PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
