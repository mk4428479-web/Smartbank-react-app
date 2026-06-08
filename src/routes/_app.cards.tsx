import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { BankCard } from "@/components/ui-bank/BankCard";
import { cards as initial } from "@/data/mockData";
import { formatCurrency } from "@/utils/format";
import { toast } from "sonner";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";

export const Route = createFileRoute("/_app/cards")({ component: Cards });

function Cards() {
  const [cardList, setCardList] = useState(initial);
  const [selectedId, setSelectedId] = useState(initial[0].id);
  const selected = cardList.find((c) => c.id === selectedId)!;

  const toggleFreeze = () => {
    setCardList((cs) => cs.map((c) => c.id === selected.id ? { ...c, frozen: !c.frozen } : c));
    toast.success(selected.frozen ? "Card unfrozen" : "Card frozen");
  };

  return (
    <PageTransition>
      <PageHeader title="Cards" subtitle="Manage your debit and credit cards." actions={
        <button className="h-10 px-4 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-elegant">+ Request card</button>
      } />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardList.map((c) => (
            <div key={c.id} onClick={() => setSelectedId(c.id)} className={`rounded-2xl p-1 transition ${selectedId === c.id ? "ring-2 ring-primary" : ""}`}>
              <BankCard card={c} />
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display text-lg font-semibold">{selected.type} {selected.variant}</div>
          <div className="text-sm text-muted-foreground">•••• {selected.last4}</div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Holder</span><span className="font-medium">{selected.holder}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Expiry</span><span className="font-medium">{selected.expiry}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{selected.variant === "credit" ? "Used" : "Balance"}</span><span className="font-medium">{formatCurrency(selected.balance ?? 0)}</span></div>
            {selected.limit && <div className="flex justify-between"><span className="text-muted-foreground">Limit</span><span className="font-medium">{formatCurrency(selected.limit)}</span></div>}
          </div>
          <button onClick={toggleFreeze} className={`mt-6 w-full h-11 rounded-lg font-medium flex items-center justify-center gap-2 ${selected.frozen ? "bg-success text-success-foreground" : "bg-destructive/10 text-destructive"}`}>
            {selected.frozen ? <><HiOutlineLockOpen /> Unfreeze card</> : <><HiOutlineLockClosed /> Freeze card</>}
          </button>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="h-10 rounded-lg bg-muted hover:bg-accent text-sm font-medium">Set PIN</button>
            <button className="h-10 rounded-lg bg-muted hover:bg-accent text-sm font-medium">Limits</button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
