import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { notifications as initial } from "@/data/mockData";
import { HiOutlineCheck, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineInformationCircle, HiOutlineShieldExclamation } from "react-icons/hi2";

export const Route = createFileRoute("/_app/notifications")({ component: Notifications });

const icons = { success: HiOutlineCheckCircle, warning: HiOutlineExclamationTriangle, info: HiOutlineInformationCircle, alert: HiOutlineShieldExclamation };
const tones = { success: "bg-success/15 text-success", warning: "bg-warning/15 text-warning", info: "bg-primary/15 text-primary", alert: "bg-destructive/15 text-destructive" };

function Notifications() {
  const [list, setList] = useState(initial);
  const markAll = () => setList((l) => l.map((n) => ({ ...n, read: true })));
  return (
    <PageTransition>
      <PageHeader title="Notifications" subtitle="Stay on top of activity and security." actions={
        <button onClick={markAll} className="h-10 px-4 rounded-lg bg-muted hover:bg-accent text-sm font-medium flex items-center gap-1"><HiOutlineCheck className="h-4 w-4" /> Mark all read</button>
      } />
      <div className="max-w-3xl rounded-2xl bg-card border border-border shadow-card divide-y divide-border">
        {list.map((n) => {
          const I = icons[n.type];
          return (
            <div key={n.id} className={`flex items-start gap-4 p-4 ${!n.read ? "bg-primary/[0.03]" : ""}`}>
              <div className={`h-10 w-10 rounded-full grid place-items-center ${tones[n.type]}`}><I className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{n.title}</div>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
            </div>
          );
        })}
      </div>
    </PageTransition>
  );
}
