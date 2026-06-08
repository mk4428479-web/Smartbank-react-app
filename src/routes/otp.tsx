import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AuthShell, PrimaryButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/otp")({ ssr: false, component: Otp });

function Otp() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const setAt = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const copy = [...digits];
    copy[i] = v;
    setDigits(copy);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (digits.some((d) => !d)) return toast.error("Enter all 6 digits");
    await login("alex@smartbank.io");
    toast.success("Verified!");
    navigate({ to: "/dashboard" });
  };
  return (
    <AuthShell title="Verify your identity" subtitle="Enter the 6-digit code we sent to your email.">
      <form onSubmit={submit} className="space-y-6">
        <div className="flex gap-2 justify-between">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus(); }}
              maxLength={1}
              inputMode="numeric"
              className="h-14 w-12 text-center text-xl font-semibold rounded-lg border border-input bg-background outline-none focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>
        <PrimaryButton>Verify</PrimaryButton>
        <p className="text-sm text-center text-muted-foreground">Didn't receive? <button type="button" className="text-primary font-medium">Resend</button></p>
      </form>
    </AuthShell>
  );
}
