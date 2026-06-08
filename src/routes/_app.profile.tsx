import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { Field, PrimaryButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";
import { HiOutlineShieldCheck, HiOutlineKey, HiOutlineIdentification, HiOutlineCheckBadge } from "react-icons/hi2";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/profile")({ component: Profile });

function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"profile" | "security" | "kyc">("profile");
  return (
    <PageTransition>
      <PageHeader title="Profile" subtitle="Manage your personal details and security." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card text-center">
          <div className="h-24 w-24 mx-auto rounded-full gradient-primary grid place-items-center text-primary-foreground font-display text-3xl font-bold">{(user?.name ?? "A").charAt(0)}</div>
          <div className="font-display text-xl font-semibold mt-4">{user?.name ?? "Alex Morgan"}</div>
          <div className="text-sm text-muted-foreground">{user?.email ?? "alex@smartbank.io"}</div>
          <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/15 text-success text-xs"><HiOutlineCheckBadge /> Verified member</div>
          <div className="mt-6 space-y-1 text-left">
            {[
              { k: "profile", icon: HiOutlineIdentification, label: "Personal details" },
              { k: "security", icon: HiOutlineShieldCheck, label: "Security" },
              { k: "kyc", icon: HiOutlineKey, label: "KYC verification" },
            ].map(({ k, icon: I, label }) => (
              <button key={k} onClick={() => setTab(k as typeof tab)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${tab === k ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}>
                <I className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-card">
          {tab === "profile" && (
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" defaultValue={user?.name ?? "Alex Morgan"} />
                <Field label="Email" type="email" defaultValue={user?.email ?? ""} />
                <Field label="Phone" defaultValue="+1 415 555 0102" />
                <Field label="Date of birth" type="date" defaultValue="1992-04-12" />
                <Field label="Address" defaultValue="221B Market St" />
                <Field label="City" defaultValue="San Francisco" />
              </div>
              <PrimaryButton>Save changes</PrimaryButton>
            </form>
          )}
          {tab === "security" && (
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Security updated"); }} className="space-y-4">
              <Field label="Current password" type="password" />
              <Field label="New password" type="password" />
              <Field label="Confirm new password" type="password" />
              <label className="flex items-center justify-between p-3 rounded-lg bg-muted text-sm"><span>Two-factor authentication</span><input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" /></label>
              <label className="flex items-center justify-between p-3 rounded-lg bg-muted text-sm"><span>Login alerts</span><input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" /></label>
              <PrimaryButton>Update security</PrimaryButton>
            </form>
          )}
          {tab === "kyc" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-success/10 text-success flex items-center gap-2"><HiOutlineCheckBadge className="h-5 w-5" /> Your KYC is verified · Tier 2</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Government ID", "Passport · ••• 4421"], ["Address proof", "Utility bill · Verified"], ["Selfie verification", "Done"], ["Tax ID", "•••-••-1234"]].map(([k, v]) => (
                  <div key={k} className="p-4 rounded-xl bg-muted">
                    <div className="text-xs text-muted-foreground">{k}</div>
                    <div className="font-medium">{v}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => toast.success("Upgrade request sent")} className="h-11 px-4 rounded-lg gradient-primary text-primary-foreground font-medium shadow-elegant">Upgrade to Tier 3</button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
