import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { useTheme } from "@/context/ThemeContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({ component: Settings });

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return <input type="checkbox" defaultChecked={defaultChecked} className="h-5 w-9 appearance-none rounded-full bg-muted checked:bg-primary relative transition cursor-pointer before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition checked:before:translate-x-4" />;
}
function Row({ title, desc, control }: { title: string; desc: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div><div className="font-medium">{title}</div><div className="text-sm text-muted-foreground">{desc}</div></div>
      {control}
    </div>
  );
}

function Settings() {
  const { theme, toggle } = useTheme();
  return (
    <PageTransition>
      <PageHeader title="Settings" subtitle="Customize your SmartBank experience." />
      <div className="max-w-3xl space-y-6">
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <div className="font-display font-semibold text-lg mb-2">Appearance</div>
          <Row title="Theme" desc="Switch between light and dark mode." control={
            <button onClick={toggle} className="h-10 px-4 rounded-lg bg-muted hover:bg-accent text-sm font-medium flex items-center gap-2">
              {theme === "dark" ? <><HiOutlineSun className="h-4 w-4" /> Light</> : <><HiOutlineMoon className="h-4 w-4" /> Dark</>}
            </button>
          } />
        </div>
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <div className="font-display font-semibold text-lg mb-2">Privacy</div>
          <Row title="Hide balances" desc="Mask account balances by default." control={<Toggle />} />
          <Row title="Biometric login" desc="Use Face ID / Touch ID." control={<Toggle defaultChecked />} />
          <Row title="Marketing emails" desc="Promotions and product news." control={<Toggle />} />
        </div>
        <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
          <div className="font-display font-semibold text-lg mb-2">Account</div>
          <Row title="Default currency" desc="USD — US Dollar" control={<button className="text-sm text-primary">Change</button>} />
          <Row title="Language" desc="English (US)" control={<button className="text-sm text-primary">Change</button>} />
          <Row title="Close account" desc="Permanently close your SmartBank account." control={<button onClick={() => toast.error("Contact support to close account")} className="text-sm text-destructive">Request</button>} />
        </div>
      </div>
    </PageTransition>
  );
}
