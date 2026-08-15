import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/admin/AuthShell";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Admin Account — iHerd" },
      {
        name: "description",
        content: "Create your iHerd admin account to manage farmers, sellers and marketplace operations.",
      },
    ],
  }),
  component: SignUpPage,
});

const inputClass =
  "h-12 rounded-xl border-gray-200 bg-white/80 pl-10 text-sm focus-visible:border-[#66BB6A] focus-visible:ring-[#66BB6A]/30";

function SignUpPage() {
  return (
    <AuthShell
      badge="Admin Portal"
      title="Welcome to iHerd 🐄"
      subtitle="Create your admin account to access the dashboard."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#2E7D32] hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    
    setLoading(true);
    try {
      await signUp(form.email, form.password, form.name, form.phone);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-xs font-semibold text-gray-700">Admin name</Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="name" required value={form.name} onChange={update("name")} placeholder="Jane Doe" className={inputClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="su-email" className="text-xs font-semibold text-gray-700">Email address</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="su-email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} placeholder="admin@iherd.com" className={inputClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-xs font-semibold text-gray-700">Phone number</Label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={update("phone")} placeholder="+1 555 000 0000" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="su-password" className="text-xs font-semibold text-gray-700">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input id="su-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={form.password} onChange={update("password")} placeholder="••••••••" className={inputClass + " pr-10"} />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#2E7D32]" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm" className="text-xs font-semibold text-gray-700">Confirm password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input id="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password" required value={form.confirm} onChange={update("confirm")} placeholder="••••••••" className={inputClass + " pr-10"} />
            <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#2E7D32]" aria-label={showConfirm ? "Hide password" : "Show password"}>
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{error}</div>
      )}

      <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl border-0 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-[1.04] disabled:opacity-70" style={{ background: "linear-gradient(135deg,#2E7D32 0%,#66BB6A 100%)" }}>
        {loading ? "Creating account…" : "Create Account & Continue"}
      </Button>

      <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-gray-500">
        <ShieldCheck className="h-3.5 w-3.5 text-[#2E7D32]" />
        Your data is protected with 256-bit SSL encryption
      </div>
    </form>
  );
}
