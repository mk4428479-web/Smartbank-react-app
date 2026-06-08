import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ ssr: false, component: Login });

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex@smartbank.io");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } catch { toast.error("Login failed"); } finally { setLoading(false); }
  };
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your SmartBank account."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary font-medium">Sign up</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Remember me</label>
          <Link to="/forgot-password" className="text-primary font-medium">Forgot?</Link>
        </div>
        <PrimaryButton disabled={loading}>{loading ? "Signing in…" : "Sign in"}</PrimaryButton>
      </form>
    </AuthShell>
  );
}
