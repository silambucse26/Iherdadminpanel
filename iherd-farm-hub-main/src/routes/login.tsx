import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthShell } from "@/components/admin/AuthShell";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — iHerd" },
      {
        name: "description",
        content: "Sign in to your iHerd admin account — smart cattle care and farm management platform.",
      },
    ],
  }),
  component: SignInPage,
});

const inputClass =
  "h-12 rounded-xl border-gray-200 bg-white/80 pl-10 text-sm focus-visible:border-[#66BB6A] focus-visible:ring-[#66BB6A]/30";

function SignInPage() {
  return (
    <AuthShell
      badge="Admin Portal"
      title="Welcome back 👋"
      subtitle="Sign in to your iHerd admin account to continue."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#2E7D32] hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  );
}

function SignInForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-semibold text-gray-700">Admin email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@iherd.com" className={inputClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-xs font-semibold text-gray-700">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className={inputClass + " pr-10"} />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#2E7D32]" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" className="h-4 w-4 rounded border-gray-300 data-[state=checked]:border-[#2E7D32] data-[state=checked]:bg-[#2E7D32]" />
        <Label htmlFor="remember" className="text-sm font-normal text-gray-600">Remember me</Label>
      </div>

      <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl border-0 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-[1.04] disabled:opacity-70" style={{ background: "linear-gradient(135deg,#2E7D32 0%,#66BB6A 100%)" }}>
        {loading ? "Signing in…" : "Sign In"}
      </Button>

      <div className="text-center">
        <button type="button" className="text-xs font-semibold text-[#2E7D32] hover:underline">
          Forgot password?
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-gray-500">
        <ShieldCheck className="h-3.5 w-3.5 text-[#2E7D32]" />
        Secure login · 256-bit SSL encryption
      </div>
    </form>
  );
}
