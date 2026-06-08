import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { accounts } from "@/data/mockData";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/transactions/receive")({ component: Receive });

function Receive() {
  const a = accounts[0];
  const iban = "US12 SMTB 0000 4892 1100";
  const copy = (v: string) => { navigator.clipboard.writeText(v); toast.success("Copied"); };
  return (
    <PageTransition>
      <PageHeader title="Receive money" subtitle="Share your details to get paid instantly." />
      <div className="max-w-xl rounded-2xl bg-card border border-border p-6 shadow-card">
        <div className="aspect-square max-w-[220px] mx-auto rounded-2xl gradient-card grid place-items-center text-primary-foreground">
          <div className="grid grid-cols-12 gap-0.5 p-4">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className={`h-2 w-2 rounded-sm ${Math.random() > 0.45 ? "bg-white" : "bg-transparent"}`} />
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-2">Scan QR to pay this account</div>
        <div className="mt-6 space-y-2">
          {[
            ["Account holder", a.name],
            ["Account number", a.number],
            ["IBAN", iban],
            ["SWIFT", "SMTBUS33"],
          ].map(([k, v]) => (
            <button key={k} onClick={() => copy(v)} className="w-full flex justify-between items-center p-3 rounded-lg bg-muted hover:bg-accent text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span className="flex items-center gap-2 font-medium">{v} <HiOutlineDocumentDuplicate className="h-4 w-4 text-primary" /></span>
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
