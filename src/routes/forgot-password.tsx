import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ ssr: false, component: Forgot });

function Forgot() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("OTP sent to " + email);
    navigate({ to: "/otp" });
  };
  return (
    <AuthShell
      title="Reset password"
      subtitle="We'll email you a one-time code."
      footer={<Link to="/login" className="text-primary font-medium">Back to sign in</Link>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <PrimaryButton>Send reset code</PrimaryButton>
      </form>
    </AuthShell>
  );
}
