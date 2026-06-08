import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { Field, PrimaryButton } from "@/components/auth/AuthShell";
import { accounts } from "@/data/mockData";
import { formatCurrency } from "@/utils/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/transactions/send")({ component: Send });

function Send() {
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [from, setFrom] = useState(accounts[0].id);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Sent ${formatCurrency(Number(amount) || 0)} to ${to}`);
    navigate({ to: "/transactions" });
  };
  return (
    <PageTransition>
      <PageHeader title="Send money" subtitle="Transfer to any SmartBank or external account." />
      <div className="max-w-xl rounded-2xl bg-card border border-border p-6 shadow-card">
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">From account</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1.5 w-full h-11 rounded-lg border border-input bg-background px-3 text-sm">
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.name} — {formatCurrency(a.balance)}</option>)}
            </select>
          </label>
          <Field label="Recipient (email or account)" required value={to} onChange={(e) => setTo(e.target.value)} placeholder="sarah@smartbank.io" />
          <Field label="Amount (USD)" type="number" required min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
          <Field label="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Rent for June" />
          <PrimaryButton>Send {amount && formatCurrency(Number(amount))}</PrimaryButton>
        </form>
      </div>
    </PageTransition>
  );
}
