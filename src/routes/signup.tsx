import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ ssr: false, component: Signup });

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(name, email);
      toast.success("Account created — verify your email.");
      navigate({ to: "/otp" });
    } catch { toast.error("Signup failed"); } finally { setLoading(false); }
  };
  return (
    <AuthShell
      title="Create your account"
      subtitle="Open a SmartBank account in seconds."
      footer={<>Already a member? <Link to="/login" className="text-primary font-medium">Sign in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
        <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <PrimaryButton disabled={loading}>{loading ? "Creating…" : "Create account"}</PrimaryButton>
      </form>
    </AuthShell>
  );
}
